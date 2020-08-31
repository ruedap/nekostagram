import React from 'react';
import logo from './logo.en.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <p>This site is temporarily unavailable.</p>
      <a
        href="https://github.com/ruedap/nekostagram"
        target="_blank"
        rel="noopener noreferrer"
      >
        ruedap/nekostagram
      </a>
    </div>
  );
}

export default App;
