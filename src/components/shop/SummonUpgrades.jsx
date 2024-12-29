import React from 'react';
import coinIcon from '../../img/coin-icon.png';
import cpsIcon from '../../img/cpsIcon.png';
import { formatNumber } from '../../utils/formatNumber';
import { calculateCostReduction } from '../../data/prestigeArtifacts';

const SummonUpgrades = ({ upgrades, onUpgrade, coins, artifacts = [] }) => {
  const getFinalCost = (cost) => {
    const costReduction = calculateCostReduction(artifacts);
    return Math.floor(cost * (1 - costReduction));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {upgrades.map((upgrade, index) => {
        const finalCost = getFinalCost(upgrade.cost);
        return (
          <div 
            key={index} 
            className={`
              bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 
              border transition-all duration-200 cursor-pointer
              ${coins >= finalCost 
                ? 'border-game-highlight hover:bg-opacity-70 transform hover:scale-105' 
                : 'border-game-accent opacity-75 cursor-not-allowed'
              }
            `}
            onClick={() => coins >= finalCost && onUpgrade(index)}
          >
            <div className="flex items-center space-x-4">
              {/* Summon Image */}
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src={upgrade.image} 
                  alt={`Summon ${upgrade.level + 1}`} 
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
                    {formatNumber(finalCost)}
                  </span>
                </div>

                {/* CPS Bonus */}
                <div className="flex items-center space-x-2">
                  <img 
                    src={cpsIcon} 
                    alt="CPS" 
                    className="w-4 h-4"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <span className="text-game-text text-sm">
                    +{formatNumber(upgrade.cpsProvided)}
                    <span className="text-game-accent ml-2">
                      ({formatNumber(upgrade.totalCps)})
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummonUpgrades; 