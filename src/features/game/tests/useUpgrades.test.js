import { renderHook, act } from '@testing-library/react'
import useUpgrades from '../hooks/useUpgrades'

describe('useUpgrades', () => {
  beforeEach(() => {
    // Reset the module state before each test
    jest.resetModules()
  })

  describe('initial state', () => {
    it('should initialize with default upgrades', () => {
      const { result } = renderHook(() => useUpgrades())
      
      expect(result.current.upgrades.swords).toHaveLength(3)
      expect(result.current.upgrades.minions).toHaveLength(3)
      
      // Check first sword
      const firstSword = result.current.upgrades.swords[0]
      expect(firstSword.name).toBe('Wooden Sword')
      expect(firstSword.level).toBe(0)
      expect(firstSword.cost).toBe(10)
      expect(firstSword.clickBonus).toBe(1)
      
      // Check first minion
      const firstMinion = result.current.upgrades.minions[0]
      expect(firstMinion.name).toBe('Zombie Minion')
      expect(firstMinion.level).toBe(0)
      expect(firstMinion.cost).toBe(50)
      expect(firstMinion.cps).toBe(1)
    })

    it('should calculate correct initial bonuses', () => {
      const { result } = renderHook(() => useUpgrades())
      
      expect(result.current.getTotalClickBonus()).toBe(0)
      expect(result.current.getTotalCPS()).toBe(0)
    })
  })

  describe('purchasing upgrades', () => {
    it('should increase sword level and cost when purchased', () => {
      const { result } = renderHook(() => useUpgrades())
      
      act(() => {
        result.current.purchaseUpgrade('swords', 0)
      })
      
      const sword = result.current.upgrades.swords[0]
      expect(sword.level).toBe(1)
      expect(sword.cost).toBe(15) // 10 * 1.5^1
      expect(result.current.getTotalClickBonus()).toBe(1)
    })

    it('should increase minion level and cost when purchased', () => {
      const { result } = renderHook(() => useUpgrades())
      
      act(() => {
        result.current.purchaseUpgrade('minions', 0)
      })
      
      const minion = result.current.upgrades.minions[0]
      expect(minion.level).toBe(1)
      expect(minion.cost).toBe(75) // 50 * 1.5^1
      expect(result.current.getTotalCPS()).toBe(1)
    })

    it('should accumulate bonuses from multiple upgrades', () => {
      const { result } = renderHook(() => useUpgrades())
      
      act(() => {
        result.current.purchaseUpgrade('swords', 0) // +1 click
        result.current.purchaseUpgrade('swords', 1) // +5 click
        result.current.purchaseUpgrade('minions', 0) // +1 cps
        result.current.purchaseUpgrade('minions', 1) // +5 cps
      })
      
      expect(result.current.getTotalClickBonus()).toBe(6) // 1 + 5
      expect(result.current.getTotalCPS()).toBe(6) // 1 + 5
    })

    it('should calculate correct upgrade costs with multiple levels', () => {
      const { result } = renderHook(() => useUpgrades())
      
      act(() => {
        // Purchase same sword multiple times
        result.current.purchaseUpgrade('swords', 0) // Level 1: cost 15
        result.current.purchaseUpgrade('swords', 0) // Level 2: cost 23
        result.current.purchaseUpgrade('swords', 0) // Level 3: cost 34
      })
      
      const sword = result.current.upgrades.swords[0]
      expect(sword.level).toBe(3)
      expect(sword.cost).toBe(33) // 10 * 1.5^3 = 33.75 -> Math.floor = 33
      expect(result.current.getTotalClickBonus()).toBe(3) // 3 levels * 1 bonus each
    })
  })

  describe('helper functions', () => {
    it('should get correct upgrade cost', () => {
      const { result } = renderHook(() => useUpgrades())
      
      expect(result.current.getUpgradeCost('swords', 0)).toBe(10)
      expect(result.current.getUpgradeCost('minions', 0)).toBe(50)
      
      act(() => {
        result.current.purchaseUpgrade('swords', 0)
      })
      
      expect(result.current.getUpgradeCost('swords', 0)).toBe(15)
    })

    it('should get correct upgrade level', () => {
      const { result } = renderHook(() => useUpgrades())
      
      expect(result.current.getUpgradeLevel('swords', 0)).toBe(0)
      
      act(() => {
        result.current.purchaseUpgrade('swords', 0)
      })
      
      expect(result.current.getUpgradeLevel('swords', 0)).toBe(1)
    })
  })

  describe('upgrade data structure', () => {
    it('should have correct sword upgrade progression', () => {
      const { result } = renderHook(() => useUpgrades())
      
      const swords = result.current.upgrades.swords
      expect(swords[0].name).toBe('Wooden Sword')
      expect(swords[1].name).toBe('Iron Sword')
      expect(swords[2].name).toBe('Gold Sword')
      
      expect(swords[0].clickBonus).toBe(1)
      expect(swords[1].clickBonus).toBe(5)
      expect(swords[2].clickBonus).toBe(20)
    })

    it('should have correct minion upgrade progression', () => {
      const { result } = renderHook(() => useUpgrades())
      
      const minions = result.current.upgrades.minions
      expect(minions[0].name).toBe('Zombie Minion')
      expect(minions[1].name).toBe('Skeleton Minion')
      expect(minions[2].name).toBe('Demon Eye')
      
      expect(minions[0].cps).toBe(1)
      expect(minions[1].cps).toBe(5)
      expect(minions[2].cps).toBe(25)
    })
  })
})
