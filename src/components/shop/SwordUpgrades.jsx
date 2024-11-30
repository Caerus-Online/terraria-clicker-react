import React from 'react';
import coinIcon from '../../img/coin-icon.png';
import { formatNumber } from '../../utils/formatNumber';

const SwordUpgrades = ({ upgrades, onUpgrade, clicks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {upgrades.map((upgrade, index) => (
        <div 
          key={index} 
          className={`
            bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 
            border transition-all duration-200
            ${upgrade.purchased 
              ? 'border-game-highlight bg-game-accent bg-opacity-25' 
              : clicks >= upgrade.cost 
                ? 'border-game-highlight hover:bg-opacity-70 cursor-pointer transform hover:scale-105' 
                : 'border-game-accent opacity-75 cursor-not-allowed'
            }
          `}
          onClick={() => !upgrade.purchased && clicks >= upgrade.cost && onUpgrade(index)}
        >
          <div className="flex items-center space-x-4">
            {/* Sword Image */}
            <div className="w-16 h-16 flex items-center justify-center">
              <img 
                src={upgrade.image} 
                alt={`Sword ${index + 1}`} 
                className="w-12 h-12 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>

            {/* Upgrade Info */}
            <div className="flex-1 font-game">
              <div className="text-game-text text-sm mb-2">
                {upgrade.purchased ? 'Purchased' : 'Available'}
              </div>
              
              {/* Cost */}
              {!upgrade.purchased && (
                <div className="flex items-center space-x-2 mb-2">
                  <img 
                    src={coinIcon} 
                    alt="Cost" 
                    className="w-4 h-4"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <span className="text-game-gold text-sm">
                    {formatNumber(upgrade.cost)}
                  </span>
                </div>
              )}

              {/* Multiplier */}
              <div className="text-game-highlight text-sm">
                {upgrade.multiplier}x Multiplier
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwordUpgrades; 