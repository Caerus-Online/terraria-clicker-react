import React from 'react';
import prestigeCoinIcon from '../../img/platnium.png';
import { formatNumber } from '../../utils/formatNumber';

const PrestigeShop = ({
  isOpen,
  onClose,
  currentClicks,
  prestigeLevel,
  prestigeCurrency,
  onPrestige,
  prestigeRequirement,
  artifacts,
  onPurchaseArtifact
}) => {
  // Calculate potential prestige currency gain (1 prestige coin per 1000 total clicks)
  const potentialGain = Math.floor(currentClicks / prestigeRequirement);
  
  // Calculate current prestige bonus (each level gives +1% to all production)
  const prestigeBonus = prestigeLevel * 0.01; // 1% per level

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Prestige Panel */}
      <div className="relative bg-game-secondary bg-opacity-90 rounded-lg shadow-game max-w-4xl w-full m-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-game-accent">
          <h2 className="font-game text-xl text-game-text">Prestige Shop</h2>
          <button 
            onClick={onClose}
            className="text-game-text hover:text-game-highlight transition-colors"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {/* Prestige Info */}
        <div className="p-6 border-b border-game-accent">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <img 
                src={prestigeCoinIcon} 
                alt="Prestige Coins" 
                className="w-6 h-6"
                style={{ imageRendering: 'pixelated' }}
              />
              <span className="text-purple-400 font-game">
                {formatNumber(prestigeCurrency)}
              </span>
            </div>
            <div className="text-game-text font-game">
              Level {prestigeLevel} (+{(prestigeBonus * 100).toFixed(0)}% to all production)
            </div>
          </div>

          <div className="bg-black bg-opacity-50 rounded-lg p-4">
            <p className="text-game-text font-game mb-4">
              Prestige now to gain {formatNumber(potentialGain)} prestige coins
            </p>
            <p className="text-game-accent font-game text-sm mb-4">
              Requirement: {formatNumber(prestigeRequirement)} clicks
            </p>
            <button
              className={`
                w-full py-2 px-4 rounded-lg font-game
                ${currentClicks >= prestigeRequirement
                  ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }
              `}
              onClick={() => currentClicks >= prestigeRequirement && onPrestige(potentialGain)}
              disabled={currentClicks < prestigeRequirement}
            >
              Prestige
            </button>
          </div>
        </div>

        {/* Artifacts Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {artifacts.map((artifact, index) => (
              <div 
                key={index}
                className={`
                  bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 
                  border transition-all duration-200
                  ${prestigeCurrency >= artifact.cost 
                    ? 'border-purple-400 hover:bg-opacity-70 cursor-pointer' 
                    : 'border-game-accent opacity-75 cursor-not-allowed'
                  }
                `}
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={artifact.image} 
                    alt={artifact.name} 
                    className="w-12 h-12"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <div>
                    <h3 className="font-game text-game-text">{artifact.name}</h3>
                    <p className="text-sm text-game-accent">Level {artifact.level}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <img 
                        src={prestigeCoinIcon} 
                        alt="Cost" 
                        className="w-4 h-4"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <span className="text-purple-400">
                        {formatNumber(artifact.cost)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-game-text">
                  {artifact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrestigeShop; 