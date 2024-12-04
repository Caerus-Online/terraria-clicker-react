import React, { forwardRef, useEffect, useState } from 'react';
import defaultSwordImage from '../../img/sword.png';
import backgroundImage from '../../img/background.png';
import logo from '../../img/logo.png';
import clickIcon from '../../img/click-icon.png';
import cpsIcon from '../../img/cpsIcon.png';
import coinIcon from '../../img/coin-icon.png';
import summon1Image from '../../img/summon1.png';
import summon2Image from '../../img/summon2.png';
import summon3Image from '../../img/summon3.png';
import summon4Image from '../../img/summon4.png';
import { formatNumber } from '../../utils/formatNumber';

// Define keyframes outside component
const summonAnimationStyles = `
  @keyframes summonFloat {
    0% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) translateY(-5px) scale(1.1); }
    100% { transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes summonRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const summonImages = {
  0: summon1Image,
  1: summon2Image,
  2: summon3Image,
  3: summon4Image
};

const ClickerCore = forwardRef(({ 
  handleClick, 
  swordImage = defaultSwordImage,
  clickValue = 0,
  cps = 0,
  currentCoins = 0,
  swordMultiplier = 1,
  prestigeLevel = 0,
  showPrestigeNotification = false,
  onPrestigeNotificationClick,
  summonUpgrades = []
}, ref) => {
  const [summonElements, setSummonElements] = useState([]);

  // Function to create summon positions in a circle
  useEffect(() => {
    // Only create elements for summons with level > 0
    const activeSummons = summonUpgrades.filter(summon => summon.level > 0);
    if (activeSummons.length > 0) {
      const newSummons = activeSummons.map((summon, index) => {
        const angle = (index / activeSummons.length) * Math.PI * 2;
        const distance = 140;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        return {
          id: index,
          imageIndex: summonUpgrades.indexOf(summon),
          style: {
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            animation: 'summonFloat 2s ease-in-out infinite'
          }
        };
      });
      setSummonElements(newSummons);
    } else {
      setSummonElements([]);
    }
  }, [summonUpgrades]);

  return (
    <div className="relative flex flex-col items-center min-h-screen">
      {/* Add animation styles */}
      <style dangerouslySetInnerHTML={{ __html: summonAnimationStyles }} />
      
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          imageRendering: 'pixelated'
        }} 
      />
      
      {/* Logo */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <img 
          src={logo} 
          alt="Terraria Clicker" 
          className="h-16 object-contain"
        />
      </div>

      {/* Main clicker area */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1">
        {/* Sword container with summons */}
        <div className="relative w-48 h-48">
          {/* Summon circle container - slowly rotating */}
          <div 
            className="absolute inset-0" 
            style={{ animation: 'summonRotate 20s linear infinite' }}
          >
            {/* Summon sprites */}
            {summonElements.map(summon => (
              <div
                key={summon.id}
                className="w-16 h-16 pointer-events-none"
                style={summon.style}
              >
                <img 
                  src={summonImages[summon.imageIndex]}
                  alt={`Summon ${summon.imageIndex + 1}`}
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            ))}
          </div>
          
          {/* Sword */}
          <div 
            ref={ref}
            onClick={handleClick}
            className="absolute inset-0 flex items-center justify-center cursor-pointer transform hover:scale-110 active:scale-95 active:rotate-12 transition-all duration-100"
          >
            <img 
              src={swordImage} 
              alt="Click Sword"
              className="w-full h-full object-contain filter drop-shadow-lg hover:drop-shadow-2xl"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>

        {/* Stats display */}
        <div className="mt-8 font-game text-game-text">
          <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border border-game-accent">
            <div className="grid grid-cols-2 gap-4">
              {/* Click Power */}
              <div className="flex items-center space-x-2">
                <img src={clickIcon} alt="Click Power" className="w-6 h-6" style={{ imageRendering: 'pixelated' }} />
                <span className="text-game-gold">{formatNumber(clickValue)}</span>
              </div>
              
              {/* CPS */}
              <div className="flex items-center space-x-2">
                <img src={cpsIcon} alt="CPS" className="w-6 h-6" style={{ imageRendering: 'pixelated' }} />
                <span className="text-game-silver">{formatNumber(cps)} per second</span>
              </div>
              
              {/* Multiplier */}
              <div className="flex items-center space-x-2">
                <span className="text-game-highlight">x{formatNumber(swordMultiplier)}</span>
                <span className="text-sm">Multiplier</span>
              </div>
              
              {/* Prestige Level */}
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">Lv.{prestigeLevel}</span>
                <span className="text-sm">Prestige</span>
              </div>

              {/* Current Coins */}
              <div className="flex items-center justify-center space-x-2 col-span-2">
                <img src={coinIcon} alt="Coins" className="w-6 h-6" style={{ imageRendering: 'pixelated' }} />
                <span className="text-game-gold text-xl">{formatNumber(currentCoins)}</span>
              </div>
            </div>
          </div>

          {/* Prestige Notification */}
          {showPrestigeNotification && (
            <div 
              onClick={onPrestigeNotificationClick}
              className="mt-4 bg-purple-700 rounded-lg p-3 
                         text-center cursor-pointer transform hover:scale-105 transition-transform duration-200
                         animate-pulse hover:animate-none shadow-lg hover:bg-purple-600"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="material-icons text-purple-100">stars</span>
                <span className="text-purple-100 font-bold">Prestige Available!</span>
                <span className="material-icons text-purple-100">stars</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ClickerCore.displayName = 'ClickerCore';

export default ClickerCore; 