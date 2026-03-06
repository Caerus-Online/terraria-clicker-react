# Terraria Clicker - Proposed Features & Enhancements

## 🎯 **Overview**

This document outlines proposed features to transform Terraria Clicker from a basic incremental game into an engaging progression-based RPG with luck mechanics, inspired by Clicker Heroes and Tap Titans while leveraging Terraria assets and themes.

---

## 🎲 **Luck & Gambling Features**

### **1. Lucky Chest System**

#### **Mechanics**
```javascript
// Chest spawn rate and rewards
const luckyChestSystem = {
  spawnRate: 'Every 100 clicks',
  duration: '30 seconds before disappearing',
  rewards: {
    common: { chance: 60%, reward: '2x coins for 30s' },
    rare: { chance: 30%, reward: '5x coins for 60s' },
    epic: { chance: 8%, reward: '10x coins + random upgrade' },
    legendary: { chance: 2%, reward: 'Permanent 0.1% multiplier boost' }
  }
}
```

#### **Required Assets**
```
📦 Chest Assets:
├── common-chest.png        # Wooden chest sprite
├── rare-chest.png          # Iron chest sprite  
├── epic-chest.png          # Gold chest sprite
├── legendary-chest.gif     # Animated shadow chest
├── chest-open.png          # Open chest animation
├── chest-glow.png          # Glow effect overlay
└── chest-particles.png     # Particle effects
```

#### **UI Components**
- Chest spawn animations
- Rarity glow effects (common=white, rare=blue, epic=purple, legendary=orange)
- Timer display for chest expiration
- Reward notification popups

---

### **2. Terraria Loot Bags**

#### **Mechanics**
```javascript
const lootBags = {
  wooden: { 
    dropRate: 'Common drops',
    contents: '100-1000 coins, tier upgrade materials'
  },
  iron: {
    dropRate: 'Uncommon drops', 
    contents: '1000-5000 coins, chance for tier-up'
  },
  gold: {
    dropRate: 'Rare drops',
    contents: '5000-20000 coins, guaranteed tier-up'
  },
  shadow: {
    dropRate: 'Boss drops only',
    contents: 'Rare artifacts, prestige bonuses'
  }
}
```

#### **Required Assets**
```
📦 Loot Bag Assets:
├── wooden-bag.png          # Brown paper bag
├── iron-bag.png            # Metal bag
├── gold-bag.png            # Golden bag with lock
├── shadow-bag.gif          # Animated shadow bag
├── bag-open.png            # Opening animation
└── bag-sparkle.png         # Sparkle effects
```

---

### **3. Enchantment System**

#### **Mechanics**
```javascript
const enchantments = {
  critical_strike: {
    name: 'Critical Strike',
    effect: '5% chance for 10x click value',
    duration: 'Permanent until re-enchant'
  },
  lucky_coins: {
    name: 'Lucky Coins', 
    effect: '+20% coin drops',
    duration: 'Permanent'
  },
  speed_demon: {
    name: 'Speed Demon',
    effect: '+50% click speed',
    duration: 'Permanent'
  },
  treasure_hunter: {
    name: 'Treasure Hunter',
    effect: 'Better chest rarity',
    duration: 'Permanent'
  }
}
```

#### **Required Assets**
```
📦 Enchantment Assets:
├── enchantment-table.png    # Crafting station
├── enchantment-glow.gif     # Enchanting animation
├── critical-icon.png        # Critical strike icon
├── lucky-icon.png           # Lucky coins icon
├── speed-icon.png           # Speed boost icon
├── treasure-icon.png        # Treasure hunter icon
├── enchantment-particles.png # Magic particle effects
└── reroll-button.png        # Re-enchant button
```

---

## ⚔️ **Hero & Boss System**

### **1. Boss Battles**

#### **Boss Progression**
```javascript
const bosses = [
  {
    name: 'Eye of Cthulhu',
    hp: 1000,
    stage: 'Corruption',
    rewards: ['Demonite Sword', 'Shadow Orb'],
    unlockRequirement: 'Tier 5'
  },
  {
    name: 'Eater of Worlds', 
    hp: 5000,
    stage: 'Corruption',
    rewards: ['Shadow Armor Set', 'Worm Tooth'],
    unlockRequirement: 'Defeat Eye of Cthulhu'
  },
  {
    name: 'Skeletron',
    hp: 10000, 
    stage: 'Dungeon',
    rewards: ['Necro Armor', 'Bone Sword'],
    unlockRequirement: 'Defeat Eater of Worlds'
  },
  {
    name: 'Wall of Flesh',
    hp: 50000,
    stage: 'Underworld', 
    rewards: ['Hellstone Set', 'Breaker Blade'],
    unlockRequirement: 'Defeat Skeletron'
  },
  {
    name: 'Plantera',
    hp: 100000,
    stage: 'Jungle',
    rewards: ['Chlorophyte Weapons', 'Plantera Trophy'],
    unlockRequirement: 'Hardmode unlocked'
  }
]
```

#### **Required Boss Assets**
```
📦 Boss Sprite Assets:
├── eye-of-cthulhu.png       # Main boss sprite
├── eye-of-cthulhu-hurt.png  # Damage state
├── eater-of-worms.png       # Worm body segments
├── eater-of-worms-head.png  # Worm head
├── skeletron-head.png       # Skull head
├── skeletron-hands.png      # Floating hands
├── wall-of-flesh.png        # Wall sprite
├── wall-of-flesh-mouth.png  # Mouth animation
├── plantera.png             # Plant boss
├── plantera-tentacles.png   # Tentacle attacks
├── boss-health-bar.png      # Custom health bar
└── boss-backgrounds/        # Stage backgrounds
    ├── corruption-bg.png
    ├── dungeon-bg.png
    ├── underworld-bg.png
    └── jungle-bg.png
```

#### **Battle UI Assets**
```
📦 Battle UI Assets:
├── boss-health-bar.png      # Health bar container
├── boss-timer.png           # Battle timer
├── damage-numbers.png       # Damage popup sprites
├── critical-hit.png         # Critical hit effect
├── boss-defeat.png          # Victory animation
└── boss-reward-popup.png    # Reward display
```

---

### **2. Hero Companion System**

#### **Terraria NPC Heroes**
```javascript
const heroes = [
  {
    name: 'Guide',
    cost: 1000,
    effect: '+5% to all stats',
    unlock: 'Start of game',
    sprite: 'guide-npc.png'
  },
  {
    name: 'Nurse', 
    cost: 2500,
    effect: 'Auto-heal during boss fights',
    unlock: 'Defeat Eye of Cthulhu',
    sprite: 'nurse-npc.png'
  },
  {
    name: 'Arms Dealer',
    cost: 5000,
    effect: '+10% critical strike chance',
    unlock: 'Find gun in world',
    sprite: 'arms-dealer-npc.png'
  },
  {
    name: 'Merchant',
    cost: 3000,
    effect: '10% discount in shop',
    unlock: 'Defeat first boss',
    sprite: 'merchant-npc.png'
  },
  {
    name: 'Demolitionist',
    cost: 7500,
    effect: 'Explosive damage on critical hits',
    unlock: 'Find bombs',
    sprite: 'demolitionist-npc.png'
  }
]
```

#### **Required Hero Assets**
```
📦 Hero NPC Assets:
├── guide-npc.png            # Guide character
├── nurse-npc.png            # Nurse character
├── arms-dealer-npc.png      # Arms dealer
├── merchant-npc.png         # Merchant
├── demolitionist-npc.png    # Demolitionist
├── hero-portraits/          # Small portraits for UI
│   ├── guide-portrait.png
│   ├── nurse-portrait.png
│   ├── arms-dealer-portrait.png
│   ├── merchant-portrait.png
│   └── demolitionist-portrait.png
├── hero-animations/         # Idle and attack animations
│   ├── guide-idle.gif
│   ├── nurse-heal.gif
│   ├── arms-dealer-shoot.gif
│   ├── merchant-trade.gif
│   └── demolitionist-explode.gif
└── hero-effects/            # Ability effects
    ├── heal-effect.png
    ├── critical-bonus.png
    ├── discount-icon.png
    └── explosion-effect.png
```

---

### **3. Stage Progression System**

#### **Biome Stages**
```javascript
const stages = [
  {
    name: 'Forest',
    background: 'forest-bg.png',
    music: 'overworld-day.mp3',
    unlockRequirement: 'Game start',
    boss: null
  },
  {
    name: 'Corruption', 
    background: 'corruption-bg.png',
    music: 'corruption.mp3',
    unlockRequirement: 'Tier 3',
    boss: 'Eye of Cthulhu'
  },
  {
    name: 'Jungle',
    background: 'jungle-bg.png', 
    music: 'jungle.mp3',
    unlockRequirement: 'Defeat Eye of Cthulhu',
    boss: 'Plantera'
  },
  {
    name: 'Dungeon',
    background: 'dungeon-bg.png',
    music: 'dungeon.mp3', 
    unlockRequirement: 'Defeat Eater of Worlds',
    boss: 'Skeletron'
  },
  {
    name: 'Underworld',
    background: 'underworld-bg.png',
    music: 'underworld.mp3',
    unlockRequirement: 'Defeat Skeletron', 
    boss: 'Wall of Flesh'
  }
]
```

#### **Required Stage Assets**
```
📦 Stage Background Assets:
├── forest-bg.png            # Green forest background
├── corruption-bg.png        # Purple corruption background  
├── jungle-bg.png            # Lush jungle background
├── dungeon-bg.png          # Stone dungeon background
├── underworld-bg.png        # Lava underworld background
├── hallow-bg.png            # Rainbow hallow background
├── snow-bg.png              # Snow biome background
├── desert-bg.png            # Desert background
└── transition-effects/      # Stage change animations
    ├── portal-effect.gif
    ├── screen-transition.png
    └── stage-unlock.png
```

---

## 🎰 **Advanced Gambling Mechanics**

### **1. Goblin Tinker Shop**

#### **Reforge System**
```javascript
const reforgeSystem = {
  cost: '1000 coins per reforge',
  possibleModifiers: [
    { name: 'Godly', bonus: '+15% damage', weight: 5 },
    { name: 'Legendary', bonus: '+12% damage +5% crit', weight: 10 },
    { name: 'Unreal', bonus: '+10% damage +10% crit', weight: 15 },
    { name: 'Warding', bonus: '+20 defense', weight: 20 },
    { name: 'Menacing', bonus: '+8% damage', weight: 25 },
    { name: 'Broken', bonus: '-10% damage', weight: 25 }
  ]
}
```

#### **Required Tinker Shop Assets**
```
📦 Goblin Tinker Assets:
├── goblin-tinkerer.png      # NPC sprite
├── tinker-shop.png          # Shop background
├── reforge-anvil.gif        # Reforge animation
├── reforge-particles.png    # Magic effects
├── modifier-icons/          # Modifier icons
│   ├── godly-icon.png
│   ├── legendary-icon.png
│   ├── unreal-icon.png
│   ├── warding-icon.png
│   ├── menacing-icon.png
│   └── broken-icon.png
└── reforge-results/         # Result animations
    ├── success-reforge.gif
    ├── fail-reforge.gif
    └── rare-reforge.gif
```

---

### **2. Daily Lucky Draws**

#### **Prize Wheel System**
```javascript
const prizeWheel = {
  spins: '1 free spin per day',
  segments: [
    { reward: '1000 coins', weight: 30, color: '#8B4513' },
    { reward: '5000 coins', weight: 20, color: '#C0C0C0' },
    { reward: 'Rare chest', weight: 15, color: '#4169E1' },
    { reward: 'Epic chest', weight: 10, color: '#9370DB' },
    { reward: 'Free upgrade', weight: 10, color: '#32CD32' },
    { reward: '2x rewards (1hr)', weight: 8, color: '#FFD700' },
    { reward: 'Prestige token', weight: 5, color: '#FF6347' },
    { reward: 'Jackpot 50000', weight: 2, color: '#FF1493' }
  ]
}
```

#### **Required Prize Wheel Assets**
```
📦 Prize Wheel Assets:
├── prize-wheel.png          # Wheel base
├── wheel-pointer.png        # Pointer arrow
├── wheel-spin.gif           # Spinning animation
├── prize-segments/          # Colored segments
│   ├── bronze-segment.png
│   ├── silver-segment.png
│   ├── gold-segment.png
│   ├── diamond-segment.png
│   └── jackpot-segment.png
├── daily-bonus.png          # Daily bonus icon
├── spin-button.png          # Spin button
└── reward-popup.png         # Reward display
```

---

### **3. Slot Machine Mini-game**

#### **Slot Mechanics**
```javascript
const slotMachine = {
  cost: 1000,
  symbols: [
    { name: 'Coin', value: 1x, weight: 30 },
    { name: 'Sword', value: 2x, weight: 25 },
    { name: 'Heart', value: 3x, weight: 20 },
    { name: 'Star', value: 5x, weight: 15 },
    { name: 'Diamond', value: 10x, weight: 8 },
    { name: 'Jackpot', value: 100x, weight: 2 }
  ],
  payouts: {
    three: 'Match 3 symbols = value × 3',
    two: 'Match 2 symbols = value × 1',
    special: 'Special combinations = bonus rewards'
  }
}
```

#### **Required Slot Machine Assets**
```
📦 Slot Machine Assets:
├── slot-machine.png         # Machine frame
├── slot-reels.gif          # Spinning reels animation
├── slot-symbols/           # Symbol sprites
│   ├── coin-symbol.png
│   ├── sword-symbol.png
│   ├── heart-symbol.png
│   ├── star-symbol.png
│   ├── diamond-symbol.png
│   └── jackpot-symbol.png
├── lever-pull.gif          # Lever animation
├── win-effects/            # Winning animations
│   ├── coins-shower.gif
│   ├── jackpot-lights.gif
│   └── celebration.gif
└── slot-ui.png             # Betting interface
```

---

## 🏰 **Guild System**

### **1. Guild Hall Construction**

#### **Guild Features**
```javascript
const guildSystem = {
  maxMembers: 50,
  hallLevels: [
    { level: 1, cost: 10000, bonus: '+5% member stats' },
    { level: 2, cost: 50000, bonus: '+10% member stats + raid access' },
    { level: 3, cost: 250000, bonus: '+15% member stats + guild shop' }
  ],
  raids: {
    frequency: 'Daily guild boss raids',
    participation: 'All members contribute damage',
    rewards: 'Shared loot based on contribution'
  }
}
```

#### **Required Guild Assets**
```
📦 Guild System Assets:
├── guild-hall.png           # Guild hall background
├── guild-hall-levels/      # Progressive hall upgrades
│   ├── hall-level-1.png
│   ├── hall-level-2.png
│   └── hall-level-3.png
├── guild-banner.png         # Guild emblem/banner
├── guild-members.png        # Member list interface
├── raid-boss.png            # Guild raid boss
├── raid-damage-meter.png    # Damage contribution display
├── guild-rewards.png        # Reward distribution
└── guild-chat.png           # Chat interface
```

---

## 🎪 **Event System**

### **1. Blood Moon Events**

#### **Blood Moon Mechanics**
```javascript
const bloodMoon = {
  frequency: 'Random nights (10% chance)',
  duration: 'Full game night (10 minutes)',
  effects: {
    enemySpawnRate: 2.0,
    coinRewards: 3.0,
    rareDrops: 5.0,
    chestSpawnRate: 2.0
  },
  visualEffects: 'Red sky tint, special lighting'
}
```

#### **Required Event Assets**
```
📦 Blood Moon Assets:
├── blood-moon-sky.png      # Red sky overlay
├── blood-moon-icon.png      # Event indicator
├── blood-moon-enemies/      # Special enemy sprites
│   ├── zombie-blood.png
│   ├── demon-eye-blood.png
│   └── corrupted-slime.png
├── blood-effects/          # Blood visual effects
│   ├── blood-splash.png
│   ├── red-glow.png
│   └── blood-particles.png
└── event-timer.png          # Event countdown
```

---

### **2. Pirate Invasions**

#### **Invasion Mechanics**
```javascript
const pirateInvasion = {
  trigger: 'Pirate Map item use',
  waves: 8,
  difficulty: 'Scales with player progress',
  rewards: [
    'Pirate-themed weapons',
    'Gold coins bonus',
    'Rare treasure maps',
    'Exclusive cosmetics'
  ]
}
```

#### **Required Invasion Assets**
```
📦 Pirate Invasion Assets:
├── pirate-ship.png          # Invasion background
├── pirate-enemies/          # Pirate enemy sprites
│   ├── pirate-captain.png
│   ├── pirate-deckhand.png
│   ├── parrot-companion.png
│   └── pirate-cannon.png
├── invasion-waves.png       # Wave indicator
├── pirate-treasure.png      # Treasure chest rewards
├── pirate-map.png           # Trigger item
└── invasion-victory.png     # Success animation
```

---

## 🎯 **Enhanced Progression Systems**

### **1. Skill Tree System**

#### **Skill Trees**
```javascript
const skillTrees = {
  warrior: {
    focus: 'Click damage and criticals',
    skills: [
      'Blade Master (+10% click damage)',
      'Critical Strike (+5% crit chance)', 
      'Weapon Expertise (+15% sword damage)',
      'Berserker Rage (+25% damage during raids)'
    ]
  },
  summoner: {
    focus: 'Better summons and CPS',
    skills: [
      'Minion Master (+20% summon damage)',
      'Army Size (+1 max summon)',
      'Summoning Speed (-50% summon cost)',
      'Legendary Minions (+50% summon CPS)'
    ]
  },
  lucky: {
    focus: 'Improved gambling and chest rewards',
    skills: [
      'Lucky Charm (+10% better chest rarity)',
      'Fortune Finder (+25% coin drops)',
      'Gambler's Luck (+15% gambling wins)',
      'Jackpot Hunter (+5% jackpot chance)'
    ]
  }
}
```

#### **Required Skill Tree Assets**
```
📦 Skill Tree Assets:
├── skill-tree-background.png # Tree background
├── skill-nodes/             # Skill node sprites
│   ├── active-node.png
│   ├── learned-node.png
│   ├── locked-node.png
│   └── available-node.png
├── skill-lines.png          # Connection lines
├── skill-icons/             # Individual skill icons
│   ├── blade-master.png
│   ├── critical-strike.png
│   ├── minion-master.png
│   ├── lucky-charm.png
│   └── [all skill icons]
├── skill-points.png         # Points display
└── respec-button.png         # Respecification
```

---

### **2. Equipment System**

#### **Equipment Slots**
```javascript
const equipmentSlots = {
  weapon: 'Primary damage dealer',
  accessory: 'Stat bonuses and effects',
  armor: 'Defense and set bonuses',
  pet: 'Passive bonuses and companions'
}
```

#### **Required Equipment Assets**
```
📦 Equipment System Assets:
├── equipment-slots.png      # Inventory interface
├── weapon-icons/             # Weapon sprites
│   ├── copper-sword.png
│   ├── iron-sword.png
│   ├── gold-sword.png
│   ├── demonite-sword.png
│   └── [all weapon tiers]
├── armor-sets/              # Armor piece sprites
│   ├── wood-armor.png
│   ├── iron-armor.png
│   ├── gold-armor.png
│   ├── shadow-armor.png
│   └── [all armor sets]
├── accessories/             # Accessory sprites
│   ├── cloud-bottle.png
│   ├── hermes-boots.png
│   ├── lucky-horseshoe.png
│   └── [all accessories]
├── set-bonus-effects.png    # Set bonus indicators
└── equipment-stats.png      # Stat display
```

---

## 🎲 **RNG Mechanics**

### **1. Critical Hit System**

#### **Critical Mechanics**
```javascript
const criticalSystem = {
  baseChance: 0.05, // 5%
  clickUpgrades: 0.005, // +0.5% per tier
  swordUpgrades: 0.01,  // +1% per level
  maxChance: 0.75,      // 75% max
  multiplier: 2.0,      // 2x damage on crit
  visualEffect: 'Damage popup with special color'
}
```

#### **Required Critical Hit Assets**
```
📦 Critical Hit Assets:
├── critical-popup.png      # Damage number sprite
├── critical-effect.gif     # Screen flash effect
├── critical-sound.mp3      # Critical hit sound
├── streak-counter.png      # Streak display
├── streak-effects/         # Streak milestone effects
│   ├── 5-streak.png
│   ├── 10-streak.png
│   ├── 25-streak.png
│   └── 50-streak.png
└── critical-bar.png        # Critical chance indicator
```

---

### **2. Random Events**

#### **Event Types**
```javascript
const randomEvents = [
  {
    name: 'Merchant Visit',
    chance: 0.05,
    effect: '20% shop discount for 5 minutes',
    icon: 'merchant-event.png'
  },
  {
    name: 'Lucky Find', 
    chance: 0.03,
    effect: 'Instant 1000 coins',
    icon: 'coins-event.png'
  },
  {
    name: 'Equipment Drop',
    chance: 0.02, 
    effect: 'Free random upgrade',
    icon: 'equipment-event.png'
  },
  {
    name: 'Skill Boost',
    chance: 0.01,
    effect: '2x XP for 10 minutes', 
    icon: 'skill-event.png'
  }
]
```

#### **Required Event Assets**
```
📦 Random Event Assets:
├── event-popup.png          # Event notification
├── event-icons/             # Event type icons
│   ├── merchant-event.png
│   ├── coins-event.png
│   ├── equipment-event.png
│   └── skill-event.png
├── event-effects/          # Event visual effects
│   ├── merchant-discount.png
│   ├── coins-shower.gif
│   ├── equipment-glow.png
│   └── skill-boost.png
├── event-timer.png         # Event duration display
└── event-sounds/           # Event audio cues
    ├── merchant-visit.mp3
    ├── lucky-find.mp3
    ├── equipment-drop.mp3
    └── skill-boost.mp3
```

---

## 🎮 **UI/UX Enhancements**

### **1. Enhanced Game Interface**

#### **New UI Components**
```javascript
const newUIComponents = {
  bossHealthBar: 'Large health bar for boss battles',
  eventNotifications: 'Pop-up notifications for events',
  skillTreeInterface: 'Interactive skill tree display',
  guildPanel: 'Guild management interface',
  equipmentInventory: 'Equipment management system',
  luckyChestAnimations: 'Chest spawn and opening effects'
}
```

#### **Required UI Assets**
```
📦 Enhanced UI Assets:
├── enhanced-health-bars.png # Boss and player health
├── event-notification.png   # Event popup template
├── skill-tree-ui.png        # Skill tree interface
├── guild-panel.png          # Guild management
├── equipment-grid.png       # Equipment inventory
├── chest-spawn-effect.gif   # Chest appearance animation
├── level-up-effect.gif      # Level up celebration
├── achievement-unlock.gif   # Achievement unlock animation
├── prestige-effect.gif      # Prestige transformation
└── loading-screens/         # Stage loading screens
    ├── forest-loading.png
    ├── corruption-loading.png
    ├── dungeon-loading.png
    └── underworld-loading.png
```

---

## 📊 **Asset Summary & Sourcing**

### **Primary Asset Sources**
1. **Terraria Wiki**: Official game sprites and textures
2. **Terraria Community**: Custom fan-made assets
3. **Original Creation**: New assets matching Terraria style

### **Asset Categories to Source**
```
🎨 Terraria Assets to Acquire:
├── Boss Sprites (10+ bosses)
├── NPC Characters (15+ NPCs)  
├── Weapon Sprites (50+ weapons)
├── Armor Sets (10+ complete sets)
├── Accessory Items (30+ accessories)
├── Background Environments (8+ biomes)
├── Enemy Sprites (50+ enemy types)
├── Item Icons (100+ item types)
├── UI Elements (custom Terraria-style)
└── Effect Particles (magic, combat, etc.)
```

### **Asset Requirements**
- **Format**: PNG with transparent backgrounds
- **Style**: Consistent pixel art (16x16 to 64x64)
- **Animations**: GIF for animated elements
- **Resolution**: Scalable vector for UI elements
- **Compression**: Optimized for web delivery

---

## 🚀 **Implementation Roadmap**

### **Phase 1: Foundation (Weeks 1-2)**
- Lucky chest system implementation
- Basic boss battle framework
- Critical hit mechanics
- Enhanced UI components

### **Phase 2: Content (Weeks 3-4)**  
- Hero companion system
- Stage progression
- Equipment system
- Skill tree framework

### **Phase 3: Social (Weeks 5-6)**
- Guild system implementation
- Event system
- Advanced gambling features
- Leaderboard enhancements

### **Phase 4: Polish (Weeks 7-8)**
- Asset integration and optimization
- Sound effects and music
- Performance optimization
- Testing and balancing

---

## 📋 **Development Checklist**

### **Asset Acquisition**
- [ ] Scrape Terraria Wiki for official sprites
- [ ] Source community-made assets
- [ ] Create custom UI elements
- [ ] Optimize all assets for web use
- [ ] Organize asset library with naming conventions

### **Technical Implementation**
- [ ] Implement RNG systems and probability calculations
- [ ] Create boss battle mechanics and AI
- [ ] Develop guild system architecture
- [ ] Build event scheduling system
- [ ] Integrate all new UI components

### **Game Balance**
- [ ] Balance progression curves
- [ ] Tune RNG probabilities  
- [ ] Adjust reward scaling
- [ ] Test end-game content
- [ ] Validate monetization balance

This comprehensive feature set would transform Terraria Clicker into an engaging, progression-rich RPG experience with compelling luck mechanics that leverage the rich Terraria universe while maintaining the addictive core gameplay loop.
