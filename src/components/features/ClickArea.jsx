import React from 'react'

const ClickArea = ({ onClick, coins, clickValue, isAnimating }) => {
  const handleClick = () => {
    onClick()
    // Add visual feedback
  }

  return (
    <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-6 border border-orange-900/30 text-center">
      <h2 className="text-xl font-bold text-orange-400 mb-6" style={{ fontFamily: '"Andy-Bold", cursive' }}>
        Battle Arena
      </h2>
      
      {/* Click Target - Sword */}
      <div className="relative mb-6">
        <button
          onClick={handleClick}
          className={`
            relative w-32 h-32 mx-auto rounded-full
            bg-gradient-to-br from-gray-600 to-gray-800
            border-4 border-gray-500
            hover:from-gray-500 hover:to-gray-700
            active:scale-95 transition-all duration-150
            shadow-lg hover:shadow-xl
            ${isAnimating ? 'animate-pulse' : ''}
          `}
        >
          {/* Sword Icon */}
          <div className="text-4xl">⚔️</div>
          
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
      <div className="bg-black bg-opacity-40 rounded-lg p-4 mb-4 border border-orange-900/20">
        <div className="text-3xl font-bold text-yellow-400 mb-2" style={{ fontFamily: '"Andy-Bold", cursive' }}>
          💰 {coins.toLocaleString()}
        </div>
        <p className="text-sm text-gray-300">Click the sword to earn coins!</p>
      </div>

      {/* Battle Status */}
      <div className="text-sm text-gray-300">
        <p>🎯 Ready for monster battles...</p>
        <p className="text-xs mt-1">Monster system coming in Phase 2B</p>
      </div>
    </div>
  )
}

export default ClickArea
