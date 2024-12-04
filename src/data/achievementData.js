import coinIcon from '../img/coin-icon.png';
import clickIcon from '../img/click-icon.png';
import cpsIcon from '../img/cpsIcon.png';
import prestigeIcon from '../img/platnium.png';
import sword1 from '../img/sword1.png';
import summon1 from '../img/summon1.png';

export const achievements = [
  // Click Power Achievements
  {
    id: 'CLICK_1',
    name: 'Novice Clicker',
    description: 'Reach 100 click power',
    icon: clickIcon,
    requirement: 100,
    type: 'CLICK_POWER',
    earned: false
  },
  {
    id: 'CLICK_2',
    name: 'Expert Clicker',
    description: 'Reach 1,000 click power',
    icon: clickIcon,
    requirement: 1000,
    type: 'CLICK_POWER',
    earned: false
  },
  {
    id: 'CLICK_3',
    name: 'Master Clicker',
    description: 'Reach 10,000 click power',
    icon: clickIcon,
    requirement: 10000,
    type: 'CLICK_POWER',
    earned: false
  },

  // Total Coins Achievements
  {
    id: 'COINS_1',
    name: 'Coin Collector',
    description: 'Accumulate 1,000 total coins',
    icon: coinIcon,
    requirement: 1000,
    type: 'TOTAL_COINS',
    earned: false
  },
  {
    id: 'COINS_2',
    name: 'Treasure Hunter',
    description: 'Accumulate 1,000,000 total coins',
    icon: coinIcon,
    requirement: 1000000,
    type: 'TOTAL_COINS',
    earned: false
  },
  {
    id: 'COINS_3',
    name: 'Dragon\'s Hoard',
    description: 'Accumulate 1,000,000,000 total coins',
    icon: coinIcon,
    requirement: 1000000000,
    type: 'TOTAL_COINS',
    earned: false
  },

  // CPS Achievements
  {
    id: 'CPS_1',
    name: 'Summoner Apprentice',
    description: 'Reach 100 CPS',
    icon: summon1,
    requirement: 100,
    type: 'CPS',
    earned: false
  },
  {
    id: 'CPS_2',
    name: 'Summoner Adept',
    description: 'Reach 1,000 CPS',
    icon: summon1,
    requirement: 1000,
    type: 'CPS',
    earned: false
  },
  {
    id: 'CPS_3',
    name: 'Summoner Master',
    description: 'Reach 10,000 CPS',
    icon: summon1,
    requirement: 10000,
    type: 'CPS',
    earned: false
  },

  // Sword Multiplier Achievements
  {
    id: 'SWORD_1',
    name: 'Sword Collector',
    description: 'Own 3 different swords',
    icon: sword1,
    requirement: 3,
    type: 'SWORD_COUNT',
    earned: false
  },
  {
    id: 'SWORD_2',
    name: 'Sword Master',
    description: 'Own 6 different swords',
    icon: sword1,
    requirement: 6,
    type: 'SWORD_COUNT',
    earned: false
  },
  {
    id: 'SWORD_3',
    name: 'Sword Legend',
    description: 'Own all swords',
    icon: sword1,
    requirement: 12,
    type: 'SWORD_COUNT',
    earned: false
  },

  // Prestige Achievements
  {
    id: 'PRESTIGE_1',
    name: 'New Game+',
    description: 'Prestige for the first time',
    icon: prestigeIcon,
    requirement: 1,
    type: 'PRESTIGE_COUNT',
    earned: false
  },
  {
    id: 'PRESTIGE_2',
    name: 'Prestige Master',
    description: 'Reach Prestige Level 5',
    icon: prestigeIcon,
    requirement: 5,
    type: 'PRESTIGE_LEVEL',
    earned: false
  },
  {
    id: 'PRESTIGE_3',
    name: 'Prestige Legend',
    description: 'Reach Prestige Level 10',
    icon: prestigeIcon,
    requirement: 10,
    type: 'PRESTIGE_LEVEL',
    earned: false
  }
];

// Helper function to check achievements
export const checkAchievement = (achievement, value) => {
  if (achievement.earned) return false;
  return value >= achievement.requirement;
};

// Helper function to get achievement progress
export const getAchievementProgress = (achievement, value) => {
  return Math.min((value / achievement.requirement) * 100, 100);
}; 