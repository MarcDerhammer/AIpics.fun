import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/screens/Home';
import Header from './components/organisms/Header';
import Dallephone from './components/screens/Dallephone';
import packageInfo from '../package.json';
import SignIn from './components/screens/SignIn';
import PrivacyPolicy from './components/screens/PrivacyPolicy';
import TermsOfService from './components/screens/TermsOfService';
import NavLink from './components/atoms/NavLink';

function App () {
  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <Header />
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dallephone" element={<Dallephone />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </div>
      <span className="absolute bottom right feet">
        v{packageInfo.version}
      </span>
      <div className="absolute bottom left feet">
        <NavLink to="/terms" text="Terms of Use" />&nbsp;|&nbsp;
        <NavLink to="/privacypolicy" text="Privacy Policy" />
      </div>
    </div>
  );
}

export default App;
