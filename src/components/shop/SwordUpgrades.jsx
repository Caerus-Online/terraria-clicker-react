import React from 'react';
import coinIcon from '../../img/coin-icon.png';
import { formatNumber } from '../../utils/formatNumber';

const SwordUpgrades = ({ upgrades, onUpgrade, coins }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {upgrades.map((upgrade, index) => (
        <div 
          key={index} 
          className={`
            bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 
            border transition-all duration-200 cursor-pointer
            ${coins >= upgrade.cost && !upgrade.purchased 
              ? 'border-game-highlight hover:bg-opacity-70 transform hover:scale-105' 
              : 'border-game-accent opacity-75 cursor-not-allowed'
            }
          `}
          onClick={() => coins >= upgrade.cost && !upgrade.purchased && onUpgrade(index)}
        >
          <div className="flex items-center space-x-4">
            {/* Sword Image */}
            <div className="w-16 h-16 flex items-center justify-center">
              <img 
                src={upgrade.image} 
                alt={upgrade.name} 
                className="w-12 h-12 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>

            {/* Upgrade Info */}
            <div className="flex-1 font-game">
              <div className="text-game-text text-sm mb-2">
                {upgrade.name}
              </div>
              
              {/* Cost */}
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

              {/* Multiplier */}
              <div className="flex items-center space-x-2">
                <span className="text-game-highlight">x{upgrade.multiplier}</span>
                <span className="text-sm">Multiplier</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwordUpgrades; 