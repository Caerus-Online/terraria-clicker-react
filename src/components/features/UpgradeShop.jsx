import React from 'react'

const UpgradeShop = ({ upgrades, onPurchase, coins }) => {
  const canAfford = (cost) => coins >= cost

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      <h2 className="text-xl font-bold text-orange-400 mb-4">Upgrade Shop</h2>
      
      <div className="space-y-3">
        {/* Sword Upgrades */}
        <div className="bg-slate-700 rounded-lg p-3">
          <h3 className="font-semibold text-blue-400 mb-2">⚔️ Swords</h3>
          <div className="space-y-2">
            {upgrades.swords.map((sword, index) => (
              <button
                key={index}
                onClick={() => onPurchase('sword', index)}
                disabled={!canAfford(sword.cost)}
                className={`
                  w-full p-2 rounded text-left transition-all duration-200
                  ${canAfford(sword.cost) 
                    ? 'bg-slate-600 hover:bg-slate-500 cursor-pointer' 
                    : 'bg-slate-800 cursor-not-allowed opacity-50'
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{sword.name}</div>
                    <div className="text-xs text-slate-400">
                      Power: +{sword.clickBonus}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-mono">
                      💰 {sword.cost.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">
                      Level {sword.level}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Minion Upgrades */}
        <div className="bg-slate-700 rounded-lg p-3">
          <h3 className="font-semibold text-green-400 mb-2">👥 Minions</h3>
          <div className="space-y-2">
            {upgrades.minions.map((minion, index) => (
              <button
                key={index}
                onClick={() => onPurchase('minion', index)}
                disabled={!canAfford(minion.cost)}
                className={`
                  w-full p-2 rounded text-left transition-all duration-200
                  ${canAfford(minion.cost) 
                    ? 'bg-slate-600 hover:bg-slate-500 cursor-pointer' 
                    : 'bg-slate-800 cursor-not-allowed opacity-50'
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{minion.name}</div>
                    <div className="text-xs text-slate-400">
                      CPS: +{minion.cps}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-mono">
                      💰 {minion.cost.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">
                      Level {minion.level}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-slate-700 rounded-lg p-3 text-center">
          <p className="text-slate-400 text-sm">
            🎯 Monster battles coming in Phase 2B!
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Boss battles in Phase 2C
          </p>
        </div>
      </div>
    </div>
  )
}

export default UpgradeShop
