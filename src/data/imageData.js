// Core game images
import defaultSwordImage from '../img/sword.png';
import backgroundImage from '../img/background.png';
import logo from '../img/logo.png';
import clickIcon from '../img/click-icon.png';
import cpsIcon from '../img/cpsIcon.png';
import coinIcon from '../img/coin-icon.png';

// Minion images
import minion1Image from '../img/minion1.png';
import minion2Image from '../img/minion2.png';
import minion3Image from '../img/minion3.png';
import minion4Image from '../img/minion4.png';
import minion5Image from '../img/minion5.png';
import minion6Image from '../img/minion6.png';
import minion7Image from '../img/minion7.png';
import minion8Image from '../img/minion8.png';
import minion9Image from '../img/minion9.png';
import minion10Image from '../img/minion10.png';

// Sword upgrade images
import sword1 from '../img/sword1.png';
import sword2 from '../img/sword2.png';
import sword3 from '../img/sword3.png';
import sword4 from '../img/sword4.png';
import sword5 from '../img/sword5.png';
import sword6 from '../img/sword6.png';
import sword7 from '../img/sword7.png';
import sword8 from '../img/sword8.png';
import sword9 from '../img/sword9.png';
import sword10 from '../img/sword10.png';
import sword11 from '../img/sword11.png';
import sword12 from '../img/sword12.png';

// Tier upgrade images
import tier1 from '../img/tier1.png';
import tier2 from '../img/tier2.png';
import tier3 from '../img/tier3.png';
import tier4 from '../img/tier4.png';
import tier5 from '../img/tier5.png';
import tier6 from '../img/tier6.png';
import tier7 from '../img/tier7.png';
import tier8 from '../img/tier8.png';
import tier9 from '../img/tier9.png';
import tier10 from '../img/tier10.png';
import tier11 from '../img/tier11.png';
import tier12 from '../img/tier12.png';
import tier13 from '../img/tier13.png';
import tier14 from '../img/tier14.gif';
import tier15 from '../img/tier15.gif';

// Icon fallback base URL
const iconBaseUrl = '/icons/';

// Helper function to get image or fallback to icon
const getImageSource = (imagePath, iconFallback) => {
  try {
    return imagePath || `${iconBaseUrl}${iconFallback}.svg`;
  } catch {
    return `${iconBaseUrl}${iconFallback}.svg`;
  }
};

// Core game images with fallbacks
export const gameImages = {
  defaultSword: getImageSource(defaultSwordImage, 'sword-line'),
  background: getImageSource(backgroundImage, 'landscape-line'),
  logo: getImageSource(logo, 'game-line'),
  click: getImageSource(clickIcon, 'cursor-line'),
  cps: getImageSource(cpsIcon, 'speed-line'),
  coin: getImageSource(coinIcon, 'coin-line')
};

// Minion images array with fallbacks
export const minionImages = [
  getImageSource(minion1Image, 'ghost-1-line'),
  getImageSource(minion2Image, 'ghost-2-line'),
  getImageSource(minion3Image, 'ghost-3-line'),
  getImageSource(minion4Image, 'ghost-4-line'),
  getImageSource(minion5Image, 'ghost-5-line'),
  getImageSource(minion6Image, 'ghost-6-line'),
  getImageSource(minion7Image, 'ghost-7-line'),
  getImageSource(minion8Image, 'ghost-8-line'),
  getImageSource(minion9Image, 'ghost-9-line'),
  getImageSource(minion10Image, 'ghost-10-line')
];

// Sword upgrade images with fallbacks
export const swordImages = [
  getImageSource(sword1, 'sword-1-line'),
  getImageSource(sword2, 'sword-2-line'),
  getImageSource(sword3, 'sword-3-line'),
  getImageSource(sword4, 'sword-4-line'),
  getImageSource(sword5, 'sword-5-line'),
  getImageSource(sword6, 'sword-6-line'),
  getImageSource(sword7, 'sword-7-line'),
  getImageSource(sword8, 'sword-8-line'),
  getImageSource(sword9, 'sword-9-line'),
  getImageSource(sword10, 'sword-10-line'),
  getImageSource(sword11, 'sword-11-line'),
  getImageSource(sword12, 'sword-12-line')
];

// Tier upgrade images with fallbacks
export const tierImages = [
  getImageSource(tier1, 'tier-1-line'),
  getImageSource(tier2, 'tier-2-line'),
  getImageSource(tier3, 'tier-3-line'),
  getImageSource(tier4, 'tier-4-line'),
  getImageSource(tier5, 'tier-5-line'),
  getImageSource(tier6, 'tier-6-line'),
  getImageSource(tier7, 'tier-7-line'),
  getImageSource(tier8, 'tier-8-line'),
  getImageSource(tier9, 'tier-9-line'),
  getImageSource(tier10, 'tier-10-line'),
  getImageSource(tier11, 'tier-11-line'),
  getImageSource(tier12, 'tier-12-line'),
  getImageSource(tier13, 'tier-13-line'),
  getImageSource(tier14, 'tier-14-line'),
  getImageSource(tier15, 'tier-15-line')
];

// Helper functions to reattach images to loaded data
export const reattachImagesToUpgrades = {
  // Reattach minion images to summon upgrades
  summons: (summonUpgrades) => {
    if (!Array.isArray(summonUpgrades)) return summonUpgrades;
    return summonUpgrades.map((upgrade, index) => ({
      ...upgrade,
      image: minionImages[index]
    }));
  },

  // Reattach sword images to sword upgrades
  swords: (swordUpgrades) => {
    if (!Array.isArray(swordUpgrades)) return swordUpgrades;
    return swordUpgrades.map((upgrade, index) => ({
      ...upgrade,
      image: swordImages[index]
    }));
  },

  // Reattach tier images to tier upgrades
  tiers: (tierUpgrades) => {
    if (!Array.isArray(tierUpgrades)) return tierUpgrades;
    return tierUpgrades.map((upgrade, index) => ({
      ...upgrade,
      image: tierImages[index]
    }));
  }
};

export default {
  gameImages,
  minionImages,
  swordImages,
  tierImages,
  reattachImagesToUpgrades
}; 