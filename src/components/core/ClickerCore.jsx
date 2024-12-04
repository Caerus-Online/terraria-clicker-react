import React, { forwardRef } from 'react';
import defaultSwordImage from '../../img/sword.png';
import backgroundImage from '../../img/background.png';
import logo from '../../img/logo.png';
import clickIcon from '../../img/click-icon.png';
import cpsIcon from '../../img/cpsIcon.png';
import coinIcon from '../../img/coin-icon.png';
import { formatNumber } from '../../utils/formatNumber';

const ClickerCore = forwardRef(({ 
  handleClick, 
  swordImage = defaultSwordImage,
  clickValue = 0,
  cps = 0,
  clicks = 0,
  lifetimeClicks = 0,
  swordMultiplier = 1,
  prestigeLevel = 0
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
          className="cursor-pointer transform hover:scale-110 active:scale-95 active:rotate-12 transition-all duration-100"
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
              
              {/* Total Clicks */}
              <div className="flex items-center space-x-2">
                <img src={clickIcon} alt="Total Clicks" className="w-6 h-6 opacity-50" style={{ imageRendering: 'pixelated' }} />
                <span className="text-game-text text-sm">Total: {formatNumber(clicks)}</span>
              </div>
              
              {/* Prestige Level */}
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">Lv.{prestigeLevel}</span>
                <span className="text-sm">Prestige</span>
              </div>

              {/* Total Coins */}
              <div className="flex items-center justify-center space-x-2">
                <img src={coinIcon} alt="Coins" className="w-6 h-6" style={{ imageRendering: 'pixelated' }} />
                <span className="text-game-gold text-xl">{formatNumber(clicks)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ClickerCore.displayName = 'ClickerCore';

export default ClickerCore; 