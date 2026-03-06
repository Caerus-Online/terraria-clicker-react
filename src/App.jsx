import React from 'react'
import GameLayout from './components/layout/GameLayout'
import GameStats from './components/features/GameStats'
import ClickArea from './components/features/ClickArea'
import UpgradeShop from './components/features/UpgradeShop'
import useGameState from './features/game/hooks/useGameState'
import useUpgrades from './features/game/hooks/useUpgrades'

function App() {
  const [gameState, gameActions] = useGameState()
  const { upgrades, purchaseUpgrade, getTotalClickBonus, getTotalCPS } = useUpgrades()

  // Calculate derived values
  const totalClickBonus = getTotalClickBonus()
  const totalCPS = getTotalCPS()
  const currentClickValue = gameState.clickValue + totalClickBonus
  const currentCPS = gameState.cps + totalCPS

  const handleSwordClick = () => {
    gameActions.incrementCoins(currentClickValue)
    gameActions.incrementClicks()
  }

  const handleUpgradePurchase = (type, index) => {
    const cost = upgrades[type][index].cost
    if (gameState.coins >= cost) {
      gameActions.incrementCoins(-cost)
      purchaseUpgrade(type, index)
      
      // Update game stats based on upgrade type
      if (type === 'swords') {
        gameActions.setClickValue(currentClickValue)
      } else if (type === 'minions') {
        gameActions.setCPS(currentCPS)
      }
    }
  }

  const handlePrestige = () => {
    if (gameState.clicks >= 1000) {
      gameActions.incrementPrestigeLevel()
      gameActions.resetForPrestige()
    }
  }

  return (
    <GameLayout>
      <GameStats
        coins={gameState.coins}
        clickValue={currentClickValue}
        cps={currentCPS}
        clicks={gameState.clicks}
        prestigeLevel={gameState.prestigeLevel}
      />
      
      <ClickArea
        onClick={handleSwordClick}
        coins={gameState.coins}
        clickValue={currentClickValue}
        isAnimating={false}
      />
      
      <UpgradeShop
        upgrades={upgrades}
        onPurchase={handleUpgradePurchase}
        coins={gameState.coins}
      />
    </GameLayout>
  )
}

export default App
