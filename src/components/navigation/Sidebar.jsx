import React from 'react';

const Sidebar = ({ 
  onOpenShop, 
  onOpenPrestige,
  onOpenAchievements,
  onOpenSettings,
  clicks,
  prestigeCurrency
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-top flex flex-col items-center">
        <button 
          className="sidebar-btn" 
          onClick={onOpenShop}
          title="Shop"
        >
          <span className="material-icons">store</span>
        </button>
        <button 
          className="sidebar-btn" 
          onClick={onOpenPrestige}
          title="Prestige"
        >
          <span className="material-icons">stars</span>
        </button>
        <button 
          className="sidebar-btn" 
          onClick={onOpenAchievements}
          title="Achievements"
        >
          <span className="material-icons">emoji_events</span>
        </button>
        <button 
          className="sidebar-btn" 
          onClick={onOpenSettings}
          title="Settings"
        >
          <span className="material-icons">settings</span>
        </button>
      </div>
      <div className="sidebar-bottom">
        <div className="currency-display">
          <span className="text-yellow-400">{clicks}</span>
          <span className="text-purple-400">{prestigeCurrency}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 