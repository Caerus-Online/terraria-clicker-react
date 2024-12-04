import React from 'react';

const AchievementNotification = ({ achievement, onClose }) => {
  return (
    <div 
      className="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg shadow-lg flex items-center space-x-4 animate-slide-in z-[200]"
      onClick={onClose}
    >
      <div className="relative">
        <img 
          src={achievement.icon} 
          alt={achievement.name}
          className="w-12 h-12"
          style={{ imageRendering: 'pixelated' }}
        />
        <span className="absolute -top-1 -right-1 text-yellow-400">
          <span className="material-icons text-sm">star</span>
        </span>
      </div>
      <div>
        <h3 className="font-game text-sm text-game-highlight">Achievement Unlocked!</h3>
        <p className="text-white text-xs mt-1">{achievement.name}</p>
      </div>
    </div>
  );
};

export default AchievementNotification; 