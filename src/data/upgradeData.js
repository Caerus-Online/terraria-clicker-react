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

import summon1 from '../img/summon1.png';
import summon2 from '../img/summon2.png';
import summon3 from '../img/summon3.png';
import summon4 from '../img/summon4.png';
import summon5 from '../img/summon5.png';
import summon6 from '../img/summon6.png';
import summon7 from '../img/summon7.png';
import summon8 from '../img/summon8.png';
import summon9 from '../img/summon9.png';
import summon10 from '../img/summon10.png';

// For missing images, we'll use Remix icons (these will be added to public/icons/)
const iconBaseUrl = '/icons/';

// Helper function to get image or fallback to icon
const getImageSource = (imagePath, iconFallback) => {
  try {
    return imagePath || `${iconBaseUrl}${iconFallback}.svg`;
  } catch {
    return `${iconBaseUrl}${iconFallback}.svg`;
  }
};

// Tier icons fallbacks
const tierIcons = {
  tier1: getImageSource(tier1, 'sword-line'),
  tier2: getImageSource(tier2, 'sword-fill'),
  tier3: getImageSource(tier3, 'sword-2-line'),
  tier4: getImageSource(tier4, 'sword-2-fill'),
  tier5: getImageSource(tier5, 'knife-line'),
  tier6: getImageSource(tier6, 'knife-fill'),
  tier7: getImageSource(tier7, 'knife-2-line'),
  tier8: getImageSource(tier8, 'knife-2-fill'),
  tier9: getImageSource(tier9, 'axe-line'),
  tier10: getImageSource(tier10, 'axe-fill'),
  tier11: getImageSource(tier11, 'hammer-line'),
  tier12: getImageSource(tier12, 'hammer-fill'),
  tier13: getImageSource(tier13, 'spear-line'),
  tier14: getImageSource(tier14, 'spear-fill'),
  tier15: getImageSource(tier15, 'dagger-line')
};

// Sword icons fallbacks
const swordIcons = {
  sword1: getImageSource(sword1, 'sword-basic'),
  sword2: getImageSource(sword2, 'sword-advanced'),
  sword3: getImageSource(sword3, 'sword-elite'),
  sword4: getImageSource(sword4, 'sword-rare'),
  sword5: getImageSource(sword5, 'sword-epic'),
  sword6: getImageSource(sword6, 'sword-legendary'),
  sword7: getImageSource(sword7, 'sword-mythic'),
  sword8: getImageSource(sword8, 'sword-divine'),
  sword9: getImageSource(sword9, 'sword-celestial'),
  sword10: getImageSource(sword10, 'sword-cosmic'),
  sword11: getImageSource(sword11, 'sword-eternal'),
  sword12: getImageSource(sword12, 'sword-infinity')
};

// Summon icons fallbacks
const summonIcons = {
  summon1: getImageSource(summon1, 'ghost-line'),
  summon2: getImageSource(summon2, 'ghost-fill'),
  summon3: getImageSource(summon3, 'skull-line'),
  summon4: getImageSource(summon4, 'skull-fill'),
  summon5: getImageSource(summon5, 'ghost-2-line'),
  summon6: getImageSource(summon6, 'ghost-2-fill'),
  summon7: getImageSource(summon7, 'skull-2-line'),
  summon8: getImageSource(summon8, 'skull-2-fill'),
  summon9: getImageSource(summon9, 'ghost-smile-line'),
  summon10: getImageSource(summon10, 'ghost-smile-fill')
};

export const tierUpgradesArray = [
  { level: 0, clicksProvided: 10, baseClicksProvided: 10, cost: 80, image: tierIcons.tier1, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 20, baseClicksProvided: 20, cost: 3200, image: tierIcons.tier2, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 40, baseClicksProvided: 40, cost: 12800, image: tierIcons.tier3, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 80, baseClicksProvided: 80, cost: 51200, image: tierIcons.tier4, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 160, baseClicksProvided: 160, cost: 204800, image: tierIcons.tier5, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 320, baseClicksProvided: 320, cost: 819200, image: tierIcons.tier6, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 640, baseClicksProvided: 640, cost: 3276800, image: tierIcons.tier7, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 1280, baseClicksProvided: 1280, cost: 13107200, image: tierIcons.tier8, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 2560, baseClicksProvided: 2560, cost: 52428800, image: tierIcons.tier9, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 5120, baseClicksProvided: 5120, cost: 209715200, image: tierIcons.tier10, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 10240, baseClicksProvided: 10240, cost: 838860800, image: tierIcons.tier11, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 20480, baseClicksProvided: 20480, cost: 3355443200, image: tierIcons.tier12, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 40960, baseClicksProvided: 40960, cost: 13421772800, image: tierIcons.tier13, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 81920, baseClicksProvided: 81920, cost: 53687091200, image: tierIcons.tier14, totalClicksProvided: 0 },
  { level: 0, clicksProvided: 163840, baseClicksProvided: 163840, cost: 214748364800, image: tierIcons.tier15, totalClicksProvided: 0 }
];

export const swordUpgradesArray = [
  { level: 0, multiplier: 2, cost: 400, image: swordIcons.sword1, purchased: false },
  { level: 0, multiplier: 4, cost: 32000, image: swordIcons.sword2, purchased: false },
  { level: 0, multiplier: 6, cost: 128000, image: swordIcons.sword3, purchased: false },
  { level: 0, multiplier: 8, cost: 512000, image: swordIcons.sword4, purchased: false },
  { level: 0, multiplier: 10, cost: 2048000, image: swordIcons.sword5, purchased: false },
  { level: 0, multiplier: 12, cost: 8192000, image: swordIcons.sword6, purchased: false },
  { level: 0, multiplier: 14, cost: 32768000, image: swordIcons.sword7, purchased: false },
  { level: 0, multiplier: 16, cost: 131072000, image: swordIcons.sword8, purchased: false },
  { level: 0, multiplier: 18, cost: 524288000, image: swordIcons.sword9, purchased: false },
  { level: 0, multiplier: 20, cost: 2097152000, image: swordIcons.sword10, purchased: false },
  { level: 0, multiplier: 22, cost: 8388608000, image: swordIcons.sword11, purchased: false },
  { level: 0, multiplier: 24, cost: 33554432000, image: swordIcons.sword12, purchased: false }
];

export const summonUpgradesArray = [
  { level: 0, cpsProvided: 5, baseCps: 5, cost: 100, image: summonIcons.summon1, totalCps: 0 },
  { level: 0, cpsProvided: 10, baseCps: 10, cost: 4000, image: summonIcons.summon2, totalCps: 0 },
  { level: 0, cpsProvided: 20, baseCps: 20, cost: 16000, image: summonIcons.summon3, totalCps: 0 },
  { level: 0, cpsProvided: 40, baseCps: 40, cost: 64000, image: summonIcons.summon4, totalCps: 0 },
  { level: 0, cpsProvided: 80, baseCps: 80, cost: 256000, image: summonIcons.summon5, totalCps: 0 },
  { level: 0, cpsProvided: 160, baseCps: 160, cost: 1024000, image: summonIcons.summon6, totalCps: 0 },
  { level: 0, cpsProvided: 320, baseCps: 320, cost: 4096000, image: summonIcons.summon7, totalCps: 0 },
  { level: 0, cpsProvided: 640, baseCps: 640, cost: 16384000, image: summonIcons.summon8, totalCps: 0 },
  { level: 0, cpsProvided: 1280, baseCps: 1280, cost: 65536000, image: summonIcons.summon9, totalCps: 0 },
  { level: 0, cpsProvided: 2560, baseCps: 2560, cost: 262144000, image: summonIcons.summon10, totalCps: 0 }
]; 