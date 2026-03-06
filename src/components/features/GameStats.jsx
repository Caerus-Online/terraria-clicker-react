import React from 'react'

const GameStats = ({ coins = 0, clickValue = 1, cps = 0, clicks = 0, prestigeLevel = 0 }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div style={{ backgroundColor: 'rgba(43, 37, 101, 0.7)', border: '2px solid black' }} className="rounded-lg p-4">
      <h2 className="text-xl font-bold text-orange-400 mb-4" style={{ fontFamily: '"Andy-Bold", cursive' }}>
        Game Stats
      </h2>
      
      <div className="space-y-3">
        {/* Coins */}
        <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'rgba(193, 161, 140, 0.7)', border: '2px solid black' }}>
          <div className="flex items-center">
            <img src="/assets/images/ui/coin-icon.png" alt="Coins" className="w-5 h-5 mr-2" />
            <span className="text-black">Coins</span>
          </div>
          <span className="font-mono font-bold text-black">{formatNumber(coins)}</span>
        </div>

        {/* Click Value */}
        <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'rgba(193, 161, 140, 0.7)', border: '2px solid black' }}>
          <div className="flex items-center">
            <img src="/assets/images/ui/click-icon.png" alt="Click Power" className="w-5 h-5 mr-2" />
            <span className="text-black">Click Power</span>
          </div>
          <span className="font-mono font-bold text-black">{formatNumber(clickValue)}</span>
        </div>

        {/* Coins Per Second */}
        <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'rgba(193, 161, 140, 0.7)', border: '2px solid black' }}>
          <div className="flex items-center">
            <img src="/assets/images/ui/cpsIcon.png" alt="CPS" className="w-5 h-5 mr-2" />
            <span className="text-black">CPS</span>
          </div>
          <span className="font-mono font-bold text-black">{formatNumber(cps)}</span>
        </div>

        {/* Total Clicks */}
        <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'rgba(193, 161, 140, 0.7)', border: '2px solid black' }}>
          <div className="flex items-center">
            <img src="/assets/images/ui/click-icon.png" alt="Total Clicks" className="w-5 h-5 mr-2" />
            <span className="text-black">Total Clicks</span>
          </div>
          <span className="font-mono font-bold text-black">{formatNumber(clicks)}</span>
        </div>

        {/* Prestige Level */}
        <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'rgba(193, 161, 140, 0.7)', border: '2px solid black' }}>
          <div className="flex items-center">
            <img src="/assets/images/ui/prestige1.png" alt="Prestige" className="w-5 h-5 mr-2" />
            <span className="text-black">Prestige</span>
          </div>
          <span className="font-mono font-bold text-black">Level {prestigeLevel}</span>
        </div>

        {/* Prestige Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-black mb-1">
            <span>Prestige Progress</span>
            <span>{(clicks % 1000)}/1000</span>
          </div>
          <div className="w-full rounded-full h-2" style={{ backgroundColor: 'rgba(193, 161, 140, 0.7)', border: '2px solid black' }}>
            <div 
              className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((clicks % 1000) / 1000) * 100}%` }}
            />
          </div>
          <p className="text-xs text-black mt-1">
            {clicks >= 1000 ? '🎉 Prestige Available!' : `${1000 - clicks} clicks to prestige`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default GameStats
