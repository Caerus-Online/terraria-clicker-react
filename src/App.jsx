import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from "react-dom"
import backgroundMusic from "./audio/terrariamusic.mp3";
import purchaseSound from "./audio/click.mp3";
import clickSound from "./audio/purchase.mp3";
import defaultSwordImage from '../img/swords/sword.png';
import clickIcon from './img/click-icon.png';
import cpsIcon from './img/cpsIcon.png';
import settingsIcon from './img/settings-icon.png';
import cross from './img/cross.png';
import coinIcon from './img/coin-icon.png';
import logo from './img/logo.png';
import tier1 from './img/tiers/tier1.png';
import tier2 from './img/tiers/tier2.png';
import tier3 from './img/tiers/tier3.png';
import tier4 from './img/tiers/tier4.png';
import tier5 from './img/tiers/tier5.png';
import tier6 from './img/tiers/tier6.png';
import tier7 from './img/tiers/tier7.png';
import tier8 from './img/tiers/tier8.png';
import tier9 from './img/tiers/tier9.png';
import tier10 from './img/tiers/tier10.png';
import tier11 from './img/tiers/tier11.png';
import tier12 from './img/tiers/tier12.png';
import tier13 from './img/tiers/tier13.png';
import tier14 from './img/tiers/tier14.gif';
import tier15 from './img/tiers/tier15.gif';
import sword1 from './img/swords/sword1.png';
import sword2 from './img/swords/sword2.png';
import sword3 from './img/swords/sword3.png';
import sword4 from './img/swords/sword4.png';
import sword5 from './img/swords/sword5.png';
import sword6 from './img/swords/sword6.png';
import sword7 from './img/swords/sword7.png';
import sword8 from './img/swords/sword8.png';
import sword9 from './img/swords/sword9.png';
import sword10 from './img/swords/sword10.png';
import sword11 from './img/swords/sword11.png';
import sword12 from './img/swords/sword12.png';
import summon1 from './img/summons/summon1.png';
import summon2 from './img/summons/summon2.png';
import summon3 from './img/summons/summon3.png';
import summon4 from './img/summons/summon4.png';
import summon5 from './img/summons/summon5.png';
import summon6 from './img/summons/summon6.png';
import summon7 from './img/summons/summon7.png';
import summon8 from './img/summons/summon8.png';
import summon9 from './img/summons/summon9.png';
import summon10 from './img/summons/summon10.png';
import prestige1 from './img/prestigeshop/prestige1.png';
import prestige2 from './img/prestigeshop/prestige2.png';
import prestige3 from './img/prestigeshop/prestige3.png';
import prestige4 from './img/prestigeshop/prestige4.png';
import prestige5 from './img/prestigeshop/prestige5.png';
import prestige6 from './img/prestigeshop/prestige6.png';
import prestige7 from './img/prestigeshop/prestige7.png';
import prestige8 from './img/prestigeshop/prestige8.png';
import prestige9 from './img/prestigeshop/prestige9.png';
import prestige10 from './img/prestigeshop/prestige10.png';
import prestigeShop from './img/prestigeshop.png';
import './App.css';
import LoadingScreen from './components/loadingscreen/LoadingScreen';
import prestigecoin from './img/platnium.png';
import prestigeButton from './img/prestigebutton.png';

function App() {
  const tierUpgradesArray = [{ level: 0, clicksProvided: 10, baseClicksProvided: 10, cost: 80, image: tier1, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 20, baseClicksProvided: 20, cost: 3200, image: tier2, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 40, baseClicksProvided: 40, cost: 12800, image: tier3, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 80, baseClicksProvided: 80, cost: 51200, image: tier4, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 160, baseClicksProvided: 160, cost: 204800, image: tier5, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 320, baseClicksProvided: 320, cost: 819200, image: tier6, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 640, baseClicksProvided: 640, cost: 3276800, image: tier7, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 1280, baseClicksProvided: 1280, cost: 13107200, image: tier8, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 2560, baseClicksProvided: 2560, cost: 52428800, image: tier9, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 5120, baseClicksProvided: 5120, cost: 209715200, image: tier10, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 10240, baseClicksProvided: 10240, cost: 838860800, image: tier11, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 20480, baseClicksProvided: 20480, cost: 3355443200, image: tier12, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 40960, baseClicksProvided: 40960, cost: 13421772800, image: tier13, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 81920, baseClicksProvided: 81920, cost: 53687091200, image: tier14, totalClicksProvided: 0 },
{ level: 0, clicksProvided: 163840, baseClicksProvided: 163840, cost: 214748364800, image: tier15, totalClicksProvided: 0 }];

const swordUpgradesArray = [{ level: 0, multiplier: 2, cost: 400, image: sword1, purchased: false },
{ level: 0, multiplier: 4, cost: 32000, image: sword2, purchased: false },
{ level: 0, multiplier: 6, cost: 128000, image: sword3, purchased: false },
{ level: 0, multiplier: 8, cost: 512000, image: sword4, purchased: false },
{ level: 0, multiplier: 10, cost: 2048000, image: sword5, purchased: false },
{ level: 0, multiplier: 12, cost: 8192000, image: sword6, purchased: false },
{ level: 0, multiplier: 14, cost: 32768000, image: sword7, purchased: false },
{ level: 0, multiplier: 16, cost: 131072000, image: sword8, purchased: false },
{ level: 0, multiplier: 18, cost: 524288000, image: sword9, purchased: false },
{ level: 0, multiplier: 20, cost: 2097152000, image: sword10, purchased: false }];

const summonUpgradesArray = [
  { level: 0, cpsProvided: 5, baseCps: 5, cost: 100, image: summon1, totalCps: 0 },
  { level: 0, cpsProvided: 10, baseCps: 10, cost: 4000, image: summon2, totalCps: 0 },
  { level: 0, cpsProvided: 20, baseCps: 20, cost: 16000, image: summon3, totalCps: 0 },
  { level: 0, cpsProvided: 40, baseCps: 40, cost: 64000, image: summon4, totalCps: 0 },
  { level: 0, cpsProvided: 80, baseCps: 80, cost: 256000, image: summon5, totalCps: 0 },
  { level: 0, cpsProvided: 160, baseCps: 160, cost: 1024000, image: summon6, totalCps: 0 },
  { level: 0, cpsProvided: 320, baseCps: 320, cost: 4096000, image: summon7, totalCps: 0 },
  { level: 0, cpsProvided: 640, baseCps: 640, cost: 16384000, image: summon8, totalCps: 0 },
  { level: 0, cpsProvided: 1280, baseCps: 1280, cost: 65536000, image: summon9, totalCps: 0 },
  { level: 0, cpsProvided: 2560, baseCps: 2560, cost: 262144000, image: summon10, totalCps: 0 }
];

 const prestigeUpgradesArray = [{level: 0, cost: 5, image: prestige1, bonus1: 2},
                               {level: 0, cost: 5, image: prestige2, bonus2: 2},
                               {level: 0, cost: 5, image: prestige3, bonus3: 2},
                               {level: 0, cost: 5, image: prestige4, bonus4: 2},
                               {level: 0, cost: 5, image: prestige5, bonus5: 2},
                               {level: 0, cost: 5, image: prestige6, bonus6: 2},
                               {level: 0, cost: 5, image: prestige7, bonus7: 2},
                               {level: 0, cost: 5, image: prestige8, bonus8: 2},
                               {level: 0, cost: 5, image: prestige9, bonus9: 2},
                               {level: 0, cost: 5, image: prestige10, bonus10: 2}]
  
  const [showWarning, setShowWarning] = useState(false);
  const [swordUpgrades, setSwordUpgrades] = useState(() => {
    const storedSwordUpgrades = localStorage.getItem('swordUpgrades');
    return storedSwordUpgrades ? JSON.parse(storedSwordUpgrades) : swordUpgradesArray;
  });
  const [clicks, setClicks] = useState(parseInt(localStorage.getItem('clicks')) || 0);

  const [clickValue, setClickValue] = useState(parseInt(localStorage.getItem('clickValue')) || 1);
  const [totalClicksProvided, setTotalClicksProvided] = useState(0);
  const [cps, setCps] = useState(parseInt(localStorage.getItem('cps')) || 0);

  const [prestigecurrency, setPrestigeCurrency] = useState(parseInt(localStorage.getItem('prestigecurrency')) || 0);

    const [prestigelevel, setPrestigeLevel] = useState(parseInt(localStorage.getItem('prestigelevel')) || 0);

      const [prestigerequirement, setPrestigeRequirement] = useState(parseInt(localStorage.getItem('prestigerequirement')) || 1000);
  
  const [tierUpgrades, setTierUpgrades] = useState(() => {
    const storedTierUpgrades = localStorage.getItem('tierUpgrades');
    return storedTierUpgrades ? JSON.parse(storedTierUpgrades) : tierUpgradesArray;
  });
  const [swordImage, setSwordImage] = useState(() => {
    const storedSwordImage = localStorage.getItem('swordImage');
    return storedSwordImage || defaultSwordImage;
  });
  
  const clickerRef = useRef(null);
  const swordMultiplier = swordUpgrades.filter((upgrade) => upgrade.purchased).pop()?.multiplier || 1;

  const [summonUpgrades, setSummonUpgrades] = useState(() => {
  const storedSummonUpgrades = localStorage.getItem('summonUpgrades');
  return storedSummonUpgrades ? JSON.parse(storedSummonUpgrades) : summonUpgradesArray;
});
  
  useEffect(() => {
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('cps', cps);
    localStorage.setItem('clickValue', clickValue);
    localStorage.setItem('prestigecurrency', prestigecurrency);
    localStorage.setItem('prestigelevel', prestigelevel);
    localStorage.setItem('prestigerequirement', prestigerequirement);
    localStorage.setItem('tierUpgrades', JSON.stringify(tierUpgrades));
    // Store the current sword image URL in local storage
    const swordImage = document.getElementById('sword-image');
    localStorage.setItem('swordImage', swordImage.src);
  }, [clicks, clickValue, tierUpgrades, cps]);

  useEffect(() => {
    if (swordUpgrades.some((upgrade) => upgrade.purchased)) {
      // If any sword upgrades have been purchased, set the sword image to the last purchased upgrade
      const lastPurchasedUpgrade = swordUpgrades.filter((upgrade) => upgrade.purchased).pop();
      setSwordImage(lastPurchasedUpgrade.image);
    } else {
      // If no sword upgrades have been purchased, set the sword image to the original image
      setSwordImage(defaultSwordImage);
    }
  }, [swordUpgrades]);
  
  const handleClick = () => {
    setClicks(clicks + clickValue);
  };
  
let spacebarPressed = false;

// This useEffect hook updates the clicks value every second based on the CPS value
useEffect(() => {
  const cpsInterval = setInterval(() => {
    setClicks((clicks) => clicks + cps);
  }, 1000);
  return () => clearInterval(cpsInterval);
}, [cps]);

const handleKeyDown = (event) => {
  if (event.keyCode === 32 && !spacebarPressed) {
    // Set the spacebarPressed flag to true
    spacebarPressed = true;

    // Disable the spacebar for 1 second
    clickerRef.current.disabled = true;
    setTimeout(() => {
      clickerRef.current.disabled = false;
      // Set the spacebarPressed flag to false after the delay
      spacebarPressed = false;
    }, 1000);

    // Trigger a click on the button after the delay
    setTimeout(() => {
      clickerRef.current.click();
    }, 1000);

    // Prevent the default behavior of the spacebar key
    event.preventDefault();
  }
};

const handleTierUpgrade = (index) => {
  const upgrade = { ...tierUpgrades[index] };
  if (clicks >= upgrade.cost) {
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
      } else {
        return tierUpgrade;
      }
    });
    setTierUpgrades(updatedTierUpgrades);
    localStorage.setItem('tierUpgrades', JSON.stringify(updatedTierUpgrades));

    const newClickValue = updatedTierUpgrades.reduce(
      (acc, curr) => acc + curr.totalClicksProvided,
      0  // start from 0 instead of 1
    );
    setClickValue(newClickValue);
  } else {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 2000); // auto close after 2 seconds
  }
};


  
const handleSwordUpgrade = (index) => {
  const upgrade = { ...swordUpgrades[index] };
  if (clicks >= upgrade.cost && !upgrade.purchased) {
    setClicks(clicks - upgrade.cost);
    upgrade.purchased = true;
    const newSwordMultiplier = upgrade.multiplier;

    // Save the new sword image in local storage
    localStorage.setItem('swordImage', upgrade.image);
    setSwordImage(upgrade.image);

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

    // Update the sword upgrades, tier upgrades, and summon upgrades arrays in state and local storage
    const updatedSwordUpgrades = [...swordUpgrades];
    updatedSwordUpgrades[index] = upgrade;
    setSwordUpgrades(updatedSwordUpgrades);
    setTierUpgrades(updatedTierUpgrades);
    setSummonUpgrades(updatedSummonUpgrades);
    localStorage.setItem('swordUpgrades', JSON.stringify(updatedSwordUpgrades));
    localStorage.setItem('tierUpgrades', JSON.stringify(updatedTierUpgrades));
    localStorage.setItem('summonUpgrades', JSON.stringify(updatedSummonUpgrades));

    const newClickValue = updatedTierUpgrades.reduce(
      (acc, curr) => acc + curr.totalClicksProvided,
      1
    );

        const newCpsValue = updatedSummonUpgrades.reduce(
      (acc, curr) => acc + curr.totalCps,
      0  // start from 0 instead of 1
    );
    setCps(newCpsValue);
    setClickValue(newClickValue);
  } else {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 2000); // auto close after 2 seconds
  }
};

  const handleSummonUpgrade = (index) => {
  const upgrade = { ...summonUpgrades[index] };
  if (clicks >= upgrade.cost) {
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
      } else {
        return summonUpgrade;
      }
    });
    setSummonUpgrades(updatedSummonUpgrades);
    localStorage.setItem('summonUpgrades', JSON.stringify(updatedSummonUpgrades));
    const newCpsValue = updatedSummonUpgrades.reduce(
      (acc, curr) => acc + curr.totalCps,
      0  // start from 0 instead of 1
    );
    setCps(newCpsValue); 
  } else {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 2000); // auto close after 2 seconds
  }
};
  
  function openUpgrade(evt, upgradeType) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(upgradeType).style.display = "block";
  evt.currentTarget.className += " active";
}

  function openSettingsMenu() {
  // Get the settings menu element
  var settingsMenu = document.getElementById("settings-menu");

    if (settingsMenu.style.display === "none") {
     settingsMenu.style.display = "block"; 
    } else {
     settingsMenu.style.display = "none";
    }
}
  function closeSettingsMenu() {
  // Get the settings menu element
  var settingsMenu = document.getElementById("settings-menu");

  // Hide the settings menu
  settingsMenu.style.display = "none";
}

    function openPrestigeShop() {
  // Get the settings menu element
  var prestigeShop = document.getElementById("prestige-shop");

    if (prestigeShop.style.display === "none") {
     prestigeShop.style.display = "block"; 
    } else {
     prestigeShop.style.display = "none";
    }
}
  function closePrestigeShop() {
  // Get the settings menu element
  var prestigeShop = document.getElementById("prestige-shop");

  // Hide the settings menu
  prestigeShop.style.display = "none";
}

  const formatNumber = (num) => {
  const suffixes = ['', 'k', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qu'];
  let suffixIndex = 0;
  while (num >= 1000 && suffixIndex < suffixes.length - 1) {
    num /= 1000;
    suffixIndex++;
  }
  return num.toFixed(1).replace(/\.0$/, '') + suffixes[suffixIndex];
};

  return (
<div className="App" onKeyDown={handleKeyDown} tabIndex="0">
  <LoadingScreen />
  <div className="header">
    <img className="logo" src={logo} alt="Logo" />
  </div>
  <div className="settings-menu" id="settings-menu">
    <img id="cross" src={cross} alt="close" onClick={(event) => closeSettingsMenu()}></img>
    <p id="settings1">《═《Settings》═》</p>
    <div className='audio'>
    <p className="settingheader">Audio</p>
  <div className='music-slider settingitem'>Music: </div>
<div className='volume-slider settingitem'>Volume: </div>
  </div>
    </div>
      <div className="prestige-shop" id="prestige-shop">
         <img id="cross" src={cross} alt="close" onClick={(event) => closePrestigeShop()}/>
      <p>《═《Prestitge Shop》═》<img className="icon" src={prestigecoin}/> {prestigecurrency}</p>
      <p>Sacrifice your progress and prestige to gain a +1% boost per level and currency for the special upgrades below.</p>
        <p>Prestige Requirement: {formatNumber(prestigerequirement)}</p>
        <button className="prestigebutton" src={prestigeButton}>Prestige</button>
        <div className="prestigeupgrades">
        </div>
    </div>
  <div className="game-container">
    <div className="click-container" ref={clickerRef} onClick={handleClick}>
      <img className="sword-image" id="sword-image" src={swordImage} alt="Sword" />
    </div>
    <div className="click-details">
      <div className="click-value">
        <p><div className="box"><img className="icon" src={clickIcon} data-title="Coins" /> {formatNumber(clickValue)} <img className="icon" src={cpsIcon} alt="Coin Icon" /> {formatNumber(cps)}</div></p> 
      </div>
        <p id="multi">Multiplier: {formatNumber(swordMultiplier)}x</p>
      <p>Prestige LV: {formatNumber(prestigelevel)}</p>
      <div className="clicks">
        <p><div className="box"><img className="icon" src={coinIcon} alt="Coin Icon"/> {formatNumber(clicks)} <img className="icon" src={prestigecoin}/> {prestigecurrency}</div></p>
      </div>
    </div>
  </div>
    {showWarning && (
  <div className="warning-popup">
    <p>You don't have enough coins to purchase this upgrade!</p>
  </div>
)}
  <div className="shop-menu">
  <p><img className="shopitem-icon" src={prestigeShop} onClick={(event) => openPrestigeShop()}></img>《═《Shop》═》<img className="shopitem-icon" src={settingsIcon} alt="Settings" onClick={(event) => openSettingsMenu()}></img></p>    
  <div class="tab">
  <button className="tablinks" onClick={(event) => openUpgrade(event, 'Tiers')}>Tier Upgrades</button>
  <button className="tablinks" onClick={(event) => openUpgrade(event, 'Swords')}>Sword Upgrades</button>
      <button className="tablinks" onClick={(event) => openUpgrade(event, 'Summons')}>Summon Upgrades</button>
  </div>
  <div id="Tiers" class="tabcontent">
    {tierUpgrades.map((upgrade, index) => (
      <div key={index} className="tier-upgrade" onClick={() => handleTierUpgrade(index)}>
<div className="tier-upgrade-image">
  <img src={upgrade.image} alt={`Tier ${formatNumber(upgrade.level)} Upgrade`} />
</div>
<div className="tier-upgrade-details">
  <p>(Level {formatNumber(upgrade.level)})</p>
  <p>
    <img className="icon" src={coinIcon} alt="Coin Icon" />
    {formatNumber(upgrade.cost)}
  </p>
  <p>
    <img className="icon" src={clickIcon} alt="Click Icon" />
    +{formatNumber(upgrade.clicksProvided)}{" "}
    <span>(+{formatNumber(upgrade.totalClicksProvided)})</span>
  </p>
  <div className="tier-upgrade-hover">
    <p>{upgrade.hoverDescription}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
  <div id="Swords" class="tabcontent">
    {swordUpgrades.map((upgrade, index) => (
      <div key={index} className="sword-upgrade" onClick={() => handleSwordUpgrade(index)}>
<div className="sword-upgrade-image">
  <img src={upgrade.image} alt={`Sword Upgrade ${upgrade.level}`} />
</div>
<div className="sword-upgrade-details">
  <p>{upgrade.purchased ? "Purchased" : "Purchase"}</p>
  <p>
    <img className="icon" src={coinIcon} alt="Coin Icon" />
    {formatNumber(upgrade.cost)}
  </p>
  <p>
    <img className="icon" src={clickIcon} alt="Click Icon" />
    {formatNumber(upgrade.multiplier)}x
  </p>
  <div className="sword-upgrade-hover">
    <p>{upgrade.hoverDescription}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
    <div id="Summons" class="tabcontent">
  {summonUpgrades.map((upgrade, index) => (
    <div key={index} className="summon-upgrade" onClick={() => handleSummonUpgrade(index)}>
    <div className="summon-upgrade-image">
  <img src={upgrade.image} alt={`Summon Upgrade ${formatNumber(upgrade.level)}`} />
</div>
<div className="summon-upgrade-details">
  <p>(Level {formatNumber(upgrade.level)})</p>
  <p>
    <img className="icon" src={coinIcon} alt="Coin Icon" />
    {formatNumber(upgrade.cost)}
  </p>
  <p>
    <img className="icon" src={cpsIcon} alt="CPS Icon" />
    +{formatNumber(upgrade.cpsProvided)}{" "}
    <span>(+{formatNumber(upgrade.totalCps)})</span>
  </p>
  <div className="summon-upgrade-hover">
    <p>{upgrade.hoverDescription}</p>
        </div>
      </div>
    </div>
  ))}
</div>
</div>
</div>
);
}
export default App;