import React from 'react';

const Sidebar = ({ 
  onOpenShop, 
  onOpenPrestige,
  onOpenAchievements,
  onOpenSettings,
  onOpenProfile,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-top flex flex-col items-center">
        <button 
          className="sidebar-btn" 
          onClick={onOpenProfile}
          title="Profile"
        >
          <span className="material-icons">person</span>
        </button>
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
    </div>
  );
};

export default Sidebar; 