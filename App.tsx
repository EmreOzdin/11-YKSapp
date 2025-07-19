import React, { useState, useEffect } from 'react';
import Onboarding from './src/screens/Onboarding';
import LogoScreen from './src/screens/LogoScreen';

export default function App() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showLogo) {
    return <LogoScreen />;
  }
  return <Onboarding />;
}
