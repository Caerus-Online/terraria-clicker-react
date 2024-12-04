import prestige1 from '../img/prestige1.png';
import prestige2 from '../img/prestige2.png';
import prestige3 from '../img/prestige3.png';
import prestige4 from '../img/prestige4.png';
import prestige5 from '../img/prestige5.png';

export const prestigeArtifacts = [
  {
    id: 1,
    name: "Terra Blade Essence",
    description: "Increases sword multiplier effectiveness by 25%",
    image: prestige1,
    baseCost: 5,
    costMultiplier: 2,
    maxLevel: 5,
    effect: {
      type: 'SWORD_MULTIPLIER',
      value: 0.25 // 25% per level
    }
  },
  {
    id: 2,
    name: "Summoner's Relic",
    description: "Increases CPS effectiveness by 25%",
    image: prestige2,
    baseCost: 5,
    costMultiplier: 2,
    maxLevel: 5,
    effect: {
      type: 'CPS_BOOST',
      value: 0.25 // 25% per level
    }
  },
  {
    id: 3,
    name: "Celestial Fragment",
    description: "Increases click power by 25%",
    image: prestige3,
    baseCost: 5,
    costMultiplier: 2,
    maxLevel: 5,
    effect: {
      type: 'CLICK_POWER',
      value: 0.25 // 25% per level
    }
  },
  {
    id: 4,
    name: "Moon Lord's Heart",
    description: "Reduces all upgrade costs by 10%",
    image: prestige4,
    baseCost: 8,
    costMultiplier: 2,
    maxLevel: 3,
    effect: {
      type: 'COST_REDUCTION',
      value: 0.10 // 10% per level
    }
  },
  {
    id: 5,
    name: "Ancient Manipulator",
    description: "Increases prestige currency gain by 20%",
    image: prestige5,
    baseCost: 10,
    costMultiplier: 2,
    maxLevel: 3,
    effect: {
      type: 'PRESTIGE_GAIN',
      value: 0.20 // 20% per level
    }
  }
];

// Helper function to calculate artifact cost at a specific level
export const calculateArtifactCost = (artifact, currentLevel) => {
  return artifact.baseCost * Math.pow(artifact.costMultiplier, currentLevel);
};

// Helper function to calculate total bonus from artifacts
export const calculateArtifactBonus = (artifacts, type) => {
  return artifacts
    .filter(a => a.effect.type === type)
    .reduce((total, artifact) => total + (artifact.effect.value * artifact.level), 0);
}; 