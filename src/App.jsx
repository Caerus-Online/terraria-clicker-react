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
import { prestigeArtifacts, calculateArtifactCost, calculateTotalBonus, calculatePrestigeMultiplier } from './data/prestigeArtifacts';
import { achievements, checkAchievement } from './data/achievementData';
import AchievementPanel from './components/achievements/AchievementPanel';
import AchievementNotification from './components/achievements/AchievementNotification';
import ProfileStats from './components/profile/ProfileStats';
import { useAuth } from './contexts/AuthContext';
import { databaseService } from './services/databaseService';
import AuthModal from './components/auth/AuthModal';
import { playerService } from './services/playerService';
import LeaderboardPanel from './components/leaderboard/LeaderboardPanel';
import { setupDatabase } from './scripts/setupDatabase';

// Make it available globally
window.setupDatabase = setupDatabase;

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
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [userAchievements, setUserAchievements] = useState(() => {
    const stored = localStorage.getItem('achievements');
    return stored ? JSON.parse(stored) : achievements;
  });
  const [newAchievement, setNewAchievement] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
    setClicks(prev => prev + clickValue);
    setLifetimeStats(prev => ({
      ...prev,
      clicks: prev.clicks + 1,
      coins: prev.coins + clickValue
    }));
    setSessionClicks(prev => prev + clickValue);
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
      setClicks(prev => prev - upgrade.cost);
      
      const prestigeBonus = 1 + (prestigeLevel * 0.05); // 5% per level
      
      const updatedTierUpgrades = tierUpgrades.map((tierUpgrade, i) => {
        if (i === index) {
          const newLevel = tierUpgrade.level + 1;
          const baseClickValue = tierUpgrade.baseClicksProvided * swordMultiplier * prestigeBonus;
          const totalClickValue = baseClickValue * newLevel;
          
          return {
            ...tierUpgrade,
            level: newLevel,
            clicksProvided: baseClickValue,
            totalClicksProvided: totalClickValue,
            cost: tierUpgrade.cost * 2,
          };
        }
        return tierUpgrade;
      });

      setTierUpgrades(updatedTierUpgrades);

      // Calculate new total click value
      const newClickValue = updatedTierUpgrades.reduce(
        (total, upgrade) => total + upgrade.totalClicksProvided,
        1  // Base click value
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
      
      const prestigeBonus = 1 + (prestigeLevel * 0.05); // 5% per level
      
      const updatedSummonUpgrades = summonUpgrades.map((summonUpgrade, i) => {
        if (i === index) {
          const newLevel = upgrade.level + 1;
          const baseCps = upgrade.baseCps * swordMultiplier * prestigeBonus;
          const newTotalCps = baseCps * newLevel;
          return {
            ...summonUpgrade,
            cpsProvided: baseCps,
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
    setLifetimeStats(prev => ({
      ...prev,
      prestigeCount: prev.prestigeCount + 1
    }));
    setSessionClicks(0);
  };

  // Add artifacts state
  const [artifacts, setArtifacts] = useState(() => {
    const stored = localStorage.getItem('artifacts');
    return stored ? JSON.parse(stored) : prestigeArtifacts;
  });

  // Calculate total bonuses including prestige level and artifacts
  const calculateTotalMultiplier = () => {
    const prestigeMultiplier = calculatePrestigeMultiplier(prestigeLevel);
    const artifactBonus = calculateTotalBonus(artifacts, 'CLICK_POWER');
    return prestigeMultiplier * (1 + artifactBonus);
  };

  // Handle artifact purchase/upgrade
  const handleArtifactPurchase = (artifactId) => {
    const artifact = artifacts.find(a => a.id === artifactId);
    if (!artifact || artifact.level >= artifact.maxLevel) return;

    const cost = calculateArtifactCost(artifact);
    if (prestigeCurrency >= cost) {
      setPrestigeCurrency(prev => prev - cost);
      
      setArtifacts(prev => prev.map(a => {
        if (a.id === artifactId) {
          return { ...a, level: a.level + 1 };
        }
        return a;
      }));

      // Play purchase sound
      audioFunctions.current.playPurchaseSound();
    }
  };

  // Achievement stats tracking
  const achievementStats = {
    CLICK_POWER: clickValue,
    TOTAL_COINS: clicks,
    CPS: cps,
    SWORD_COUNT: swordUpgrades.filter(u => u.purchased).length,
    PRESTIGE_COUNT: prestigeLevel,
    PRESTIGE_LEVEL: prestigeLevel
  };

  // Check achievements
  useEffect(() => {
    userAchievements.forEach(achievement => {
      if (!achievement.earned && checkAchievement(achievement, achievementStats[achievement.type])) {
        // Update achievement
        const updatedAchievements = userAchievements.map(a => 
          a.id === achievement.id ? { ...a, earned: true } : a
        );
        setUserAchievements(updatedAchievements);
        
        // Show notification
        setNewAchievement(achievement);
        
        // Play sound
        audioFunctions.current.playPurchaseSound();
      }
    });
  }, [achievementStats]);

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
    localStorage.setItem('artifacts', JSON.stringify(artifacts));
    localStorage.setItem('achievements', JSON.stringify(userAchievements));
  }, [clicks, clickValue, cps, prestigeCurrency, prestigeLevel, tierUpgrades, swordUpgrades, summonUpgrades, prestigeRequirement, artifacts, userAchievements]);

  // CPS interval
  useEffect(() => {
    const interval = setInterval(() => {
      setClicks(prev => prev + cps);
      if (cps > 0) {  // Only update lifetime stats if CPS is greater than 0
        setLifetimeStats(prev => ({
          ...prev,
          coins: prev.coins + cps
        }));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cps]);

  // Clear achievement notification after delay
  useEffect(() => {
    if (newAchievement) {
      const timer = setTimeout(() => {
        setNewAchievement(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [newAchievement]);

  // Add lifetime stats
  const [lifetimeStats, setLifetimeStats] = useState(() => {
    const stored = localStorage.getItem('lifetimeStats');
    return stored ? JSON.parse(stored) : {
      clicks: 0,
      coins: 0,
      prestigeCount: 0
    };
  });

  // Save lifetime stats to localStorage
  useEffect(() => {
    localStorage.setItem('lifetimeStats', JSON.stringify(lifetimeStats));
  }, [lifetimeStats]);

  // Calculate stats for profile panel
  const profileStats = {
    lifetimeClicks: lifetimeStats.clicks,
    lifetimeCoins: lifetimeStats.coins,
    prestigeLevel: prestigeLevel,
    achievementsEarned: userAchievements.filter(a => a.earned).length,
    totalAchievements: userAchievements.length,
    clickPower: clickValue,
    cps: cps,
    swordMultiplier: swordMultiplier
  };

  // Add auth state
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const playerId = playerService.getPlayerId();

  // Change loading state to only show on initial load
  const [initialLoading, setInitialLoading] = useState(true);

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
          const { data } = await databaseService.loadUserData(user.id);
          
          if (data) {
            // Set game progress
            setClicks(data.progress.clicks || 0);
            setClickValue(data.progress.click_value || 1);
            setCps(data.progress.cps || 0);
            setPrestigeCurrency(data.progress.prestige_currency || 0);
            setPrestigeLevel(data.progress.prestige_level || 0);
            setPrestigeRequirement(data.progress.prestige_requirement || 1000);

            // Set upgrades - Preserve the original image paths
            if (data.upgrades.tier_upgrades) {
              const loadedTierUpgrades = data.upgrades.tier_upgrades.map((upgrade, index) => ({
                ...tierUpgradesArray[index],  // Get base upgrade with correct image path
                ...upgrade,  // Spread loaded data
                image: tierUpgradesArray[index].image  // Ensure correct image path
              }));
              setTierUpgrades(loadedTierUpgrades);
            }

            if (data.upgrades.sword_upgrades) {
              const loadedSwordUpgrades = data.upgrades.sword_upgrades.map((upgrade, index) => ({
                ...swordUpgradesArray[index],
                ...upgrade,
                image: swordUpgradesArray[index].image
              }));
              setSwordUpgrades(loadedSwordUpgrades);
            }

            if (data.upgrades.summon_upgrades) {
              const loadedSummonUpgrades = data.upgrades.summon_upgrades.map((upgrade, index) => ({
                ...summonUpgradesArray[index],
                ...upgrade,
                image: summonUpgradesArray[index].image
              }));
              setSummonUpgrades(loadedSummonUpgrades);
            }

            if (data.upgrades.artifacts) {
              const loadedArtifacts = data.upgrades.artifacts.map((artifact, index) => ({
                ...prestigeArtifacts[index],
                ...artifact,
                image: prestigeArtifacts[index].image
              }));
              setArtifacts(loadedArtifacts);
            }

            // Set achievements with correct icons
            if (data.achievements.achievements) {
              const loadedAchievements = data.achievements.achievements.map((achievement, index) => ({
                ...achievements[index],
                ...achievement,
                icon: achievements[index].icon
              }));
              setUserAchievements(loadedAchievements);
            }

            // Set lifetime stats
            setLifetimeStats({
              clicks: data.stats.total_clicks || 0,
              coins: data.stats.total_coins || 0,
              prestigeCount: data.stats.total_prestiges || 0
            });
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        } finally {
          setInitialLoading(false);  // Only set false after initial load
        }
      } else {
        // Load from localStorage for anonymous users
        // ... existing localStorage loading logic ...
        setInitialLoading(false);  // Set false for anonymous users too
      }
    };

    loadUserData();
  }, [user]);  // Only run on user change

  // Save game state
  useEffect(() => {
    const saveGameState = async () => {
      if (user) {
        try {
          await databaseService.saveGameProgress(user.id, {
            clicks,
            clickValue,
            cps,
            prestigeCurrency,
            prestigeLevel,
            prestigeRequirement
          });

          await databaseService.saveUpgrades(user.id, {
            tierUpgrades,
            swordUpgrades,
            summonUpgrades,
            artifacts
          });

          await databaseService.saveAchievements(user.id, userAchievements);

          await databaseService.saveLifetimeStats(user.id, lifetimeStats);

          await databaseService.updateLeaderboard(user.id, user.user_metadata?.username || 'Anonymous', {
            totalCoins: lifetimeStats.coins,
            prestigeLevel,
            achievementsEarned: userAchievements.filter(a => a.earned).length
          });
        } catch (error) {
          console.error('Error saving game state:', error);
        }
      } else {
        // Save to localStorage for anonymous users
        localStorage.setItem('clicks', clicks);
        localStorage.setItem('clickValue', clickValue);
        localStorage.setItem('cps', cps);
        localStorage.setItem('prestigeCurrency', prestigeCurrency);
        localStorage.setItem('prestigeLevel', prestigeLevel);
        localStorage.setItem('prestigeRequirement', prestigeRequirement);
        localStorage.setItem('tierUpgrades', JSON.stringify(tierUpgrades));
        localStorage.setItem('swordUpgrades', JSON.stringify(swordUpgrades));
        localStorage.setItem('summonUpgrades', JSON.stringify(summonUpgrades));
        localStorage.setItem('artifacts', JSON.stringify(artifacts));
        localStorage.setItem('achievements', JSON.stringify(userAchievements));
        localStorage.setItem('lifetimeStats', JSON.stringify(lifetimeStats));
      }
    };

    // Save every 30 seconds
    const saveInterval = setInterval(saveGameState, 30000);
    
    // Save when component unmounts
    return () => {
      clearInterval(saveInterval);
      saveGameState();
    };
  }, [user, clicks, clickValue, cps, prestigeCurrency, prestigeLevel, prestigeRequirement,
      tierUpgrades, swordUpgrades, summonUpgrades, artifacts, userAchievements, lifetimeStats]);

  // Don't force auth modal on anonymous players
  useEffect(() => {
    if (!user && !isAuthModalOpen && !playerService.getPlayerId()) {
      setIsAuthModalOpen(true);
    }
  }, [user]);

  // Add leaderboard state
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  // Add state for prestige notification
  const [showPrestigeNotification, setShowPrestigeNotification] = useState(false);

  // Check for prestige availability in useEffect
  useEffect(() => {
    if (clicks >= prestigeRequirement && !showPrestigeNotification) {
      setShowPrestigeNotification(true);
      setTimeout(() => setShowPrestigeNotification(false), 5000);
    }
  }, [clicks, prestigeRequirement]);

  // Add new state for session clicks
  const [sessionClicks, setSessionClicks] = useState(0);

  // Only show loading screen on initial load
  if (initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app" onKeyDown={handleKeyDown} tabIndex="0">
      <Sidebar 
        onOpenShop={() => setIsShopOpen(true)}
        onOpenPrestige={() => setIsPrestigeOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <main className="main-content">
        <ClickerCore 
          handleClick={handleClick}
          swordImage={swordUpgrades.find(u => u.purchased)?.image || defaultSwordImage}
          clickValue={formatNumber(clickValue)}
          cps={formatNumber(cps)}
          clicks={formatNumber(clicks)}
          lifetimeClicks={sessionClicks}
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
        onOpenAuth={() => setIsAuthModalOpen(true)}
        setClicks={setClicks}
        setClickValue={setClickValue}
        setCps={setCps}
        setPrestigeCurrency={setPrestigeCurrency}
        setPrestigeLevel={setPrestigeLevel}
        setPrestigeRequirement={setPrestigeRequirement}
        setTierUpgrades={setTierUpgrades}
        setSwordUpgrades={setSwordUpgrades}
        setSummonUpgrades={setSummonUpgrades}
        setArtifacts={setArtifacts}
        setUserAchievements={setUserAchievements}
        setLifetimeStats={setLifetimeStats}
        setSessionClicks={setSessionClicks}
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
          artifacts={artifacts}
          onPurchaseArtifact={handleArtifactPurchase}
        />
      )}

      {isAchievementsOpen && (
        <AchievementPanel 
          isOpen={isAchievementsOpen}
          onClose={() => setIsAchievementsOpen(false)}
          achievements={userAchievements}
          currentStats={achievementStats}
        />
      )}

      {newAchievement && (
        <AchievementNotification 
          achievement={newAchievement}
          onClose={() => setNewAchievement(null)}
        />
      )}

      {showWarning && (
        <div className="warning-popup">
          Not enough coins!
        </div>
      )}

      {isProfileOpen && (
        <ProfileStats 
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          stats={profileStats}
        />
      )}

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {isLeaderboardOpen && (
        <LeaderboardPanel 
          isOpen={isLeaderboardOpen}
          onClose={() => setIsLeaderboardOpen(false)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          lifetimeStats={lifetimeStats}
          prestigeLevel={prestigeLevel}
          userAchievements={userAchievements}
        />
      )}

      {showPrestigeNotification && (
        <div className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-lg shadow-lg animate-bounce z-50">
          <div className="flex items-center space-x-2">
            <span className="material-icons">stars</span>
            <span>Prestige Available!</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
