import React from 'react'

const UpgradeShop = ({ upgrades, onPurchase, coins }) => {
  const canAfford = (cost) => coins >= cost

  return (
    <div style={{ backgroundColor: 'rgba(43, 37, 101, 0.7)', border: '2px solid black' }} className="rounded-lg p-4">
      <h2 className="text-xl font-bold text-orange-400 mb-4" style={{ fontFamily: '"Andy-Bold", cursive' }}>
        Upgrade Shop
      </h2>
      
      <div className="space-y-3">
        {/* Sword Upgrades */}
        <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(86, 86, 188, 0.7)', border: '2px solid black' }}>
          <h3 className="font-semibold text-blue-400 mb-2" style={{ fontFamily: '"Andy-Bold", cursive' }}>
            ⚔️ Swords
          </h3>
          <div className="space-y-2">
            {upgrades.swords.map((sword, index) => (
              <button
                key={index}
                onClick={() => onPurchase('sword', index)}
                disabled={!canAfford(sword.cost)}
                className={`
                  w-full p-2 rounded text-left transition-all duration-200
                  ${canAfford(sword.cost) 
                    ? 'cursor-pointer hover:shadow-lg' 
                    : 'cursor-not-allowed opacity-50'
                  }
                `}
                style={{ 
                  backgroundColor: canAfford(sword.cost) ? 'rgba(193, 161, 140, 0.7)' : 'rgba(109, 109, 107, 0.7)',
                  border: '2px solid black'
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={`/assets/images/weapons/sword${Math.min(index + 1, 12)}.png`} alt={sword.name} className="w-8 h-8 mr-2" style={{ imageRendering: 'pixelated' }} />
                    <div>
                      <div className="font-medium text-black">{sword.name}</div>
                      <div className="text-xs text-black">
                        Power: +{sword.clickBonus}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-mono flex items-center">
                      <img src="/assets/images/ui/coin-icon.png" alt="Coins" className="w-4 h-4 mr-1" />
                      {sword.cost.toLocaleString()}
                    </div>
                    <div className="text-xs text-black">
                      Level {sword.level}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Minion Upgrades */}
        <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(86, 86, 188, 0.7)', border: '2px solid black' }}>
          <h3 className="font-semibold text-green-400 mb-2" style={{ fontFamily: '"Andy-Bold", cursive' }}>
            👥 Minions
          </h3>
          <div className="space-y-2">
            {upgrades.minions.map((minion, index) => (
              <button
                key={index}
                onClick={() => onPurchase('minion', index)}
                disabled={!canAfford(minion.cost)}
                className={`
                  w-full p-2 rounded text-left transition-all duration-200
                  ${canAfford(minion.cost) 
                    ? 'cursor-pointer hover:shadow-lg' 
                    : 'cursor-not-allowed opacity-50'
                  }
                `}
                style={{ 
                  backgroundColor: canAfford(minion.cost) ? 'rgba(193, 161, 140, 0.7)' : 'rgba(109, 109, 107, 0.7)',
                  border: '2px solid black'
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={`/assets/images/weapons/minion${Math.min(index + 1, 10)}.png`} alt={minion.name} className="w-8 h-8 mr-2" style={{ imageRendering: 'pixelated' }} />
                    <div>
                      <div className="font-medium text-black">{minion.name}</div>
                      <div className="text-xs text-black">
                        CPS: +{minion.cps}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-mono flex items-center">
                      <img src="/assets/images/ui/coin-icon.png" alt="Coins" className="w-4 h-4 mr-1" />
                      {minion.cost.toLocaleString()}
                    </div>
                    <div className="text-xs text-black">
                      Level {minion.level}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="rounded-lg p-3 text-center" style={{ backgroundColor: 'rgba(193, 161, 140, 0.7)', border: '2px solid black' }}>
          <p className="text-black text-sm">
            🎯 Monster battles coming in Phase 2B!
          </p>
          <p className="text-black text-xs mt-1">
            Boss battles in Phase 2C
          </p>
        </div>
      </div>
    </div>
  )
}

export default UpgradeShop
