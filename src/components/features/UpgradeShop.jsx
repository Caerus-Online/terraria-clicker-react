import React from 'react'

const UpgradeShop = ({ upgrades, onPurchase, coins }) => {
  const canAfford = (cost) => coins >= cost

  return (
    <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-orange-900/30">
      <h2 className="text-xl font-bold text-orange-400 mb-4" style={{ fontFamily: '"Andy-Bold", cursive' }}>
        Upgrade Shop
      </h2>
      
      <div className="space-y-3">
        {/* Sword Upgrades */}
        <div className="bg-black bg-opacity-40 rounded-lg p-3 border border-orange-900/20">
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
                    ? 'bg-black bg-opacity-30 hover:bg-opacity-50 cursor-pointer border border-orange-900/20 hover:border-orange-900/40' 
                    : 'bg-black bg-opacity-20 cursor-not-allowed opacity-50 border border-orange-900/10'
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-white">{sword.name}</div>
                    <div className="text-xs text-gray-300">
                      Power: +{sword.clickBonus}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-mono">
                      💰 {sword.cost.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-300">
                      Level {sword.level}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Minion Upgrades */}
        <div className="bg-black bg-opacity-40 rounded-lg p-3 border border-orange-900/20">
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
                    ? 'bg-black bg-opacity-30 hover:bg-opacity-50 cursor-pointer border border-orange-900/20 hover:border-orange-900/40' 
                    : 'bg-black bg-opacity-20 cursor-not-allowed opacity-50 border border-orange-900/10'
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-white">{minion.name}</div>
                    <div className="text-xs text-gray-300">
                      CPS: +{minion.cps}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-mono">
                      💰 {minion.cost.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-300">
                      Level {minion.level}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-black bg-opacity-40 rounded-lg p-3 text-center border border-orange-900/20">
          <p className="text-gray-300 text-sm">
            🎯 Monster battles coming in Phase 2B!
          </p>
          <p className="text-gray-300 text-xs mt-1">
            Boss battles in Phase 2C
          </p>
        </div>
      </div>
    </div>
  )
}

export default UpgradeShop
