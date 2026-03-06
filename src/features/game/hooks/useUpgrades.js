import { useState, useCallback } from 'react'
import { calculateNextUpgradeCost } from '../services/gameCalculations'

const createInitialUpgrades = () => ({
  swords: [
    {
      name: 'Wooden Sword',
      level: 0,
      cost: 10,
      baseCost: 10,
      clickBonus: 1,
      cps: 0
    },
    {
      name: 'Iron Sword', 
      level: 0,
      cost: 100,
      baseCost: 100,
      clickBonus: 5,
      cps: 0
    },
    {
      name: 'Gold Sword',
      level: 0, 
      cost: 1000,
      baseCost: 1000,
      clickBonus: 20,
      cps: 0
    }
  ],
  minions: [
    {
      name: 'Zombie Minion',
      level: 0,
      cost: 50,
      baseCost: 50,
      clickBonus: 0,
      cps: 1
    },
    {
      name: 'Skeleton Minion',
      level: 0,
      cost: 500,
      baseCost: 500,
      clickBonus: 0,
      cps: 5
    },
    {
      name: 'Demon Eye',
      level: 0,
      cost: 5000,
      baseCost: 5000,
      clickBonus: 0,
      cps: 25
    }
  ]
})

const useUpgrades = () => {
  const [upgrades, setUpgrades] = useState(createInitialUpgrades)

  const purchaseUpgrade = useCallback((type, index) => {
    setUpgrades(prev => {
      const newUpgrades = { ...prev }
      const upgrade = { ...newUpgrades[type][index] }
      
      // Calculate next cost and level
      upgrade.level += 1
      upgrade.cost = calculateNextUpgradeCost(upgrade.baseCost, upgrade.level)
      
      newUpgrades[type][index] = upgrade
      return newUpgrades
    })
  }, [])

  const getTotalClickBonus = useCallback(() => {
    return upgrades.swords.reduce((total, sword) => {
      return total + (sword.clickBonus * sword.level)
    }, 0)
  }, [upgrades.swords])

  const getTotalCPS = useCallback(() => {
    return upgrades.minions.reduce((total, minion) => {
      return total + (minion.cps * minion.level)
    }, 0)
  }, [upgrades.minions])

  const getUpgradeCost = useCallback((type, index) => {
    return upgrades[type][index].cost
  }, [upgrades])

  const getUpgradeLevel = useCallback((type, index) => {
    return upgrades[type][index].level
  }, [upgrades])

  return {
    upgrades,
    purchaseUpgrade,
    getTotalClickBonus,
    getTotalCPS,
    getUpgradeCost,
    getUpgradeLevel
  }
}

export default useUpgrades
