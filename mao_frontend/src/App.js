import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { getHelloMessage } from './apiService';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHelloMessage();
        setMessage(data);
      } catch (error) {
        console.error('Error fetching message', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
      </header>
    </div>
  );
}

export default App;

