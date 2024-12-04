import React, { useState } from 'react';
import TierUpgrades from './TierUpgrades';
import SwordUpgrades from './SwordUpgrades';
import SummonUpgrades from './SummonUpgrades';
import coinIcon from '../../img/coin-icon.png';
import { formatNumber } from '../../utils/formatNumber';

const UpgradeShop = ({
  tierUpgrades,
  swordUpgrades,
  summonUpgrades,
  handleTierUpgrade,
  handleSwordUpgrade,
  handleSummonUpgrade,
  currentCoins,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('Tiers');

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Shop Panel */}
      <div className="relative bg-game-secondary bg-opacity-90 rounded-lg shadow-game max-w-4xl w-full m-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-game-accent">
          <div className="flex items-center space-x-4">
            <h2 className="font-game text-xl text-game-text">Shop</h2>
            <div className="flex items-center space-x-2 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
              <img 
                src={coinIcon} 
                alt="Coins" 
                className="w-5 h-5"
                style={{ imageRendering: 'pixelated' }}
              />
              <span className="text-game-gold font-game">
                {formatNumber(currentCoins)}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-game-text hover:text-game-highlight transition-colors"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-game-accent">
          <button 
            className={`px-6 py-3 font-game text-sm ${
              activeTab === 'Tiers' 
                ? 'text-game-highlight border-b-2 border-game-highlight' 
                : 'text-game-text hover:text-game-highlight'
            }`}
            onClick={() => setActiveTab('Tiers')}
          >
            Tier Upgrades
          </button>
          <button 
            className={`px-6 py-3 font-game text-sm ${
              activeTab === 'Swords' 
                ? 'text-game-highlight border-b-2 border-game-highlight' 
                : 'text-game-text hover:text-game-highlight'
            }`}
            onClick={() => setActiveTab('Swords')}
          >
            Sword Upgrades
          </button>
          <button 
            className={`px-6 py-3 font-game text-sm ${
              activeTab === 'Summons' 
                ? 'text-game-highlight border-b-2 border-game-highlight' 
                : 'text-game-text hover:text-game-highlight'
            }`}
            onClick={() => setActiveTab('Summons')}
          >
            Summon Upgrades
          </button>
        </div>

        {/* Content */}
        <div className="modal-content p-4">
          {activeTab === 'Tiers' && (
            <TierUpgrades 
              upgrades={tierUpgrades}
              onUpgrade={handleTierUpgrade}
              coins={currentCoins}
            />
          )}
          {activeTab === 'Swords' && (
            <SwordUpgrades 
              upgrades={swordUpgrades}
              onUpgrade={handleSwordUpgrade}
              coins={currentCoins}
            />
          )}
          {activeTab === 'Summons' && (
            <SummonUpgrades 
              upgrades={summonUpgrades}
              onUpgrade={handleSummonUpgrade}
              coins={currentCoins}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpgradeShop; 