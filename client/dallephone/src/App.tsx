import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/screens/Home';
import Header from './components/organisms/Header';
import Dallephone from './components/screens/Dallephone';

function App() {
  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
    }}>
      <Header />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dallephone" element={<Dallephone />} />
          <Route path="/about" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
