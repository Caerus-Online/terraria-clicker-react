import React from 'react';

const SettingsMenu = ({ 
  isOpen, 
  onClose, 
  bgVolume, 
  setBgVolume, 
  effectsVolume, 
  setEffectsVolume 
}) => {
  if (!isOpen) return null;

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all game data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Menu Panel */}
      <div className="relative bg-game-secondary bg-opacity-90 rounded-lg p-6 shadow-game max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-game text-xl text-game-text">Settings</h2>
          <button 
            onClick={onClose}
            className="text-game-text hover:text-game-highlight transition-colors"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="volume-control">
            <h3 className="font-game text-sm text-game-text mb-2">Background Music</h3>
            <div className="flex items-center space-x-4">
              <span className="material-icons text-game-text">
                {bgVolume === 0 ? 'volume_off' : 'volume_up'}
              </span>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={bgVolume} 
                onChange={(e) => setBgVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-game-accent rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="volume-control">
            <h3 className="font-game text-sm text-game-text mb-2">Sound Effects</h3>
            <div className="flex items-center space-x-4">
              <span className="material-icons text-game-text">
                {effectsVolume === 0 ? 'volume_off' : 'music_note'}
              </span>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={effectsVolume} 
                onChange={(e) => setEffectsVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-game-accent rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="border-t border-game-accent pt-6">
            <button
              onClick={handleClearData}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-game text-sm transition-colors"
            >
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu; 