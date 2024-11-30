import prestige1 from '../img/prestige1.png';
import prestige2 from '../img/prestige2.png';
import prestige3 from '../img/prestige3.png';
import prestige4 from '../img/prestige4.png';
import prestige5 from '../img/prestige5.png';

export const prestigeArtifacts = [
  {
    id: 1,
    name: "Royal Gel",
    description: "Increases base click power by 25% per level",
    image: prestige1,
    baseCost: 5,
    costMultiplier: 2,
    maxLevel: 5,
    level: 0,
    effect: {
      type: 'CLICK_POWER',
      value: 0.25 // 25% per level
    }
  },
  {
    id: 2,
    name: "Shield of Cthulhu",
    description: "Increases CPS by 25% per level",
    image: prestige2,
    baseCost: 5,
    costMultiplier: 2,
    maxLevel: 5,
    level: 0,
    effect: {
      type: 'CPS_BOOST',
      value: 0.25 // 25% per level
    }
  },
  {
    id: 3,
    name: "Worm Scarf",
    description: "Increases sword multiplier effectiveness by 25% per level",
    image: prestige3,
    baseCost: 5,
    costMultiplier: 2,
    maxLevel: 5,
    level: 0,
    effect: {
      type: 'SWORD_BOOST',
      value: 0.25 // 25% per level
    }
  },
  {
    id: 4,
    name: "Hive Pack",
    description: "Reduces all upgrade costs by 10% per level",
    image: prestige4,
    baseCost: 8,
    costMultiplier: 2,
    maxLevel: 3,
    level: 0,
    effect: {
      type: 'COST_REDUCTION',
      value: 0.10 // 10% per level
    }
  },
  {
    id: 5,
    name: "Bone Helm",
    description: "Increases prestige currency gain by 20% per level",
    image: prestige5,
    baseCost: 10,
    costMultiplier: 2,
    maxLevel: 3,
    level: 0,
    effect: {
      type: 'PRESTIGE_GAIN',
      value: 0.20 // 20% per level
    }
  }
];

// Helper function to calculate artifact cost at a specific level
export const calculateArtifactCost = (artifact) => {
  return Math.floor(artifact.baseCost * Math.pow(artifact.costMultiplier, artifact.level));
};

// Helper function to calculate total bonus from artifacts
export const calculateTotalBonus = (artifacts, type) => {
  const artifact = artifacts.find(a => a.effect.type === type);
  return artifact ? artifact.effect.value * artifact.level : 0;
};

// Helper function to calculate prestige multiplier (5% per level)
export const calculatePrestigeMultiplier = (prestigeLevel) => {
  return 1 + (prestigeLevel * 0.05); // 5% per level
}; 