import React, { useState, useRef, useEffect, useCallback } from 'react';
import ClickerCore from './components/core/ClickerCore';
import Sidebar from './components/navigation/Sidebar';
import UpgradeShop from './components/shop/UpgradeShop';
import SettingsMenu from './components/settings/SettingsMenu';
import AudioController from './components/audio/AudioController';
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
import { reattachImagesToUpgrades } from './data/imageData';
import { supabase } from './lib/supabase';

// Make it available globally
window.setupDatabase = setupDatabase;

function App() {
  const { user, username } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [clickValue, setClickValue] = useState(1);
  const [cps, setCps] = useState(0);
  const [prestigeCurrency, setPrestigeCurrency] = useState(0);
  const [prestigeLevel, setPrestigeLevel] = useState(0);
  const [prestigeRequirement, setPrestigeRequirement] = useState(1000);

  const [tierUpgrades, setTierUpgrades] = useState(tierUpgradesArray);
  const [swordUpgrades, setSwordUpgrades] = useState(swordUpgradesArray);
  const [summonUpgrades, setSummonUpgrades] = useState(summonUpgradesArray);
  const [artifacts, setArtifacts] = useState(prestigeArtifacts);
  const [userAchievements, setUserAchievements] = useState(achievements);
  const [lifetimeStats, setLifetimeStats] = useState({
    clicks: 0,
    coins: 0,
    prestigeCount: 0
  });
  const [currentCoins, setCurrentCoins] = useState(0);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [bgVolume, setBgVolume] = useState(0.5);
  const [effectsVolume, setEffectsVolume] = useState(0.8);
  const [isPrestigeOpen, setIsPrestigeOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const clickerRef = useRef(null);
  
  const swordMultiplier = swordUpgrades.filter((upgrade) => upgrade.purchased).pop()?.multiplier || 1;

  let spacebarPressed = false;

  const audioFunctions = useRef({
    playClickSound: () => {},
    playPurchaseSound: () => {}
  });

  const handleSoundLoad = (functions) => {
    audioFunctions.current = functions;
  };

  const [lastClickTime, setLastClickTime] = useState(Date.now());
  const [clickCount, setClickCount] = useState(0);
  const clickCooldown = 50; // Minimum 50ms between clicks
  const maxClicksPerSecond = 20; // Maximum 20 clicks per second

  const handleClick = () => {
    const totalValue = Math.floor(clickValue);
    
    setLifetimeStats(prev => ({
      ...prev,
      clicks: Math.floor(prev.clicks + totalValue),
      coins: Math.floor(prev.coins + totalValue)
    }));
    setCurrentCoins(prev => prev + totalValue);
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

  const handleTierUpgrade = (index) => {
    const upgrade = { ...tierUpgrades[index] };
    if (currentCoins >= upgrade.cost) {  // Check current coins
      audioFunctions.current.playPurchaseSound();
      setCurrentCoins(prev => prev - upgrade.cost);  // Spend from current coins
      
      const prestigeBonus = 1 + (prestigeLevel * 0.05); // 5% per level
      
      const updatedTierUpgrades = tierUpgrades.map((tierUpgrade, i) => {
        if (i === index) {
          const newLevel = tierUpgrade.level + 1;
          const baseClickValue = Number((tierUpgrade.baseClicksProvided * swordMultiplier * prestigeBonus).toFixed(2));
          const totalClickValue = Number((baseClickValue * newLevel).toFixed(2));
          
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

      const newClickValue = updatedTierUpgrades.reduce(
        (total, upgrade) => total + upgrade.totalClicksProvided,
        1  // Base click value
      );

      setClickValue(Number(newClickValue.toFixed(2)));
    } else {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
    }
  };

  const handleSwordUpgrade = (index) => {
    const upgrade = { ...swordUpgrades[index] };
    if (currentCoins >= upgrade.cost && !upgrade.purchased) {  // Check current coins
      audioFunctions.current.playPurchaseSound();
      setCurrentCoins(prev => prev - upgrade.cost);  // Spend from current coins
      upgrade.purchased = true;
      const newSwordMultiplier = upgrade.multiplier;

      const updatedTierUpgrades = tierUpgrades.map((tierUpgrade) => {
        const baseClickValue = tierUpgrade.baseClicksProvided * newSwordMultiplier;
        const totalClickValue = baseClickValue * tierUpgrade.level;
        return {
          ...tierUpgrade,
          clicksProvided: baseClickValue,
          totalClicksProvided: totalClickValue
        };
      });

      const updatedSummonUpgrades = summonUpgrades.map((summonUpgrade) => {
        const baseCps = summonUpgrade.baseCps * newSwordMultiplier;
        const totalCps = baseCps * summonUpgrade.level;
        return {
          ...summonUpgrade,
          cpsProvided: baseCps,
          totalCps: totalCps
        };
      });

      const updatedSwordUpgrades = [...swordUpgrades];
      updatedSwordUpgrades[index] = upgrade;
      setSwordUpgrades(updatedSwordUpgrades);
      setTierUpgrades(updatedTierUpgrades);
      setSummonUpgrades(updatedSummonUpgrades);

      const newClickValue = updatedTierUpgrades.reduce(
        (acc, curr) => acc + curr.totalClicksProvided,
        1  // Base click value of 1
      );
      const newCpsValue = updatedSummonUpgrades.reduce(
        (acc, curr) => acc + curr.totalCps,
        0
      );
      setCps(newCpsValue);
      setClickValue(newClickValue);
    }
  };

  const handleSummonUpgrade = (index) => {
    const upgrade = { ...summonUpgrades[index] };
    if (currentCoins >= upgrade.cost) {  // Check current coins
      audioFunctions.current.playPurchaseSound();
      setCurrentCoins(prev => prev - upgrade.cost);  // Spend from current coins
      
      const prestigeBonus = 1 + (prestigeLevel * 0.05); // 5% per level
      
      const updatedSummonUpgrades = summonUpgrades.map((summonUpgrade, i) => {
        if (i === index) {
          const newLevel = upgrade.level + 1;
          const baseCps = Number((upgrade.baseCps * swordMultiplier * prestigeBonus).toFixed(2));
          const newTotalCps = Number((baseCps * newLevel).toFixed(2));
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
      setCps(Number(newCpsValue.toFixed(2)));
    } else {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
    }
  };

  const handlePrestige = (gainedPrestige) => {
    setPrestigeCurrency(prev => prev + gainedPrestige);
    setPrestigeLevel(prev => prev + 1);
    
    // Reset game state
    setCurrentCoins(0);  // Reset current coins
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
    
    // Update lifetime stats
    setLifetimeStats(prev => ({
      ...prev,
      prestigeCount: prev.prestigeCount + 1
    }));
    
    // Play sound
    audioFunctions.current.playPurchaseSound();
  };

  const calculateTotalMultiplier = () => {
    const prestigeMultiplier = calculatePrestigeMultiplier(prestigeLevel);
    const artifactBonus = calculateTotalBonus(artifacts, 'CLICK_POWER');
    return prestigeMultiplier * (1 + artifactBonus);
  };

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

      audioFunctions.current.playPurchaseSound();
    }
  };

  // CPS interval effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (cps > 0) {
        const cpsValue = Math.floor(cps);  // Ensure integer value
        setLifetimeStats(prev => ({
          ...prev,
          clicks: Math.floor(prev.clicks + cpsValue),
          coins: Math.floor(prev.coins + cpsValue)
        }));
        setCurrentCoins(prev => prev + cpsValue);  // Update spendable coins
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cps]);

  // Achievement notification effect
  useEffect(() => {
    if (newAchievement) {
      const timer = setTimeout(() => {
        setNewAchievement(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [newAchievement]);

  // Profile stats
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

  // Achievement stats for checking
  const achievementStats = {
    CLICK_POWER: clickValue,
    TOTAL_COINS: lifetimeStats.coins,
    CPS: cps,
    SWORD_COUNT: swordUpgrades.filter(u => u.purchased).length,
    PRESTIGE_COUNT: lifetimeStats.prestigeCount,
    PRESTIGE_LEVEL: prestigeLevel
  };

  // Achievement checking effect
  useEffect(() => {
    userAchievements.forEach(achievement => {
      if (!achievement.earned && checkAchievement(achievement, achievementStats[achievement.type])) {
        const updatedAchievements = userAchievements.map(a => 
          a.id === achievement.id ? { ...a, earned: true } : a
        );
        setUserAchievements(updatedAchievements);
        setNewAchievement(achievement);
        audioFunctions.current.playPurchaseSound();
      }
    });
  }, [clickValue, lifetimeStats.coins, cps, swordUpgrades, prestigeLevel, lifetimeStats.prestigeCount, lifetimeStats]);

  // Add these helper functions at the top level of the App component
  const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const loadFromLocalStorage = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return defaultValue;
    }
  };

  // Add this effect to handle saving game state
  useEffect(() => {
    const saveGameState = async () => {
      const gameState = {
        currentCoins,
        clickValue,
        cps,
        prestigeCurrency,
        prestigeLevel,
        prestigeRequirement,
        tierUpgrades,
        swordUpgrades,
        summonUpgrades,
        artifacts,
        lifetimeStats,
        userAchievements
      };

      if (user?.id) {
        // Save to database if logged in
        try {
          await Promise.all([
            databaseService.saveGameProgress(user.id, {
              clicks: currentCoins,
              click_value: clickValue,
              cps: cps,
              prestige_currency: prestigeCurrency,
              prestige_level: prestigeLevel,
              prestige_requirement: prestigeRequirement
            }),
            databaseService.saveUpgrades(user.id, {
              tierUpgrades,
              swordUpgrades,
              summonUpgrades,
              artifacts
            }),
            databaseService.saveLifetimeStats(user.id, {
              clicks: lifetimeStats.clicks,
              coins: lifetimeStats.coins,
              prestigeCount: lifetimeStats.prestigeCount
            }),
            databaseService.saveAchievements(user.id, userAchievements),
            // Update leaderboard with context username
            databaseService.updateLeaderboard(user.id, username || 'Anonymous', {
              totalCoins: Math.floor(Number(lifetimeStats.coins) || 0),
              prestigeLevel: Math.floor(Number(prestigeLevel) || 0),
              achievementsEarned: Math.floor(Number(userAchievements?.filter(a => a.earned).length) || 0)
            })
          ]);
        } catch (error) {
          console.error('Error saving to database:', error);
        }
      } else {
        // Save to localStorage if not logged in
        Object.entries(gameState).forEach(([key, value]) => {
          saveToLocalStorage(key, value);
        });
      }
    };

    // Debounce save to prevent too frequent saves
    const timeoutId = setTimeout(saveGameState, 1000);
    return () => clearTimeout(timeoutId);
  }, [currentCoins, clickValue, cps, prestigeCurrency, prestigeLevel, prestigeRequirement, 
      tierUpgrades, swordUpgrades, summonUpgrades, artifacts, lifetimeStats, userAchievements, user]);

  // Replace the existing initialization effect with this one
  useEffect(() => {
    const initializeGameState = async () => {
      setInitialLoading(true);
      try {
        if (user?.id) {
          // Load from database if logged in
          const { data } = await databaseService.loadUserData(user.id);
          if (data) {
            const { progress, upgrades, stats, achievements: loadedAchievements } = data;
            
            // Set game progress
            setCurrentCoins(progress.clicks || 0);
            setClickValue(progress.click_value || 1);
            setCps(progress.cps || 0);
            setPrestigeCurrency(progress.prestige_currency || 0);
            setPrestigeLevel(progress.prestige_level || 0);
            setPrestigeRequirement(progress.prestige_requirement || 1000);
            
            // Set upgrades with image reattachment
            if (upgrades) {
              const processedTierUpgrades = reattachImagesToUpgrades.tiers(upgrades.tier_upgrades || tierUpgradesArray);
              const processedSwordUpgrades = reattachImagesToUpgrades.swords(upgrades.sword_upgrades || swordUpgradesArray);
              const processedSummonUpgrades = reattachImagesToUpgrades.summons(upgrades.summon_upgrades || summonUpgradesArray);
              
              setTierUpgrades(processedTierUpgrades);
              setSwordUpgrades(processedSwordUpgrades);
              setSummonUpgrades(processedSummonUpgrades);
              setArtifacts(upgrades.artifacts || prestigeArtifacts);
            }
            
            // Set lifetime stats
            if (stats) {
              setLifetimeStats({
                clicks: stats.total_clicks || 0,
                coins: stats.total_coins || 0,
                prestigeCount: stats.total_prestiges || 0
              });
            }
            
            // Set achievements
            if (loadedAchievements) {
              setUserAchievements(loadedAchievements.achievements || achievements);
            }
          }
        } else {
          // Load from localStorage if not logged in
          setCurrentCoins(loadFromLocalStorage('currentCoins', 0));
          setClickValue(loadFromLocalStorage('clickValue', 1));
          setCps(loadFromLocalStorage('cps', 0));
          setPrestigeCurrency(loadFromLocalStorage('prestigeCurrency', 0));
          setPrestigeLevel(loadFromLocalStorage('prestigeLevel', 0));
          setPrestigeRequirement(loadFromLocalStorage('prestigeRequirement', 1000));
          
          // Load and process upgrades with image reattachment
          const loadedTierUpgrades = loadFromLocalStorage('tierUpgrades', tierUpgradesArray);
          const loadedSwordUpgrades = loadFromLocalStorage('swordUpgrades', swordUpgradesArray);
          const loadedSummonUpgrades = loadFromLocalStorage('summonUpgrades', summonUpgradesArray);
          
          setTierUpgrades(reattachImagesToUpgrades.tiers(loadedTierUpgrades));
          setSwordUpgrades(reattachImagesToUpgrades.swords(loadedSwordUpgrades));
          setSummonUpgrades(reattachImagesToUpgrades.summons(loadedSummonUpgrades));
          setArtifacts(loadFromLocalStorage('artifacts', prestigeArtifacts));
          
          setLifetimeStats(loadFromLocalStorage('lifetimeStats', {
            clicks: 0,
            coins: 0,
            prestigeCount: 0
          }));
          setUserAchievements(loadFromLocalStorage('userAchievements', achievements));
        }
      } catch (error) {
        console.error('Error initializing game state:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    // Check for verification in URL
    const hash = window.location.hash;
    if (hash.includes('access_token=')) {
      // Force sign out and show verification success modal
      supabase.auth.signOut().then(() => {
        setIsAuthModalOpen(true);
        setVerificationSuccess(true);
        // Remove the hash to clean up the URL
        window.location.hash = '';
      });
    }

    // Initialize game state
    initializeGameState();
  }, []);

  useEffect(() => {
    if (!user && !isAuthModalOpen && !playerService.getPlayerId()) {
      setIsAuthModalOpen(true);
    }
  }, [user]);

  const [showPrestigeNotification, setShowPrestigeNotification] = useState(false);

  useEffect(() => {
    if (currentCoins >= prestigeRequirement && !showPrestigeNotification) {
      setShowPrestigeNotification(true);
    } else if (currentCoins < prestigeRequirement && showPrestigeNotification) {
      setShowPrestigeNotification(false);
    }
  }, [currentCoins, prestigeRequirement, showPrestigeNotification]);

  const handlePrestigeNotificationClick = () => {
    setIsPrestigeOpen(true);
    setShowPrestigeNotification(false);
  };

  if (initialLoading) {
    return null;  // Return nothing while loading instead of the loading screen
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
          ref={clickerRef}
          handleClick={handleClick}
          swordImage={swordUpgrades.find(u => u.purchased)?.image || defaultSwordImage}
          clickValue={clickValue}
          cps={cps}
          currentCoins={currentCoins}
          swordMultiplier={swordMultiplier}
          prestigeLevel={prestigeLevel}
          showPrestigeNotification={showPrestigeNotification}
          onPrestigeNotificationClick={handlePrestigeNotificationClick}
          summonUpgrades={summonUpgrades.filter(u => u.level > 0)}
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
          currentCoins={currentCoins}
          onClose={() => setIsShopOpen(false)}
        />
      )}

      {isProfileOpen && (
        <ProfileStats 
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          stats={profileStats}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      )}

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

      <SettingsMenu 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        bgVolume={bgVolume}
        setBgVolume={setBgVolume}
        effectsVolume={effectsVolume}
        setEffectsVolume={setEffectsVolume}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        setCurrentCoins={setCurrentCoins}
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
        tierUpgradesArray={tierUpgradesArray}
        swordUpgradesArray={swordUpgradesArray}
        summonUpgradesArray={summonUpgradesArray}
        prestigeArtifacts={prestigeArtifacts}
        achievements={achievements}
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
          currentClicks={currentCoins}
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

      {isAuthModalOpen && (
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
