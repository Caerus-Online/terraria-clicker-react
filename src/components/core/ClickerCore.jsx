import React, { forwardRef, useEffect, useState } from 'react';
import { gameImages, minionImages } from '../../data/imageData';
import { formatNumber } from '../../utils/formatNumber';

// Define keyframes outside component
const summonAnimationStyles = `
  @keyframes summonFloat {
    0% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) translateY(-5px) scale(1.1); }
    100% { transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes summonJoltRight {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(calc(-50% + 10px), -50%) scale(1.05); }
  }
  @keyframes summonJoltLeft {
    0%, 100% { transform: translate(-50%, -50%) scaleX(-1); }
    50% { transform: translate(calc(-50% - 10px), -50%) scaleX(-1) scale(1.05); }
  }
`;

const ClickerCore = forwardRef(({ 
  handleClick, 
  swordImage = gameImages.defaultSword,
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

  // Function to create static summon positions
  useEffect(() => {
    // Only create elements for summons with level > 0
    const activeSummons = summonUpgrades.filter(summon => summon.level > 0);
    if (activeSummons.length > 0) {
      const newSummons = activeSummons.map((summon, index) => {
        // Calculate position based on index
        const side = index % 2 === 0 ? -1 : 1; // Alternate between left (-1) and right (1)
        const position = Math.floor(index / 2); // 0-4 for each side
        const baseDistance = 135; // Base distance from sword
        const spacing = 40; // Vertical spacing between minions
        
        // Calculate x and y positions
        const x = side * baseDistance;
        const y = (position - 2) * spacing; // Center vertically with -2 offset
        
        // Determine animation based on side
        const joltAnimation = side === -1 
          ? 'summonJoltLeft 1s ease-in-out infinite'
          : 'summonJoltRight 1s ease-in-out infinite';
        
        return {
          id: index,
          imageIndex: summonUpgrades.indexOf(summon),
          style: {
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            animation: joltAnimation
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
          backgroundImage: `url(${gameImages.background})`,
          imageRendering: 'pixelated'
        }} 
      />
      
      {/* Logo */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <img 
          src={gameImages.logo} 
          alt="Terraria Clicker" 
          className="h-16 object-contain"
        />
      </div>

      {/* Main clicker area */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1">
        {/* Sword container with summons */}
        <div className="relative w-48 h-48">
          {/* Static summon container */}
          <div className="absolute inset-0">
            {/* Summon sprites */}
            {summonElements.map(summon => (
              <div
                key={summon.id}
                className="w-16 h-16 pointer-events-none"
                style={summon.style}
              >
                <img 
                  src={minionImages[summon.imageIndex]}
                  alt={`Minion ${summon.imageIndex + 1}`}
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
                <img src={gameImages.click} alt="Click Power" className="w-6 h-6" style={{ imageRendering: 'pixelated' }} />
                <span className="text-game-gold">{formatNumber(clickValue)}</span>
              </div>
              
              {/* CPS */}
              <div className="flex items-center space-x-2">
                <img src={gameImages.cps} alt="CPS" className="w-6 h-6" style={{ imageRendering: 'pixelated' }} />
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
                <img src={gameImages.coin} alt="Coins" className="w-6 h-6" style={{ imageRendering: 'pixelated' }} />
                <span className="text-game-gold text-xl">{formatNumber(currentCoins)}</span>
              </div>
            </div>
          </div>

          {/* Prestige Notification */}
          {showPrestigeNotification && (
            <div 
              onClick={onPrestigeNotificationClick}
              className="mt-4 bg-purple-700 bg-opacity-95 rounded-lg p-3 
                         text-center cursor-pointer transform hover:scale-105 transition-transform duration-200
                         shadow-lg hover:bg-purple-600 border-2 border-purple-400"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="material-icons text-white">stars</span>
                <span className="text-white font-bold">Prestige Available!</span>
                <span className="material-icons text-white">stars</span>
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