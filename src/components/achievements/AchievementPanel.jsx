import React from 'react';
import { formatNumber } from '../../utils/formatNumber';
import { getAchievementProgress, achievements as defaultAchievements } from '../../data/achievementData';

const AchievementPanel = ({
  isOpen,
  onClose,
  achievements = defaultAchievements,
  currentStats
}) => {
  if (!isOpen) return null;

  const achievementsToShow = achievements?.length ? achievements : defaultAchievements.map(achievement => ({
    ...achievement,
    earned: false,
    progress: 0
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Achievement Panel */}
      <div className="relative bg-game-secondary bg-opacity-90 rounded-lg shadow-game max-w-4xl w-full m-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-game-accent">
          <h2 className="font-game text-xl text-white">Achievements</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-game-highlight transition-colors"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {/* Achievement Grid */}
        <div className="modal-content p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievementsToShow.map((achievement) => {
              const progress = getAchievementProgress(
                achievement, 
                currentStats?.[achievement.type] || 0
              );
              
              return (
                <div 
                  key={achievement.id}
                  className={`
                    bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 
                    border transition-all duration-200
                    ${achievement.earned 
                      ? 'border-game-highlight bg-game-accent bg-opacity-25' 
                      : 'border-game-accent'
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={achievement.icon} 
                        alt={achievement.name}
                        className={`w-12 h-12 ${!achievement.earned && 'opacity-50'}`}
                        style={{ imageRendering: 'pixelated' }}
                      />
                      {achievement.earned && (
                        <span className="absolute -top-1 -right-1 text-yellow-400">
                          <span className="material-icons text-sm">star</span>
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-game text-white text-sm">
                        {achievement.name}
                      </h3>
                      <p className="text-white text-xs mt-1">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="h-2 bg-game-accent rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-game-highlight transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-white">
                        {formatNumber(currentStats?.[achievement.type] || 0)}
                      </span>
                      <span className="text-xs text-white">
                        {formatNumber(achievement.requirement)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementPanel; 