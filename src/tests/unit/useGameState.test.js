import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from '@jest/globals'
import useGameState from '../../features/game/hooks/useGameState.js'

describe('useGameState', () => {
  beforeEach(() => {
    // Reset any global state if needed
  })

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useGameState())
    
    const [state] = result.current
    
    expect(state.coins).toBe(0)
    expect(state.clickValue).toBe(1)
    expect(state.cps).toBe(0)
    expect(state.prestigeLevel).toBe(0)
    expect(state.clicks).toBe(0)
    expect(state.totalCoins).toBe(0)
  })

  it('should initialize with custom state', () => {
    const initialState = {
      coins: 1000,
      clickValue: 5,
      prestigeLevel: 2
    }
    
    const { result } = renderHook(() => useGameState(initialState))
    const [state] = result.current
    
    expect(state.coins).toBe(1000)
    expect(state.clickValue).toBe(5)
    expect(state.prestigeLevel).toBe(2)
    expect(state.cps).toBe(0) // Should keep default for unspecified
  })

  it('should increment coins correctly', () => {
    const { result } = renderHook(() => useGameState())
    const [, actions] = result.current
    
    act(() => {
      actions.incrementCoins(100)
    })
    
    const [state] = result.current
    expect(state.coins).toBe(100)
    expect(state.totalCoins).toBe(100)
  })

  it('should increment clicks correctly', () => {
    const { result } = renderHook(() => useGameState())
    const [, actions] = result.current
    
    act(() => {
      actions.incrementClicks()
    })
    
    const [state] = result.current
    expect(state.clicks).toBe(1)
  })

  it('should calculate derived values correctly', () => {
    const { result } = renderHook(() => useGameState({
      clicks: 500,
      clickValue: 10,
      cps: 5
    }))
    
    const [, , derived] = result.current
    
    expect(derived.coinsPerClick).toBe(10)
    expect(derived.coinsPerSecond).toBe(5)
    expect(derived.isPrestigeAvailable).toBe(false)
    expect(derived.prestigeProgress).toBe(0.5)
  })

  it('should handle prestige correctly', () => {
    const { result } = renderHook(() => useGameState({
      clicks: 1500,
      coins: 5000
    }))
    
    const [, actions] = result.current
    
    // Should be available for prestige
    let [, , derived] = result.current
    expect(derived.isPrestigeAvailable).toBe(true)
    
    // Reset for prestige
    act(() => {
      actions.resetForPrestige()
    })
    
    let [state] = result.current
    expect(state.coins).toBe(0)
    expect(state.clickValue).toBe(1)
    expect(state.cps).toBe(0)
    expect(state.clicks).toBe(0)
    expect(state.prestigeLevel).toBe(0) // This would be incremented separately
  })

  it('should maintain totalCoins through prestige reset', () => {
    const { result } = renderHook(() => useGameState({
      totalCoins: 10000
    }))
    
    const [, actions] = result.current
    
    act(() => {
      actions.resetForPrestige()
    })
    
    const [state] = result.current
    expect(state.totalCoins).toBe(10000) // Should be preserved
  })
})
