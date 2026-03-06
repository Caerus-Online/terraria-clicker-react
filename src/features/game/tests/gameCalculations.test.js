import {
  calculateNextUpgradeCost,
  calculateCPS,
  calculateClickValue,
  calculateCriticalHit,
  calculatePrestigeBonus,
  calculateBossDamage,
  calculateHeroEffectiveness,
  calculateLuckProbability,
  calculateSetBonus
} from '../services/gameCalculations'

describe('gameCalculations', () => {
  describe('calculateNextUpgradeCost', () => {
    it('should calculate correct upgrade cost with default multiplier', () => {
      expect(calculateNextUpgradeCost(100, 0)).toBe(100)
      expect(calculateNextUpgradeCost(100, 1)).toBe(150)
      expect(calculateNextUpgradeCost(100, 2)).toBe(225)
    })

    it('should calculate correct upgrade cost with custom multiplier', () => {
      expect(calculateNextUpgradeCost(100, 1, 2)).toBe(200)
      expect(calculateNextUpgradeCost(50, 3, 1.5)).toBe(168) // 50 * 1.5^3 = 50 * 3.375 = 168.75 -> Math.floor = 168
    })
  })

  describe('calculateCPS', () => {
    it('should sum CPS from all upgrades', () => {
      const upgrades = [
        { cps: 5 },
        { cps: 10 },
        { cps: 2 }
      ]
      expect(calculateCPS(upgrades)).toBe(17)
    })

    it('should return 0 for empty upgrades array', () => {
      expect(calculateCPS([])).toBe(0)
    })
  })

  describe('calculateClickValue', () => {
    it('should calculate base click value correctly', () => {
      const upgrades = []
      expect(calculateClickValue(1, upgrades)).toBe(1)
    })

    it('should include upgrade bonuses', () => {
      const upgrades = [
        { clickBonus: 5 },
        { clickBonus: 3 }
      ]
      expect(calculateClickValue(1, upgrades)).toBe(9)
    })

    it('should apply prestige bonus', () => {
      const upgrades = [{ clickBonus: 5 }]
      expect(calculateClickValue(1, upgrades, 2)).toBe(12) // (1 + 5) * 2
    })
  })

  describe('calculateCriticalHit', () => {
    it('should return normal damage when not critical', () => {
      // Mock Math.random to return > critChance
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.2)
      
      const result = calculateCriticalHit(10, 0.1, 2)
      
      expect(result.damage).toBe(10)
      expect(result.isCritical).toBe(false)
      expect(result.baseDamage).toBe(10)
      
      mockRandom.mockRestore()
    })

    it('should return critical damage when critical hit', () => {
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.05)
      
      const result = calculateCriticalHit(10, 0.1, 2)
      
      expect(result.damage).toBe(20)
      expect(result.isCritical).toBe(true)
      expect(result.baseDamage).toBe(10)
      
      mockRandom.mockRestore()
    })
  })

  describe('calculatePrestigeBonus', () => {
    it('should calculate prestige bonus correctly', () => {
      expect(calculatePrestigeBonus(0)).toBe(1)
      expect(calculatePrestigeBonus(1)).toBe(1.1)
      expect(calculatePrestigeBonus(5)).toBe(1.5)
    })
  })

  describe('calculateBossDamage', () => {
    it('should calculate damage with player and weapon bonuses', () => {
      const damage = calculateBossDamage(100, 2, 1)
      // 100 * (1 + 2*0.05) * (1 + 1*0.1) = 100 * 1.1 * 1.1 = 121
      expect(damage).toBe(121)
    })

    it('should handle level 0 correctly', () => {
      expect(calculateBossDamage(100, 0, 0)).toBe(100)
    })
  })

  describe('calculateHeroEffectiveness', () => {
    it('should calculate base effectiveness for guide', () => {
      const effectiveness = calculateHeroEffectiveness(5, 'guide')
      expect(effectiveness).toBe(0.6) // 5 * 0.1 * 1.2
    })

    it('should handle unknown hero types', () => {
      const effectiveness = calculateHeroEffectiveness(5, 'unknown')
      expect(effectiveness).toBe(0.5) // 5 * 0.1 * 1
    })
  })

  describe('calculateLuckProbability', () => {
    it('should return true when luck succeeds', () => {
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.1)
      
      expect(calculateLuckProbability(0.2)).toBe(true)
      
      mockRandom.mockRestore()
    })

    it('should return false when luck fails', () => {
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.8)
      
      expect(calculateLuckProbability(0.2)).toBe(false)
      
      mockRandom.mockRestore()
    })

    it('should cap probability at 100%', () => {
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5)
      
      expect(calculateLuckProbability(0.8, 0.5)).toBe(true) // 0.8 + 0.5 = 1.3 capped at 1
      
      mockRandom.mockRestore()
    })
  })

  describe('calculateSetBonus', () => {
    it('should calculate set bonuses correctly', () => {
      const equippedItems = [
        { set: 'warrior', slot: 'helmet' },
        { set: 'warrior', slot: 'chestplate' },
        { set: 'mage', slot: 'hat' }
      ]
      
      const setData = {
        warrior: {
          bonuses: [
            { required: 2, effect: '+10 strength' },
            { required: 3, effect: '+20 strength' }
          ]
        },
        mage: {
          bonuses: [
            { required: 1, effect: '+5 intellect' },
            { required: 2, effect: '+15 intellect' }
          ]
        }
      }
      
      const bonuses = calculateSetBonus(equippedItems, setData)
      
      expect(bonuses).toHaveLength(2)
      expect(bonuses).toContainEqual({ required: 2, effect: '+10 strength' })
      expect(bonuses).toContainEqual({ required: 1, effect: '+5 intellect' })
    })

    it('should return empty array for no set items', () => {
      const equippedItems = [
        { slot: 'helmet' },
        { slot: 'chestplate' }
      ]
      
      const bonuses = calculateSetBonus(equippedItems, {})
      expect(bonuses).toHaveLength(0)
    })
  })
})
