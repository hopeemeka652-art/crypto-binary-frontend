import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [price, setPrice] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://crypto-binary-backend.onrender.com/api/login', {
        email,
        password,
      });

      if (res.data.success) {
        setLoggedIn(true);
      } else {
        alert('Login failed: ' + res.data.message);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred during login.');
    }
  };

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get('https://crypto-binary-backend.onrender.com/api/price');
        setPrice(res.data.price);
      } catch (err) {
        console.error('Price fetch failed:', err);
      }
    };

    fetchPrice();
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      {!loggedIn ? (
        <div>
          <h1>Crypto Binary Options</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: 'block', marginBottom: 10 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: 'block', marginBottom: 10 }}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h1>Welcome to Your Dashboard</h1>
          <p>Current Price: ${price}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
