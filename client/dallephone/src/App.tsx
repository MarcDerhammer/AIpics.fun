import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/screens/Home';
import Header from './components/organisms/Header';
import Dallephone from './components/screens/Dallephone';
import packageInfo from '../package.json';
import SignIn from './components/screens/SignIn';

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
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </div>
      <span style={{
        position: 'fixed',
        bottom: '0',
        right: '0',
        opacity: '0.3',
        padding: '4px'
      }}>
        v{packageInfo.version}
      </span>
    </div>
  );
}

export default App;
