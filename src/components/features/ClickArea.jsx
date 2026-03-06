import React from 'react'

const ClickArea = ({ onClick, coins, clickValue, isAnimating }) => {
  const handleClick = () => {
    onClick()
    // Add visual feedback
  }

  return (
    <div style={{ backgroundColor: 'rgba(43, 37, 101, 0.7)', border: '2px solid black' }} className="rounded-lg p-6 text-center">
      <h2 className="text-xl font-bold text-orange-400 mb-6" style={{ fontFamily: '"Andy-Bold", cursive' }}>
        Battle Arena
      </h2>
      
      {/* Click Target - Sword */}
      <div className="relative mb-6">
        <button
          onClick={handleClick}
          className={`
            relative w-32 h-32 mx-auto rounded-full
            hover:scale-105 active:scale-95 transition-all duration-150
            ${isAnimating ? 'animate-pulse' : ''}
          `}
        >
          {/* Sword Icon */}
          <img src="/assets/images/weapons/swords/sword.png" alt="Sword" className="w-full h-full object-contain" style={{ imageRendering: 'pixelated' }} />
          
          {/* Click Value Display */}
          <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
            +{clickValue}
          </div>
          
          {/* Animation Effect */}
          {isAnimating && (
            <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-ping" />
          )}
        </button>
      </div>

      {/* Coin Display */}
      <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: 'rgba(193, 161, 140, 0.7)', border: '2px solid black' }}>
        <div className="text-3xl font-bold text-yellow-400 mb-2 flex items-center justify-center" style={{ fontFamily: '"Andy-Bold", cursive' }}>
          <img src="/assets/images/ui/coin-icon.png" alt="Coins" className="w-8 h-8 mr-2" />
          {coins.toLocaleString()}
        </div>
        <p className="text-sm text-black">Click the sword to earn coins!</p>
      </div>

      {/* Battle Status */}
      <div className="text-sm text-black">
        <p>🎯 Ready for monster battles...</p>
        <p className="text-xs mt-1">Monster system coming in Phase 2B</p>
      </div>
    </div>
  )
}

export default ClickArea
