import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [price, setPrice] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWallet(accounts[0]);
    }
  };

  const fetchPrice = async () => {
    try {
      const res = await axios.get('https://crypto-binary-backend.onrender.com/api/price');
      setPrice(res.data.price);
    } catch (err) {
useEffect(() => {
  const fetchPrice = async () => {
    try {
      const res = await axios.get('https://crypto-binary-backend.onrender.com/api/price');
      setPrice(res.data.price);
    } catch (err) {
      console.error('Error fetching price:', err);
    }
  };

  fetchPrice();
}, []);      
  
  

  
   

      
        email,
        password,
      });
      if (res.data.success) {
        setLoggedIn(true);
        setError(null);
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError('Login error');
    }
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  return (
    <div>
      <h1>Crypto Binary Options</h1>
      <p>Admin: Sonia Alexander</p>
      <p>Founder: Alexander Owen</p>
      <p>Crypto Portfolio Manager: Stefan Lewandolski</p>

      {!loggedIn ? (
        <div>
          <h2>Login</h2>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <p>Wallet: {wallet || 'Not connected'}</p>
          <button onClick={connectWallet}>Connect Wallet</button>
          <h2>ETH/USDT Price: ${price ?? 'Loading...'}</h2>
        </div>
      )}
    </div>
  );
          }
