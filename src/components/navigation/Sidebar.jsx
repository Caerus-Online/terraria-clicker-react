import React from 'react';

const Sidebar = ({ 
  onOpenProfile,
  onOpenShop, 
  onOpenPrestige,
  onOpenAchievements,
  onOpenLeaderboard,
  onOpenSettings,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-top flex flex-col items-center">
        <div className="relative group">
          <button 
            className="sidebar-btn" 
            onClick={onOpenProfile}
          >
            <span className="material-icons">person</span>
          </button>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black bg-opacity-75 text-white text-sm rounded 
                        opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            View Profile Stats
          </div>
        </div>

        <div className="relative group">
          <button 
            className="sidebar-btn" 
            onClick={onOpenShop}
          >
            <span className="material-icons">store</span>
          </button>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black bg-opacity-75 text-white text-sm rounded 
                        opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Purchase Upgrades
          </div>
        </div>

        <div className="relative group">
          <button 
            className="sidebar-btn" 
            onClick={onOpenPrestige}
          >
            <span className="material-icons">stars</span>
          </button>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black bg-opacity-75 text-white text-sm rounded 
                        opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Prestige & Artifacts
          </div>
        </div>

        <div className="relative group">
          <button 
            className="sidebar-btn" 
            onClick={onOpenAchievements}
          >
            <span className="material-icons">emoji_events</span>
          </button>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black bg-opacity-75 text-white text-sm rounded 
                        opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            View Achievements
          </div>
        </div>

        <div className="relative group">
          <button 
            className="sidebar-btn" 
            onClick={onOpenLeaderboard}
          >
            <span className="material-icons">leaderboard</span>
          </button>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black bg-opacity-75 text-white text-sm rounded 
                        opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Global Leaderboard
          </div>
        </div>

        <div className="relative group">
          <button 
            className="sidebar-btn" 
            onClick={onOpenSettings}
          >
            <span className="material-icons">settings</span>
          </button>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black bg-opacity-75 text-white text-sm rounded 
                        opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Game Settings
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 