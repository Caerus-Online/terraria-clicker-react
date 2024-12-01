import React from 'react';
import coinIcon from '../../img/coin-icon.png';
import clickIcon from '../../img/click-icon.png';
import prestigeIcon from '../../img/platnium.png';
import { formatNumber } from '../../utils/formatNumber';

const ProfileStats = ({
  isOpen,
  onClose,
  stats: {
    lifetimeClicks,
    lifetimeCoins,
    prestigeLevel,
    achievementsEarned,
    totalAchievements,
    clickPower,
    cps,
    swordMultiplier
  }
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Profile Panel */}
      <div className="relative bg-game-secondary bg-opacity-90 rounded-lg shadow-game max-w-md w-full m-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-game-accent">
          <h2 className="font-game text-xl text-game-text">Profile Stats</h2>
          <button 
            onClick={onClose}
            className="text-game-text hover:text-game-highlight transition-colors"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="modal-content p-6 grid grid-cols-1 gap-4">
          {/* Lifetime Stats */}
          <div className="bg-black bg-opacity-50 rounded-lg p-4">
            <h3 className="font-game text-game-highlight mb-4">Lifetime Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={clickIcon} alt="Clicks" className="w-5 h-5" style={{ imageRendering: 'pixelated' }} />
                  <span className="text-game-text">Total Clicks:</span>
                </div>
                <span className="text-game-gold">{formatNumber(lifetimeClicks)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={coinIcon} alt="Coins" className="w-5 h-5" style={{ imageRendering: 'pixelated' }} />
                  <span className="text-game-text">Total Coins:</span>
                </div>
                <span className="text-game-gold">{formatNumber(lifetimeCoins)}</span>
              </div>
            </div>
          </div>

          {/* Current Stats */}
          <div className="bg-black bg-opacity-50 rounded-lg p-4">
            <h3 className="font-game text-game-highlight mb-4">Current Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-game-text">Click Power:</span>
                <span className="text-game-gold">{formatNumber(clickPower)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-game-text">CPS:</span>
                <span className="text-game-silver">{formatNumber(cps)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-game-text">Multiplier:</span>
                <span className="text-game-highlight">x{swordMultiplier}</span>
              </div>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="bg-black bg-opacity-50 rounded-lg p-4">
            <h3 className="font-game text-game-highlight mb-4">Progress</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={prestigeIcon} alt="Prestige" className="w-5 h-5" style={{ imageRendering: 'pixelated' }} />
                  <span className="text-game-text">Prestige Level:</span>
                </div>
                <span className="text-purple-400">{prestigeLevel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-game-text">Achievements:</span>
                <span className="text-yellow-400">{achievementsEarned}/{totalAchievements}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats; 