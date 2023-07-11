import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';
import studioLogo from './studio-logo.png';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    isLoading && (
      <div className="loading-screen">
        <p>Project by:</p>
        <img src={studioLogo} alt="Studio Logo" />
        <p>Terraria Made by ReLogic</p>
      </div>
    )
  );
};

export default LoadingScreen;