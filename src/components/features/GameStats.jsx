import React from 'react'

const GameStats = ({ coins = 0, clickValue = 1, cps = 0, clicks = 0, prestigeLevel = 0 }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-orange-900/30">
      <h2 className="text-xl font-bold text-orange-400 mb-4" style={{ fontFamily: '"Andy-Bold", cursive' }}>
        Game Stats
      </h2>
      
      <div className="space-y-3">
        {/* Coins */}
        <div className="flex justify-between items-center p-2 bg-black bg-opacity-40 rounded border border-orange-900/20">
          <span className="text-yellow-400">💰 Coins</span>
          <span className="font-mono font-bold text-white">{formatNumber(coins)}</span>
        </div>

        {/* Click Value */}
        <div className="flex justify-between items-center p-2 bg-black bg-opacity-40 rounded border border-orange-900/20">
          <span className="text-blue-400">⚔️ Click Power</span>
          <span className="font-mono font-bold text-white">{formatNumber(clickValue)}</span>
        </div>

        {/* Coins Per Second */}
        <div className="flex justify-between items-center p-2 bg-black bg-opacity-40 rounded border border-orange-900/20">
          <span className="text-green-400">⚡ CPS</span>
          <span className="font-mono font-bold text-white">{formatNumber(cps)}</span>
        </div>

        {/* Total Clicks */}
        <div className="flex justify-between items-center p-2 bg-black bg-opacity-40 rounded border border-orange-900/20">
          <span className="text-purple-400">👆 Total Clicks</span>
          <span className="font-mono font-bold text-white">{formatNumber(clicks)}</span>
        </div>

        {/* Prestige Level */}
        <div className="flex justify-between items-center p-2 bg-black bg-opacity-40 rounded border border-orange-900/20">
          <span className="text-red-400">🌟 Prestige</span>
          <span className="font-mono font-bold text-white">Level {prestigeLevel}</span>
        </div>

        {/* Prestige Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-300 mb-1">
            <span>Prestige Progress</span>
            <span>{(clicks % 1000)}/1000</span>
          </div>
          <div className="w-full bg-black bg-opacity-40 rounded-full h-2 border border-orange-900/20">
            <div 
              className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((clicks % 1000) / 1000) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-300 mt-1">
            {clicks >= 1000 ? '🎉 Prestige Available!' : `${1000 - clicks} clicks to prestige`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default GameStats
