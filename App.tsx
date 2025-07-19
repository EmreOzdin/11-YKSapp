import React, { useState, useEffect } from 'react';
import Onboarding from './src/screens/Onboarding';
import LogoScreen from './src/screens/LogoScreen';
import LoginScreen from './src/screens/LoginScreen';
import EmailLoginScreen from './src/screens/EmailLoginScreen';

export default function App() {
  const [showLogo, setShowLogo] = useState(true);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showLogo) {
    return <LogoScreen />;
  }
  if (showEmailLogin) {
    return <EmailLoginScreen onLogin={() => setShowLogin(true)} />;
  }
  if (showLogin) {
    return <LoginScreen />;
  }
  return <Onboarding onDone={() => setShowEmailLogin(true)} />;
}
