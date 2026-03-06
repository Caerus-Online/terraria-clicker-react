import { useState, useCallback, useMemo } from 'react'

const useGameState = (initialState = {}) => {
  const [state, setState] = useState({
    coins: 0,
    clickValue: 1,
    cps: 0,
    prestigeLevel: 0,
    clicks: 0,
    totalCoins: 0,
    ...initialState
  })

  const incrementCoins = useCallback((amount) => {
    setState(prev => ({
      ...prev,
      coins: prev.coins + amount,
      totalCoins: prev.totalCoins + amount
    }))
  }, [])

  const incrementClicks = useCallback(() => {
    setState(prev => ({
      ...prev,
      clicks: prev.clicks + 1
    }))
  }, [])

  const setClickValue = useCallback((value) => {
    setState(prev => ({
      ...prev,
      clickValue: value
    }))
  }, [])

  const setCPS = useCallback((cps) => {
    setState(prev => ({
      ...prev,
      cps
    }))
  }, [])

  const incrementPrestigeLevel = useCallback(() => {
    setState(prev => ({
      ...prev,
      prestigeLevel: prev.prestigeLevel + 1
    }))
  }, [])

  const resetForPrestige = useCallback(() => {
    setState(prev => ({
      ...prev,
      coins: 0,
      clickValue: 1,
      cps: 0,
      clicks: 0
      // totalCoins and prestigeLevel are preserved via spread operator
    }))
  }, [])

  const actions = useMemo(() => ({
    incrementCoins,
    incrementClicks,
    setClickValue,
    setCPS,
    incrementPrestigeLevel,
    resetForPrestige
  }), [incrementCoins, incrementClicks, setClickValue, setCPS, incrementPrestigeLevel, resetForPrestige])

  const derived = useMemo(() => ({
    coinsPerClick: state.clickValue,
    coinsPerSecond: state.cps,
    totalEarned: state.totalCoins,
    isPrestigeAvailable: state.clicks >= 1000,
    prestigeProgress: (state.clicks % 1000) / 1000
  }), [state.clickValue, state.cps, state.totalCoins, state.clicks])

  return [state, actions, derived]
}

export default useGameState
