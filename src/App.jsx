import React, { useState, useRef, useEffect } from 'react';
import ClickerCore from './components/core/ClickerCore';
import Sidebar from './components/navigation/Sidebar';
import UpgradeShop from './components/shop/UpgradeShop';
import SettingsMenu from './components/settings/SettingsMenu';
import AudioController from './components/audio/AudioController';
import LoadingScreen from './components/loadingscreen/LoadingScreen';
import { formatNumber } from './utils/formatNumber';
import defaultSwordImage from './img/sword.png';
import { tierUpgradesArray, swordUpgradesArray, summonUpgradesArray } from './data/upgradeData';
import PrestigeShop from './components/prestige/PrestigeShop';

function App() {
  // Original state management
  const [showWarning, setShowWarning] = useState(false);
  const [clicks, setClicks] = useState(parseInt(localStorage.getItem('clicks')) || 0);
  const [clickValue, setClickValue] = useState(parseInt(localStorage.getItem('clickValue')) || 1);
  const [cps, setCps] = useState(parseInt(localStorage.getItem('cps')) || 0);
  const [prestigeCurrency, setPrestigeCurrency] = useState(parseInt(localStorage.getItem('prestigecurrency')) || 0);
  const [prestigeLevel, setPrestigeLevel] = useState(parseInt(localStorage.getItem('prestigelevel')) || 0);

  // Upgrade states with original localStorage handling
  const [tierUpgrades, setTierUpgrades] = useState(() => {
    const stored = localStorage.getItem('tierUpgrades');
    return stored ? JSON.parse(stored) : tierUpgradesArray;
  });

  const [swordUpgrades, setSwordUpgrades] = useState(() => {
    const stored = localStorage.getItem('swordUpgrades');
    return stored ? JSON.parse(stored) : swordUpgradesArray;
  });

  const [summonUpgrades, setSummonUpgrades] = useState(() => {
    const stored = localStorage.getItem('summonUpgrades');
    return stored ? JSON.parse(stored) : summonUpgradesArray;
  });

  // UI states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [bgVolume, setBgVolume] = useState(0.5);
  const [effectsVolume, setEffectsVolume] = useState(0.8);
  const [isPrestigeOpen, setIsPrestigeOpen] = useState(false);
  const [prestigeRequirement, setPrestigeRequirement] = useState(() => 
    parseInt(localStorage.getItem('prestigeRequirement')) || 1000
  );

  // Refs
  const clickerRef = useRef(null);
  
  // Calculate sword multiplier (preserve original logic)
  const swordMultiplier = swordUpgrades.filter((upgrade) => upgrade.purchased).pop()?.multiplier || 1;

  // Original click handler with spacebar functionality
  let spacebarPressed = false;

  // Audio functions ref
  const audioFunctions = useRef({
    playClickSound: () => {},
    playPurchaseSound: () => {}
  });

  // Handle sound loading
  const handleSoundLoad = (functions) => {
    audioFunctions.current = functions;
  };

  // Update click handler to play sound
  const handleClick = () => {
    setClicks(clicks + clickValue);
    audioFunctions.current.playClickSound();
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 32 && !spacebarPressed) {
      spacebarPressed = true;
      clickerRef.current.disabled = true;
      setTimeout(() => {
        clickerRef.current.disabled = false;
        spacebarPressed = false;
      }, 1000);
      setTimeout(() => {
        clickerRef.current.click();
      }, 1000);
      event.preventDefault();
    }
  };

  // Original upgrade handlers (preserve exact logic)
  const handleTierUpgrade = (index) => {
    const upgrade = { ...tierUpgrades[index] };
    if (clicks >= upgrade.cost) {
      audioFunctions.current.playPurchaseSound();
      setClicks(clicks - upgrade.cost);
      const updatedTierUpgrades = tierUpgrades.map((tierUpgrade, i) => {
        if (i === index) {
          const newLevel = upgrade.level + 1;
          const newTotalClicksProvided = upgrade.baseClicksProvided * newLevel * swordMultiplier;
          return {
            ...tierUpgrade,
            clicksProvided: upgrade.baseClicksProvided * swordMultiplier,
            totalClicksProvided: newTotalClicksProvided,
            cost: upgrade.cost * 2,
            level: upgrade.level + 1,
          };
        }
        return tierUpgrade;
      });
      setTierUpgrades(updatedTierUpgrades);
      const newClickValue = updatedTierUpgrades.reduce(
        (acc, curr) => acc + curr.totalClicksProvided,
        0
      );
      setClickValue(newClickValue);
    } else {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
    }
  };

  const handleSwordUpgrade = (index) => {
    const upgrade = { ...swordUpgrades[index] };
    if (clicks >= upgrade.cost && !upgrade.purchased) {
      audioFunctions.current.playPurchaseSound();
      setClicks(clicks - upgrade.cost);
      upgrade.purchased = true;
      const newSwordMultiplier = upgrade.multiplier;

      // Update the tier upgrade values to match the new multiplier
      const updatedTierUpgrades = tierUpgrades.map((tierUpgrade) => {
        return {
          ...tierUpgrade,
          totalClicksProvided: tierUpgrade.baseClicksProvided * tierUpgrade.level * newSwordMultiplier,
          clicksProvided: tierUpgrade.baseClicksProvided * newSwordMultiplier,
        };
      });

      // Update the summon upgrades values to match the new multiplier
      const updatedSummonUpgrades = summonUpgrades.map((summonUpgrade) => {
        return {
          ...summonUpgrade,
          totalCps: summonUpgrade.baseCps * summonUpgrade.level * newSwordMultiplier,
          cpsProvided: summonUpgrade.baseCps * newSwordMultiplier,
        };
      });

      // Update all states
      const updatedSwordUpgrades = [...swordUpgrades];
      updatedSwordUpgrades[index] = upgrade;
      setSwordUpgrades(updatedSwordUpgrades);
      setTierUpgrades(updatedTierUpgrades);
      setSummonUpgrades(updatedSummonUpgrades);

      // Update click value and CPS
      const newClickValue = updatedTierUpgrades.reduce(
        (acc, curr) => acc + curr.totalClicksProvided,
        0
      );
      const newCpsValue = updatedSummonUpgrades.reduce(
        (acc, curr) => acc + curr.totalCps,
        0
      );
      setCps(newCpsValue);
      setClickValue(newClickValue);
    } else {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
    }
  };

  const handleSummonUpgrade = (index) => {
    const upgrade = { ...summonUpgrades[index] };
    if (clicks >= upgrade.cost) {
      audioFunctions.current.playPurchaseSound();
      setClicks(clicks - upgrade.cost);
      const updatedSummonUpgrades = summonUpgrades.map((summonUpgrade, i) => {
        if (i === index) {
          const newLevel = upgrade.level + 1;
          const newTotalCps = upgrade.baseCps * newLevel * swordMultiplier;
          return {
            ...summonUpgrade,
            cpsProvided: upgrade.baseCps * swordMultiplier,
            totalCps: newTotalCps,
            cost: upgrade.cost * 2,
            level: newLevel,
          };
        }
        return summonUpgrade;
      });
      setSummonUpgrades(updatedSummonUpgrades);
      const newCpsValue = updatedSummonUpgrades.reduce(
        (acc, curr) => acc + curr.totalCps,
        0
      );
      setCps(newCpsValue);
    } else {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
    }
  };

  // Handle prestige reset
  const handlePrestige = (gainedPrestige) => {
    // Add prestige currency
    setPrestigeCurrency(prev => prev + gainedPrestige);
    
    // Increment prestige level
    setPrestigeLevel(prev => prev + 1);
    
    // Reset game state
    setClicks(0);
    setClickValue(1);
    setCps(0);
    
    // Reset upgrades
    setTierUpgrades(tierUpgradesArray);
    setSwordUpgrades(swordUpgradesArray);
    setSummonUpgrades(summonUpgradesArray);
    
    // Increase requirement for next prestige
    setPrestigeRequirement(prev => Math.floor(prev * 1.5));
    
    // Close prestige shop
    setIsPrestigeOpen(false);
    
    // Play purchase sound
    audioFunctions.current.playPurchaseSound();
  };

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('clickValue', clickValue);
    localStorage.setItem('cps', cps);
    localStorage.setItem('prestigecurrency', prestigeCurrency);
    localStorage.setItem('prestigelevel', prestigeLevel);
    localStorage.setItem('tierUpgrades', JSON.stringify(tierUpgrades));
    localStorage.setItem('swordUpgrades', JSON.stringify(swordUpgrades));
    localStorage.setItem('summonUpgrades', JSON.stringify(summonUpgrades));
    localStorage.setItem('prestigeRequirement', prestigeRequirement);
  }, [clicks, clickValue, cps, prestigeCurrency, prestigeLevel, tierUpgrades, swordUpgrades, summonUpgrades, prestigeRequirement]);

  // CPS interval
  useEffect(() => {
    const interval = setInterval(() => {
      setClicks(prev => prev + cps);
    }, 1000);
    return () => clearInterval(interval);
  }, [cps]);

  return (
    <div className="app" onKeyDown={handleKeyDown} tabIndex="0">
      <LoadingScreen />
      
      <Sidebar 
        onOpenShop={() => setIsShopOpen(true)}
        onOpenPrestige={() => setIsPrestigeOpen(true)}
        onOpenAchievements={() => {}} // Placeholder
        onOpenSettings={() => setIsSettingsOpen(true)}
        clicks={formatNumber(clicks)}
        prestigeCurrency={formatNumber(prestigeCurrency)}
      />

      <main className="main-content">
        <ClickerCore 
          handleClick={handleClick}
          swordImage={swordUpgrades.find(u => u.purchased)?.image || defaultSwordImage}
          clickValue={formatNumber(clickValue)}
          cps={formatNumber(cps)}
          clicks={formatNumber(clicks)}
          swordMultiplier={swordMultiplier}
          prestigeLevel={prestigeLevel}
          ref={clickerRef}
        />
      </main>

      {isShopOpen && (
        <UpgradeShop 
          tierUpgrades={tierUpgrades}
          swordUpgrades={swordUpgrades}
          summonUpgrades={summonUpgrades}
          handleTierUpgrade={handleTierUpgrade}
          handleSwordUpgrade={handleSwordUpgrade}
          handleSummonUpgrade={handleSummonUpgrade}
          clicks={clicks}
          onClose={() => setIsShopOpen(false)}
        />
      )}

      <SettingsMenu 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        bgVolume={bgVolume}
        setBgVolume={setBgVolume}
        effectsVolume={effectsVolume}
        setEffectsVolume={setEffectsVolume}
      />

      <AudioController 
        bgVolume={bgVolume}
        effectsVolume={effectsVolume}
        onSoundLoad={handleSoundLoad}
      />

      {isPrestigeOpen && (
        <PrestigeShop 
          isOpen={isPrestigeOpen}
          onClose={() => setIsPrestigeOpen(false)}
          currentClicks={clicks}
          prestigeLevel={prestigeLevel}
          prestigeCurrency={prestigeCurrency}
          onPrestige={handlePrestige}
          prestigeRequirement={prestigeRequirement}
          artifacts={[]} // We'll implement artifacts next
          onPurchaseArtifact={() => {}} // We'll implement this next
        />
      )}

      {showWarning && (
        <div className="warning-popup">
          Not enough coins!
        </div>
      )}
    </div>
  );
}

export default App;
