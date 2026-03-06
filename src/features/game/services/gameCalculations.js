/**
 * Core game calculation utilities
 * Following test-driven development principles
 */

export const calculateNextUpgradeCost = (baseCost, level, multiplier = 1.5) => {
  return Math.floor(baseCost * Math.pow(multiplier, level))
}

export const calculateCPS = (upgrades) => {
  return upgrades.reduce((total, upgrade) => {
    return total + upgrade.cps
  }, 0)
}

export const calculateClickValue = (baseValue, upgrades, prestigeBonus = 1) => {
  const upgradeBonus = upgrades.reduce((total, upgrade) => {
    return total + (upgrade.clickBonus || 0)
  }, 0)
  
  return Math.floor((baseValue + upgradeBonus) * prestigeBonus)
}

export const calculateCriticalHit = (baseDamage, critChance = 0.1, critMultiplier = 2) => {
  const isCrit = Math.random() < critChance
  const damage = isCrit ? baseDamage * critMultiplier : baseDamage
  
  return {
    damage,
    isCritical: isCrit,
    baseDamage
  }
}

export const calculatePrestigeBonus = (prestigeLevel) => {
  return 1 + (prestigeLevel * 0.1) // 10% bonus per prestige level
}

export const calculateBossDamage = (baseDamage, playerLevel, weaponLevel) => {
  const playerMultiplier = 1 + (playerLevel * 0.05)
  const weaponMultiplier = 1 + (weaponLevel * 0.1)
  
  return Math.floor(baseDamage * playerMultiplier * weaponMultiplier)
}

export const calculateHeroEffectiveness = (heroLevel, heroType) => {
  const baseEffectiveness = heroLevel * 0.1
  const typeBonus = {
    'guide': 1.2,      // 20% bonus to coin generation
    'nurse': 1.5,     // 50% bonus to healing
    'merchant': 1.3,  // 30% bonus to shop prices
    'demolitionist': 1.4 // 40% bonus to explosive damage
  }
  
  return baseEffectiveness * (typeBonus[heroType] || 1)
}

export const calculateLuckProbability = (baseChance, luckBonus = 0) => {
  const modifiedChance = Math.min(baseChance + luckBonus, 1) // Cap at 100%
  return Math.random() < modifiedChance
}

export const calculateSetBonus = (equippedItems, setData) => {
  const setCounts = {}
  
  // Count items from each set
  equippedItems.forEach(item => {
    if (item.set) {
      setCounts[item.set] = (setCounts[item.set] || 0) + 1
    }
  })
  
  // Calculate bonuses
  const bonuses = []
  Object.entries(setCounts).forEach(([setName, count]) => {
    const setInfo = setData[setName]
    if (setInfo) {
      const applicableBonuses = setInfo.bonuses.filter(
        bonus => count >= bonus.required
      )
      bonuses.push(...applicableBonuses)
    }
  })
  
  return bonuses
}
