import { renderHook, act } from '@testing-library/react'
import useGameState from '../hooks/useGameState'

describe('useGameState', () => {
  describe('when initialized with default state', () => {
    it('should return initial state with zero values', () => {
      const { result } = renderHook(() => useGameState())
      const [state, actions, derived] = result.current

      expect(state.coins).toBe(0)
      expect(state.clickValue).toBe(1)
      expect(state.cps).toBe(0)
      expect(state.prestigeLevel).toBe(0)
      expect(state.clicks).toBe(0)
      expect(state.totalCoins).toBe(0)
      expect(derived.coinsPerClick).toBe(1)
      expect(derived.coinsPerSecond).toBe(0)
      expect(derived.totalEarned).toBe(0)
      expect(derived.isPrestigeAvailable).toBe(false)
      expect(derived.prestigeProgress).toBe(0)
    })
  })

  describe('when clicking the sword', () => {
    it('should increase coin count by click value', () => {
      const { result } = renderHook(() => useGameState())
      
      act(() => {
        result.current[1].incrementCoins(result.current[0].clickValue)
        result.current[1].incrementClicks()
      })

      expect(result.current[0].coins).toBe(1)
      expect(result.current[0].clicks).toBe(1)
      expect(result.current[0].totalCoins).toBe(1)
    })

    it('should update statistics correctly', () => {
      const { result } = renderHook(() => useGameState({ clickValue: 5 }))
      
      act(() => {
        result.current[1].incrementCoins(5)
        result.current[1].incrementClicks()
      })

      expect(result.current[0].coins).toBe(5)
      expect(result.current[0].clicks).toBe(1)
      expect(result.current[0].totalCoins).toBe(5)
    })
  })

  describe('when reaching prestige threshold', () => {
    it('should make prestige available at 1000 clicks', () => {
      const { result } = renderHook(() => useGameState())

      act(() => {
        for (let i = 0; i < 1000; i++) {
          result.current[1].incrementClicks()
        }
      })

      expect(result.current[2].isPrestigeAvailable).toBe(true)
      expect(result.current[2].prestigeProgress).toBe(0)
    })

    it('should calculate prestige progress correctly', () => {
      const { result } = renderHook(() => useGameState({ clicks: 500 }))
      
      expect(result.current[2].prestigeProgress).toBe(0.5)
      expect(result.current[2].isPrestigeAvailable).toBe(false)
    })
  })

  describe('when performing prestige', () => {
    it('should reset game state but keep prestige level', () => {
      const { result } = renderHook(() => useGameState({
        coins: 1000,
        clickValue: 10,
        cps: 5,
        clicks: 1500,
        prestigeLevel: 2,
        totalCoins: 1500
      }))

      act(() => {
        result.current[1].incrementPrestigeLevel()
        result.current[1].resetForPrestige()
      })

      const newState = result.current[0]
      expect(newState.coins).toBe(0)
      expect(newState.clickValue).toBe(1)
      expect(newState.cps).toBe(0)
      expect(newState.clicks).toBe(0)
      expect(newState.prestigeLevel).toBe(3)
      expect(newState.totalCoins).toBe(1500) // Should preserve total from initial state
    })
  })

  describe('when updating click value and CPS', () => {
    it('should update click value correctly', () => {
      const { result } = renderHook(() => useGameState())

      act(() => {
        result.current[1].setClickValue(10)
      })

      expect(result.current[0].clickValue).toBe(10)
      expect(result.current[2].coinsPerClick).toBe(10)
    })

    it('should update CPS correctly', () => {
      const { result } = renderHook(() => useGameState())

      act(() => {
        result.current[1].setCPS(15)
      })

      expect(result.current[0].cps).toBe(15)
      expect(result.current[2].coinsPerSecond).toBe(15)
    })
  })
})
