import React from 'react';
import coinIcon from '../../img/coin-icon.png';
import clickIcon from '../../img/click-icon.png';
import { formatNumber } from '../../utils/formatNumber';

const TierUpgrades = ({ upgrades, onUpgrade, clicks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {upgrades.map((upgrade, index) => (
        <div 
          key={index} 
          className={`
            bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 
            border transition-all duration-200 cursor-pointer
            ${clicks >= upgrade.cost 
              ? 'border-game-highlight hover:bg-opacity-70 transform hover:scale-105' 
              : 'border-game-accent opacity-75 cursor-not-allowed'
            }
          `}
          onClick={() => clicks >= upgrade.cost && onUpgrade(index)}
        >
          <div className="flex items-center space-x-4">
            {/* Upgrade Image */}
            <div className="w-16 h-16 flex items-center justify-center">
              <img 
                src={upgrade.image} 
                alt={`Tier ${upgrade.level + 1}`} 
                className="w-12 h-12 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>

            {/* Upgrade Info */}
            <div className="flex-1 font-game">
              <div className="text-game-text text-sm mb-2">
                Level {upgrade.level}
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

              {/* Click Power */}
              <div className="flex items-center space-x-2">
                <img 
                  src={clickIcon} 
                  alt="Click Power" 
                  className="w-4 h-4"
                  style={{ imageRendering: 'pixelated' }}
                />
                <span className="text-game-text text-sm">
                  +{formatNumber(upgrade.clicksProvided)}
                  <span className="text-game-accent ml-2">
                    ({formatNumber(upgrade.totalClicksProvided)})
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TierUpgrades; 