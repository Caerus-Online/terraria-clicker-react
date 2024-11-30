import React, { forwardRef } from 'react';
import defaultSwordImage from '../../img/sword.png';
import backgroundImage from '../../img/background.png';
import logo from '../../img/logo.png';
import clickIcon from '../../img/click-icon.png';
import cpsIcon from '../../img/cpsIcon.png';
import coinIcon from '../../img/coin-icon.png';

const ClickerCore = forwardRef(({ 
  handleClick, 
  swordImage = defaultSwordImage,
  clickValue,
  cps,
  clicks,
  swordMultiplier,
  prestigeLevel
}, ref) => {
  return (
    <div className="relative flex flex-col items-center min-h-screen">
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
        {/* Sword container */}
        <div 
          ref={ref}
          onClick={handleClick}
          className="cursor-pointer transform transition-transform hover:scale-110 animate-float"
        >
          <img 
            src={swordImage} 
            alt="Click Sword"
            className="w-48 h-48 object-contain filter drop-shadow-lg hover:drop-shadow-2xl"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        {/* Stats display - using Terraria style transparent panels */}
        <div className="mt-8 font-game text-game-text">
          <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border border-game-accent">
            <div className="grid grid-cols-2 gap-4">
              {/* Click Power */}
              <div className="flex items-center space-x-2">
                <img src={clickIcon} alt="Click Power" className="w-6 h-6" style={{ imageRendering: 'pixelated' }} />
                <span className="text-game-gold">{clickValue}</span>
              </div>
              
              {/* CPS */}
              <div className="flex items-center space-x-2">
                <img src={cpsIcon} alt="CPS" className="w-6 h-6" style={{ imageRendering: 'pixelated' }} />
                <span className="text-game-silver">{cps}</span>
              </div>
              
              {/* Multiplier */}
              <div className="flex items-center space-x-2">
                <span className="text-game-highlight">x{swordMultiplier}</span>
                <span className="text-sm">Multiplier</span>
              </div>
              
              {/* Prestige Level */}
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">Lv.{prestigeLevel}</span>
                <span className="text-sm">Prestige</span>
              </div>
            </div>

            {/* Total Coins */}
            <div className="mt-4 flex items-center justify-center space-x-2">
              <img src={coinIcon} alt="Coins" className="w-6 h-6" style={{ imageRendering: 'pixelated' }} />
              <span className="text-game-gold text-xl">{clicks}</span>
            </div>
          </div>
        </div>

        {/* CPS Display */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="font-game text-2xl text-game-text text-center drop-shadow-lg">
            {cps} Clicks Per Second
          </p>
        </div>
      </div>
    </div>
  );
});

ClickerCore.displayName = 'ClickerCore';

export default ClickerCore; 