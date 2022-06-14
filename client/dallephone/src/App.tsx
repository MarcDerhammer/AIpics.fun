import React, { useEffect } from 'react';
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
import { user, onAuthChange } from './database/database';
import { userContext } from './userContext';
import { User } from '@supabase/supabase-js';
import UserScreen from './components/screens/UserScreen';
import Gallery from './components/screens/Gallery';

function App () {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  useEffect(() => {
    setCurrentUser(user());
    onAuthChange((type) => {
      if (type === 'SIGNED_IN') {
        setCurrentUser(user());
      }
      if (type === 'SIGNED_OUT') {
        setCurrentUser(null);
      }
    });
  }, []);
  return (
    <userContext.Provider value={currentUser}>
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
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/user/" element={<UserScreen />} />
          </Routes>
        </div>
        <span className="fixed bottom right feet">
          v{packageInfo.version}
        </span>
        <div className="fixed bottom left feet">
          <NavLink to="/terms" text="Terms of Use" />&nbsp;|&nbsp;
          <NavLink to="/privacypolicy" text="Privacy Policy" />
        </div>
      </div>
    </userContext.Provider>
  );
}

export default App;
