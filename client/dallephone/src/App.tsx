import React from 'react';
import './App.css';
import SignInButton from './components/atoms/SignInButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="pulsing">dalle.fun</h2>
        <SignInButton onClick={() => {
          alert('this doesnt work yet');
        }} type='Google' />
      </header>
    </div>
  );
}

export default App;
