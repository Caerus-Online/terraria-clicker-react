# Terraria Clicker - Asset Requirements & Sourcing Guide

## 🎯 **Overview**

This document provides a comprehensive list of all assets required for the proposed features, including sources, specifications, and organization guidelines for implementing the enhanced Terraria Clicker game.

---

## 📁 **Asset Organization Structure**

```
public/assets/
├── sprites/
│   ├── bosses/
│   ├── npcs/
│   ├── weapons/
│   ├── armor/
│   ├── accessories/
│   ├── enemies/
│   ├── items/
│   └── ui/
├── backgrounds/
│   ├── biomes/
│   ├── ui/
│   └── effects/
├── animations/
│   ├── combat/
│   ├── ui/
│   ├── effects/
│   └── characters/
├── audio/
│   ├── music/
│   ├── sfx/
│   └── ambient/
├── icons/
│   ├── skills/
│   ├── events/
│   ├── rewards/
│   └── ui/
└── fonts/
    ├── andy-bold.otf (existing)
    └── custom/
```

---

## 🎲 **Luck & Gambling Assets**

### **Lucky Chest System**
```
📦 chests/
├── common-chest.png          # 64x64px wooden chest
├── rare-chest.png            # 64x64px iron chest  
├── epic-chest.png             # 64x64px gold chest
├── legendary-chest.gif        # 64x64px animated shadow chest
├── chest-open.png             # 64x64px open chest state
├── chest-glow.png             # 64x64px glow overlay
├── chest-particles.png        # 32x32px particle sprite sheet
└── chest-spawn-effect.gif     # 128x128px spawn animation
```

**Source**: Create custom assets matching Terraria chest style  
**Wiki References**: [Terraria Chests](https://terraria.wiki.gg/wiki/Chests)

### **Loot Bags**
```
📦 loot-bags/
├── wooden-bag.png             # 32x32px brown paper bag
├── iron-bag.png               # 32x32px metal bag
├── gold-bag.png               # 32x32px golden bag with lock
├── shadow-bag.gif             # 32x32px animated shadow bag
├── bag-open.png               # 32x32px opening animation
├── bag-sparkle.png            # 16x16px sparkle effect
└── bag-reward-icons.png       # 16x16px reward type icons
```

**Source**: Custom creation based on Terraria bag styles  
**Wiki References**: [Terraria Goodie Bags](https://terraria.wiki.gg/wiki/Goodie_Bags)

### **Enchantment System**
```
📦 enchantments/
├── enchantment-table.png      # 64x64px crafting station
├── enchantment-glow.gif       # 64x64px enchanting animation
├── enchantment-icons/         # 32x32px enchantment icons
│   ├── critical-strike.png
│   ├── lucky-coins.png
│   ├── speed-demon.png
│   ├── treasure-hunter.png
│   ├── godly-modifier.png
│   ├── legendary-modifier.png
│   ├── unreal-modifier.png
│   └── warding-modifier.png
├── enchantment-particles.png  # 32x32px magic particle sheet
├── reroll-button.png          # 32x32px reforge button
└── enchantment-ui.png          # 256x256px enchantment interface
```

**Source**: Custom creation with Terraria magical theme  
**Wiki References**: [Terraria Reforge](https://terraria.wiki.gg/wiki/Reforge)

---

## ⚔️ **Boss Battle Assets**

### **Boss Sprites**
```
📦 bosses/
├── eye-of-cthulhu/
│   ├── eye-of-cthulhu.png         # 128x128px main sprite
│   ├── eye-of-cthulhu-hurt.png    # 128x128px damage state
│   ├── eye-of-cthulhu-phases.png  # 128x256px phase variations
│   └── eye-projectile.png         # 16x16px projectile
├── eater-of-worms/
│   ├── eater-head.png              # 64x64px worm head
│   ├── eater-body.png              # 32x32px body segment
│   ├── eater-tail.png              # 32x32px tail segment
│   └── eater-cursed-flame.png      # 16x16px projectile
├── skeletron/
│   ├── skeletron-head.png          # 128x128px skull head
│   ├── skeletron-hands.png         # 64x64px floating hands
│   ├── skeletron-vulnerable.png    # 128x128px vulnerable state
│   └── bone-projectile.png         # 16x16px bone projectile
├── wall-of-flesh/
│   ├── wall-of-flesh.png           # 256x128px wall sprite
│   ├── wall-mouth.png              # 32x32px mouth animation
│   ├── wall-eyes.png               # 16x16px eye sprites
│   ├── leech.png                   # 32x32px leech minion
│   └── flesh-block.png             # 16x16px flesh blocks
├── plantera/
│   ├── plantera.png                # 128x128px plant boss
│   ├── plantera-tentacles.png      # 32x32px tentacle sprites
│   ├── plantera-seeds.png          # 16x16px seed projectiles
│   ├── plantera-hooks.png          # 16x16px hook projectiles
│   └── plantera-phase2.png         # 128x128px enraged state
└── boss-health/
    ├── health-bar-container.png    # 256x32px health bar frame
    ├── health-bar-fill.png         # 240x24px health fill
    ├── boss-name-plate.png         # 128x32px name display
    └── damage-numbers.png          # 16x16px damage number sprites
```

**Source**: Terraria Wiki official boss sprites  
**Wiki References**: 
- [Eye of Cthulhu](https://terraria.wiki.gg/wiki/Eye_of_Cthulhu)
- [Eater of Worlds](https://terraria.wiki.gg/wiki/Eater_of_Worms)
- [Skeletron](https://terraria.wiki.gg/wiki/Skeletron)
- [Wall of Flesh](https://terraria.wiki.gg/wiki/Wall_of_Flesh)
- [Plantera](https://terraria.wiki.gg/wiki/Plantera)

### **Boss Battle UI**
```
📦 boss-ui/
├── boss-health-bar.png          # 256x32px animated health bar
├── boss-timer.png                # 64x16px battle timer
├── damage-popup.png              # 32x16px damage popup
├── critical-hit-popup.png        # 32x16px critical damage
├── boss-victory.png              # 128x64px victory screen
├── boss-reward-popup.png         # 256x128px reward display
├── battle-effects.png            # 64x64px effect sprites
└── boss-attack-indicators.png    # 32x32px attack warnings
```

**Source**: Custom UI assets matching Terraria style

---

## 🧑‍🤝‍🧑 **Hero/NPC System Assets**

### **Terraria NPC Heroes**
```
📦 npcs/heroes/
├── guide/
│   ├── guide-npc.png             # 32x48px guide sprite
│   ├── guide-portrait.png        # 64x64px portrait
│   ├── guide-idle.gif            # 32x48px idle animation
│   └── guide-advice.png          # 16x16px advice bubble
├── nurse/
│   ├── nurse-npc.png             # 32x48px nurse sprite
│   ├── nurse-portrait.png        # 64x64px portrait
│   ├── nurse-heal.gif            # 32x48px healing animation
│   └── heal-effect.png           # 32x32px heal effect
├── arms-dealer/
│   ├── arms-dealer-npc.png       # 32x48px arms dealer
│   ├── arms-dealer-portrait.png  # 64x64px portrait
│   ├── arms-dealer-shoot.gif     # 32x48px shooting animation
│   └── bullet-icon.png           # 8x8px bullet sprite
├── merchant/
│   ├── merchant-npc.png          # 32x48px merchant sprite
│   ├── merchant-portrait.png     # 64x64px portrait
│   ├── merchant-trade.gif        # 32x48px trading animation
│   └── coin-bag.png              # 16x16px coin bag
├── demolitionist/
│   ├── demolitionist-npc.png     # 32x48px demolitionist
│   ├── demolitionist-portrait.png # 64x64px portrait
│   ├── demolitionist-explode.gif  # 32x48px explosion animation
│   └── bomb-icon.png             # 16x16px bomb sprite
└── hero-effects/
    ├── stat-boost.png            # 16x16px stat boost icon
    ├── aura-effect.png           # 32x32px hero aura
    ├── level-up-effect.gif       # 64x64px level up animation
    └── hero-activation.png       # 32x32px activation effect
```

**Source**: Terraria Wiki official NPC sprites  
**Wiki References**: [Terraria NPCs](https://terraria.wiki.gg/wiki/NPCs)

---

## 🌍 **Stage/Environment Assets**

### **Biome Backgrounds**
```
📦 backgrounds/biomes/
├── forest/
│   ├── forest-day.png            # 1024x768px day background
│   ├── forest-night.png          # 1024x768px night background
│   ├── forest-trees.png          # 256x256px tree overlays
│   └── forest-grass.png          # 128x128px grass texture
├── corruption/
│   ├── corruption-bg.png         # 1024x768px corruption background
│   ├── corruption-chasm.png       # 256x256px chasm overlay
│   ├── corruption-thorns.png     # 128x128px thorn textures
│   └── corruption-particles.png   # 32x32px particle sheet
├── jungle/
│   ├── jungle-bg.png             # 1024x768px jungle background
│   ├── jungle-vines.png          # 256x256px vine overlays
│   ├── jungle-plants.png         # 128x128px plant textures
│   └── jungle-waterfall.png      # 256x128px waterfall effect
├── dungeon/
│   ├── dungeon-bg.png            # 1024x768px dungeon background
│   ├── dungeon-walls.png         # 256x256px wall textures
│   ├── dungeon-floors.png         # 128x128px floor textures
│   └── dungeon-torches.png       # 32x32px torch sprites
├── underworld/
│   ├── underworld-bg.png          # 1024x768px underworld background
│   ├── underworld-lava.png       # 256x256px lava texture
│   ├── underworld-ash.png        # 128x128px ash texture
│   └── underworld-fire.png       # 32x32px fire sprites
├── hallow/
│   ├── hallow-bg.png             # 1024x768px hallow background
│   ├── hallow-rainbow.png        # 256x256px rainbow effect
│   ├── hallow-pearls.png         # 128x128px pearl textures
│   └── hallow-sparkles.png       # 32x32px sparkle particles
└── transitions/
    ├── portal-effect.gif         # 128x128px portal animation
    ├── screen-transition.png      # 1024x768px transition overlay
    ├── stage-unlock.png          # 256x128px unlock animation
    └── biome-change-effect.gif   # 256x256px biome transition
```

**Source**: Terraria Wiki official biome backgrounds  
**Wiki References**: [Terraria Biomes](https://terraria.wiki.gg/wiki/Biomes)

---

## 🎰 **Gambling & Mini-Game Assets**

### **Goblin Tinker Shop**
```
📦 gambling/tinker-shop/
├── goblin-tinkerer.png           # 32x48px goblin NPC
├── tinker-shop.png              # 256x256px shop background
├── reforge-anvil.gif            # 64x64px reforge animation
├── reforge-particles.png        # 32x32px magic particle sheet
├── modifier-icons/              # 32x32px modifier icons
│   ├── godly-modifier.png       # Gold with glow
│   ├── legendary-modifier.png   # Purple with stars
│   ├── unreal-modifier.png      # Rainbow effect
│   ├── warding-modifier.png     # Blue shield
│   ├── menacing-modifier.png    # Red angry face
│   ├── broken-modifier.png      # Gray cracked
│   ├── demonic-modifier.png     # Red demon
│   └── mythic-modifier.png      # Gold crown
├── reforge-results/             # 64x64px result animations
│   ├── success-reforge.gif      # Sparkle effect
│   ├── fail-reforge.gif          # Broken effect
│   └── rare-reforge.gif          # Rainbow effect
└── tinker-ui.png                # 256x256px interface background
```

**Source**: Custom creation with Terraria goblin theme  
**Wiki References**: [Goblin Tinkerer](https://terraria.wiki.gg/wiki/Goblin_Tinkerer)

### **Prize Wheel**
```
📦 gambling/prize-wheel/
├── prize-wheel.png              # 256x256px wheel base
├── wheel-pointer.png            # 32x64px pointer arrow
├── wheel-spin.gif               # 256x256px spinning animation
├── prize-segments/              # Colored segment sprites
│   ├── bronze-segment.png       # Brown segment
│   ├── silver-segment.png       # Silver segment
│   ├── gold-segment.png         # Gold segment
│   ├── diamond-segment.png      # Blue segment
│   ├── emerald-segment.png      # Green segment
│   └── jackpot-segment.png      # Rainbow segment
├── daily-bonus.png              # 64x64px daily bonus icon
├── spin-button.png              # 64x32px spin button
├── wheel-glow.png               # 256x256px glow effect
└── reward-popup.png              # 256x128px reward display
```

**Source**: Custom casino-style wheel with Terraria theme

### **Slot Machine**
```
📦 gambling/slot-machine/
├── slot-machine.png             # 256x256px machine frame
├── slot-reels.gif               # 192x64px spinning reels
├── slot-symbols/                # 64x64px symbol sprites
│   ├── coin-symbol.png          # Gold coin
│   ├── sword-symbol.png         # Iron sword
│   ├── heart-symbol.png         # Red heart
│   ├── star-symbol.png          # Yellow star
│   ├── diamond-symbol.png       # Blue diamond
│   ├── chest-symbol.png         # Treasure chest
│   ├── skull-symbol.png         # Demon skull
│   └── jackpot-symbol.png        # Rainbow jackpot
├── lever-pull.gif               # 32x64px lever animation
├── win-effects/                 # 128x128px winning animations
│   ├── coins-shower.gif         # Coin rain effect
│   ├── jackpot-lights.gif       # Flashing lights
│   ├── celebration.gif           # Fireworks effect
│   └── big-win.png              # Big win banner
└── slot-ui.png                  # 256x256px betting interface
```

**Source**: Custom slot machine with Terraria symbols

---

## 🏰 **Guild System Assets**

### **Guild Hall & Features**
```
📦 guild/
├── guild-hall/
│   ├── guild-hall-level-1.png   # 256x256px basic hall
│   ├── guild-hall-level-2.png   # 256x256px upgraded hall
│   ├── guild-hall-level-3.png   # 256x256px max hall
│   ├── guild-banner.png          # 128x64px guild emblem
│   ├── guild-throne.png          # 64x64px leader's throne
│   └── guild-decorations.png     # 128x128px decoration sprites
├── guild-ui/
│   ├── guild-panel.png          # 256x256px management interface
│   ├── guild-members.png         # 256x256px member list
│   ├── guild-chat.png            # 256x256px chat interface
│   ├── guild-shop.png            # 256x256px guild shop
│   └── guild-settings.png        # 256x256px settings panel
├── guild-raids/
│   ├── raid-boss.png             # 128x128px raid boss sprite
│   ├── raid-background.png        # 256x256px raid arena
│   ├── raid-damage-meter.png     # 256x32px damage meter
│   ├── raid-timer.png            # 64x16px raid timer
│   ├── raid-rewards.png          # 128x128px reward chest
│   └── raid-effects.png          # 64x64px raid effects
└── guild-social/
    ├── guild-emblem.png          # 64x64px guild emblem
    ├── member-online.png         # 16x16px online indicator
    ├── member-offline.png        # 16x16px offline indicator
    ├── guild-rank-icons.png      # 16x16px rank icons
    └── guild-chat-bubble.png     # 64x32px chat bubble
```

**Source**: Custom creation with Terraria architectural theme

---

## 🎪 **Event System Assets**

### **Blood Moon Event**
```
📦 events/blood-moon/
├── blood-moon-sky.png           # 1024x768px red sky overlay
├── blood-moon-icon.png          # 32x32px event indicator
├── blood-moon-enemies/          # Enhanced enemy sprites
│   ├── zombie-blood.png         # 32x48px red zombie
│   ├── demon-eye-blood.png      # 32x32px red demon eye
│   ├── corrupted-slime.png      # 32x32px purple slime
│   └── blood-walker.png         # 32x48px blood zombie
├── blood-effects/               # Visual effect sprites
│   ├── blood-splash.png         # 32x32px splash effect
│   ├── red-glow.png             # 64x64px red glow
│   ├── blood-particles.png      # 16x16px particle sheet
│   └── blood-moon-rays.png      # 256x256px moon rays
├── event-timer.png              # 64x16px countdown timer
└── blood-moon-ui.png            # 256x64px event interface
```

**Source**: Custom creation with Terraria blood moon theme  
**Wiki References**: [Blood Moon](https://terraria.wiki.gg/wiki/Blood_Moon)

### **Pirate Invasion**
```
📦 events/pirate-invasion/
├── pirate-ship.png              # 256x256px invasion background
├── pirate-enemies/              # Pirate enemy sprites
│   ├── pirate-captain.png       # 32x48px captain
│   ├── pirate-deckhand.png      # 32x48px deckhand
│   ├── pirate-parrot.png        # 32x32px parrot
│   ├── pirate-cannon.png        # 64x32px cannon
│   └── pirate-crossbower.png     # 32x48px crossbower
├── invasion-elements/           # Invasion props
│   ├── pirate-ship-bg.png       # 512x256px ship background
│   ├── pirate-flag.png          # 64x32px pirate flag
│   ├── pirate-treasure.png      # 32x32px treasure chest
│   └── pirate-map.png           # 64x32px treasure map
├── invasion-ui/
│   ├── invasion-waves.png       # 256x64px wave indicator
│   ├── invasion-progress.png     # 256x32px progress bar
│   ├── invasion-rewards.png      # 256x128px reward display
│   └── invasion-victory.png     # 256x128px victory screen
└── invasion-effects/
    ├── cannon-ball.png          # 16x16px projectile
    ├── explosion-effect.png     # 32x32px explosion
    ├── water-splash.png         # 32x32px water effect
    └── pirate-cheer.png         # 32x32px celebration
```

**Source**: Custom creation with Terraria pirate theme  
**Wiki References**: [Pirate Invasion](https://terraria.wiki.gg/wiki/Pirate_Invasion)

---

## 🎯 **Progression System Assets**

### **Skill Tree System**
```
📦 progression/skill-tree/
├── skill-tree-background.png    # 512x512px tree background
├── skill-nodes/                 # 32x32px node sprites
│   ├── active-node.png          # Available to learn
│   ├── learned-node.png         # Already learned
│   ├── locked-node.png          # Not yet available
│   ├── maxed-node.png           # Fully upgraded
│   └── prerequisite-node.png    # Required node
├── skill-lines.png               # 512x512px connection lines
├── skill-icons/                  # 32x32px individual skill icons
│   ├── blade-master.png         # Sword icon
│   ├── critical-strike.png      # Critical hit icon
│   ├── minion-master.png        # Minion icon
│   ├── lucky-charm.png          # Four-leaf clover
│   ├── fortification.png        # Shield icon
│   ├── speed-demon.png          # Lightning bolt
│   ├── treasure-hunter.png      # Treasure map
│   ├── berserker-rage.png      # Angry face
│   ├── army-size.png            # Group icon
│   └── jackpot-hunter.png       # Diamond icon
├── skill-effects/                # 64x64px skill activation effects
│   ├── learn-skill.gif          # Learning animation
│   ├── skill-glow.png           # Active skill glow
│   ├── skill-particles.png      # Particle effects
│   └── skill-complete.png       # Completion effect
└── skill-ui-elements/
    ├── skill-points.png         # 32x32px points display
    ├── respec-button.png        # 64x32px respec button
    ├── skill-tree-tabs.png      # 256x64px tree selection
    └── skill-description.png    # 256x128px description panel
```

**Source**: Custom creation with RPG tree interface

### **Equipment System**
```
📦 progression/equipment/
├── equipment-slots.png           # 256x256px inventory grid
├── weapon-icons/                 # 64x64px weapon sprites
│   ├── copper-sword.png         # Basic copper sword
│   ├── iron-sword.png           # Iron sword
│   ├── gold-sword.png           # Gold sword
│   ├── demonite-sword.png       # Demonite sword
│   ├── molten-sword.png         # Molten sword
│   ├── blade-of-grass.png       # Jungle sword
│   ├── muramasa.png             # Muramasa katana
│   ├── excalibur.png            # Excalibur
│   ├── terra-blade.png          # Terra blade
│   └── star-fury.png            # Star fury
├── armor-sets/                  # 32x32px armor piece sprites
│   ├── wood-armor/              # Wood armor set
│   │   ├── wood-helmet.png
│   │   ├── wood-chestplate.png
│   │   └── wood-greaves.png
│   ├── iron-armor/              # Iron armor set
│   │   ├── iron-helmet.png
│   │   ├── iron-chestplate.png
│   │   └── iron-greaves.png
│   ├── gold-armor/              # Gold armor set
│   │   ├── gold-helmet.png
│   │   ├── gold-chestplate.png
│   │   └── gold-greaves.png
│   ├── shadow-armor/            # Shadow armor set
│   │   ├── shadow-helmet.png
│   │   ├── shadow-chestplate.png
│   │   └── shadow-greaves.png
│   ├── molten-armor/            # Molten armor set
│   │   ├── molten-helmet.png
│   │   ├── molten-chestplate.png
│   │   └── molten-greaves.png
│   └── hallowed-armor/          # Hallowed armor set
│       ├── hallowed-helmet.png
│       ├── hallowed-chestplate.png
│       └── hallowed-greaves.png
├── accessories/                 # 32x32px accessory sprites
│   ├── cloud-bottle.png          # Cloud in a bottle
│   ├── hermes-boots.png         # Hermes boots
│   ├── lucky-horseshoe.png      # Lucky horseshoe
│   ├── shadow-flame-boots.png   # Shadow flame boots
│   ├── wings/                    # Wing accessories
│   │   ├── angel-wings.png
│   │   ├── demon-wings.png
│   │   ├── jetpack.png
│   │   └── butterfly-wings.png
│   ├── grappling-hook.png       # Grappling hook
│   ├── magic-mirror.png         # Magic mirror
│   └── cell-phone.png           # Cell phone
├── equipment-effects/            # 64x64px equipment effects
│   ├── set-bonus-glow.png       # Set bonus indicator
│   ├── equipment-rarity.png      # Rarity borders
│   ├── stat-bonus-icon.png      # Stat bonus display
│   └── equip-animation.gif      # Equipment animation
└── equipment-ui/
    ├── equipment-stats.png       # 256x128px stat display
    ├── set-bonus-panel.png      # 256x64px set bonus panel
    ├── compare-tooltip.png      # 256x256px comparison tooltip
    └── equipment-filter.png     # 64x32px filter buttons
```

**Source**: Terraria Wiki official equipment sprites  
**Wiki References**: [Terraria Weapons](https://terraria.wiki.gg/wiki/Weapons), [Terraria Armor](https://terraria.wiki.gg/wiki/Armor)

---

## 🎲 **RNG & Effect Assets**

### **Critical Hit System**
```
📦 rng/critical-hits/
├── critical-popup.png            # 32x16px damage number sprite
├── critical-effect.gif           # 256x256px screen flash
├── critical-sound.mp3            # Critical hit sound effect
├── streak-counter.png            # 64x16px streak display
├── streak-effects/              # 64x64px milestone effects
│   ├── 5-streak.png             # 5 hit streak effect
│   ├── 10-streak.png            # 10 hit streak effect
│   ├── 25-streak.png            # 25 hit streak effect
│   ├── 50-streak.png            # 50 hit streak effect
│   └── 100-streak.png           # 100 hit streak effect
├── critical-bar.png              # 256x32px critical chance bar
└── critical-particles.png        # 16x16px particle sheet
```

**Source**: Custom creation with impact effects

### **Random Events**
```
📦 rng/random-events/
├── event-popup.png               # 256x128px event notification
├── event-icons/                  # 32x32px event type icons
│   ├── merchant-visit.png       # Merchant visit icon
│   ├── lucky-find.png           # Lucky coins icon
│   ├── equipment-drop.png       # Equipment drop icon
│   ├── skill-boost.png          # Skill boost icon
│   ├── treasure-map.png         # Treasure map icon
│   └── mysterious-merchant.png   # Mysterious merchant icon
├── event-effects/                # 64x64px event visual effects
│   ├── merchant-discount.png    # Discount effect
│   ├── coins-shower.gif         # Coin rain effect
│   ├── equipment-glow.png       # Equipment glow effect
│   ├── skill-boost.png          # Skill boost effect
│   ├── treasure-appear.png      # Treasure appearance
│   └── mysterious-portal.gif    # Portal effect
├── event-timer.png               # 64x16px event duration display
└── event-sounds/                 # Audio files
    ├── merchant-visit.mp3       # Merchant arrival sound
    ├── lucky-find.mp3           # Lucky find sound
    ├── equipment-drop.mp3       # Equipment drop sound
    ├── skill-boost.mp3          # Skill boost sound
    └── mysterious-event.mp3     # Mysterious event sound
```

**Source**: Custom creation with magical effects

---

## 🎮 **Enhanced UI Assets**

### **Modern UI Components**
```
📦 ui/enhanced/
├── health-bars/                  # Health bar variations
│   ├── player-health.png        # 128x32px player health
│   ├── boss-health.png          # 256x32px boss health
│   ├── minion-health.png        # 64x16px minion health
│   └── health-bar-animations.gif # Health change animation
├── notifications/                # Notification system
│   ├── achievement-popup.png    # 256x64px achievement notification
│   ├── level-up-popup.png       # 256x64px level up notification
│   ├── event-notification.png   # 256x64px event notification
│   ├── guild-message.png        # 256x64px guild message
│   └── notification-stack.png   # 256x256px notification container
├── progress-bars/                # Progress tracking
│   ├── experience-bar.png       # 256x16px XP bar
│   ├── prestige-bar.png         # 256x16px prestige bar
│   ├── quest-progress.png        # 256x16px quest progress
│   └── raid-progress.png        # 256x16px raid progress
├── buttons/                      # Enhanced button styles
│   ├── primary-button.png        # 64x32px primary button
│   ├── secondary-button.png      # 64x32px secondary button
│   ├── danger-button.png         # 64x32px danger button
│   ├── success-button.png        # 64x32px success button
│   └── button-states.gif         # Button state animations
├── icons/                        # UI icon set
│   ├── navigation-icons.png      # 16x16px navigation icons
│   ├── social-icons.png          # 16x16px social icons
│   ├── status-icons.png          # 16x16px status icons
│   ├── action-icons.png          # 16x16px action icons
│   └── resource-icons.png        # 16x16px resource icons
└── panels/                       # UI panel backgrounds
    ├── main-panel.png            # 256x256px main panel
    ├── side-panel.png            # 128x256px side panel
    ├── modal-panel.png           # 512x256px modal panel
    └── tab-panel.png             # 256x128px tab panel
```

**Source**: Custom creation matching Terraria UI style

---

## 🎵 **Audio Assets**

### **Music & Sound Effects**
```
📦 audio/
├── music/                        # Background music tracks
│   ├── overworld-day.mp3         # Peaceful day music
│   ├── overworld-night.mp3       # Calm night music
│   ├── corruption.mp3            # Eerie corruption music
│   ├── jungle.mp3                # Lush jungle music
│   ├── dungeon.mp3               # Mysterious dungeon music
│   ├── underworld.mp3            # Intense underworld music
│   ├── hallow.mp3                # Magical hallow music
│   ├── boss-battle.mp3           # Epic boss battle music
│   ├── blood-moon.mp3            # Tense blood moon music
│   └── victory-theme.mp3         # Victory celebration music
├── sfx/                          # Sound effect files
│   ├── clicks/                   # Clicking sounds
│   │   ├── normal-click.mp3      # Standard click
│   │   ├── critical-click.mp3    # Critical hit click
│   │   └── multi-click.mp3       # Multi-click sound
│   ├── combat/                   # Combat sounds
│   │   ├── sword-swing.mp3       # Sword swing sound
│   │   ├── hit-enemy.mp3         # Enemy hit sound
│   │   ├── boss-roar.mp3         # Boss roar sound
│   │   └── victory-bell.mp3      # Victory bell sound
│   ├── ui/                       # User interface sounds
│   │   ├── button-click.mp3      # Button click sound
│   │   ├── level-up.mp3           # Level up sound
│   │   ├── achievement.mp3       # Achievement unlock sound
│   │   ├── error.mp3             # Error sound
│   │   └── notification.mp3       # Notification sound
│   ├── events/                   # Event sounds
│   │   ├── chest-open.mp3         # Chest opening sound
│   │   ├── lucky-find.mp3        # Lucky find sound
│   │   ├── merchant-appear.mp3   # Merchant arrival sound
│   │   └── blood-moon-start.mp3  # Blood moon start sound
│   └── ambient/                  # Ambient sounds
│       ├── forest-ambient.mp3    # Forest ambient
│       ├── cave-drips.mp3         # Cave dripping sounds
│       ├── wind.mp3              # Wind sounds
│       └── crickets.mp3          # Night cricket sounds
└── voice/                        # Voice clips (optional)
    ├── guide-quotes.mp3          # Guide voice lines
    ├── nurse-heal.mp3            # Nurse healing quote
    ├── merchant-trade.mp3        # Merchant trade quote
    └── boss-quotes.mp3           # Boss encounter quotes
```

**Source**: Terraria official soundtrack + custom SFX  
**Wiki References**: [Terraria Soundtrack](https://terraria.wiki.gg/wiki/Music)

---

## 📋 **Asset Sourcing Strategy**

### **Primary Sources**

#### **1. Terraria Wiki (Official Assets)**
- **URL**: https://terraria.wiki.gg/wiki
- **Content**: Official sprites, item icons, backgrounds
- **Quality**: High-quality, authentic game assets
- **License**: Fair use for fan projects
- **Priority**: Bosses, NPCs, weapons, armor, items

#### **2. Terraria Community Assets**
- **Sources**: Terraria forums, Discord, Reddit
- **Content**: Custom fan-made assets, modifications
- **Quality**: Variable, need quality control
- **License**: Varies by creator
- **Priority**: Custom UI elements, special effects

#### **3. Original Creation**
- **Tools**: Aseprite, Photoshop, GIMP
- **Style**: Match Terraria pixel art aesthetic
- **Specifications**: 16x16 to 64x64px, transparent PNG
- **Priority**: UI components, effects, custom features

### **Asset Acquisition Process**

#### **Step 1: Wiki Asset Extraction**
```bash
# Automated scraping script
python scrape_terraria_wiki.py --sprites --items --npcs --bosses
```

#### **Step 2: Asset Processing**
```bash
# Asset optimization
pngcrush -ow *.png                    # Optimize PNG files
convert -resize 64x64 sprite.png sprite_small.png  # Resize sprites
```

#### **Step 3: Quality Control**
- Verify transparency
- Check pixel alignment
- Ensure consistent style
- Validate file formats

#### **Step 4: Integration**
- Organize into proper folder structure
- Create asset manifest
- Implement loading system
- Test in game environment

---

## 🎯 **Implementation Priority**

### **Phase 1: Core Assets (Week 1)**
```
✅ Essential Assets:
├── Basic boss sprites (Eye of Cthulhu, Skeletron)
├── Core NPC heroes (Guide, Nurse, Merchant)
├── Primary biome backgrounds (Forest, Corruption)
├── Basic UI components (health bars, buttons)
├── Chest and loot bag sprites
└── Critical hit effects
```

### **Phase 2: Content Assets (Week 2)**
```
📦 Content Expansion:
├── All boss sprites and animations
├── Complete NPC hero set
├── All biome backgrounds
├── Weapon and armor sprites
├── Equipment system assets
└── Skill tree interface
```

### **Phase 3: Feature Assets (Week 3)**
```
🎰 Feature Implementation:
├── Gambling system assets (wheel, slots)
├── Guild system interface
├── Event system sprites
├── Enhanced UI components
├── Audio integration
└── Particle effects
```

### **Phase 4: Polish Assets (Week 4)**
```
✨ Polish and Optimization:
├── Advanced animations
├── Environmental effects
├── Voice clips (optional)
├── Performance optimization
├── Asset compression
└── Final quality control
```

---

## 📊 **Asset Summary Statistics**

### **Total Asset Requirements**
```
📈 Asset Counts:
├── Sprites: ~500 individual sprites
├── Animations: ~50 animated GIFs
├── Backgrounds: ~15 environment backgrounds
├── UI Elements: ~200 interface components
├── Audio Files: ~100 sound effects + music
├── Icons: ~100 various icons
└── Effects: ~75 particle and effect sprites
```

### **File Size Estimates**
```
💾 Storage Requirements:
├── Sprites: ~50MB (optimized PNGs)
├── Animations: ~20MB (GIFs)
├── Backgrounds: ~30MB (high-res PNGs)
├── Audio: ~40MB (MP3 files)
├── UI Assets: ~15MB (interface elements)
└── Total: ~155MB (compressed)
```

### **Development Timeline**
```
⏱️ Asset Development Schedule:
├── Week 1: Core asset acquisition (40 hours)
├── Week 2: Content asset creation (40 hours)
├── Week 3: Feature asset development (40 hours)
├── Week 4: Polish and optimization (20 hours)
└── Total: ~140 hours of asset work
```

---

## 🔧 **Technical Implementation**

### **Asset Loading System**
```javascript
// Asset manifest and loading
const assetManifest = {
  sprites: {
    bosses: ['eye-of-cthulhu', 'skeletron', 'wall-of-flesh'],
    npcs: ['guide', 'nurse', 'merchant', 'arms-dealer'],
    weapons: ['copper-sword', 'iron-sword', 'demonite-sword'],
    armor: ['wood-armor', 'iron-armor', 'shadow-armor']
  },
  backgrounds: {
    biomes: ['forest', 'corruption', 'jungle', 'dungeon'],
    ui: ['main-panel', 'modal-background', 'button-sprite']
  },
  audio: {
    music: ['overworld-day', 'corruption', 'boss-battle'],
    sfx: ['click', 'critical-hit', 'level-up', 'victory']
  }
};

// Preload critical assets
function preloadCriticalAssets() {
  return Promise.all([
    loadSprites(['guide', 'nurse', 'merchant']),
    loadBackgrounds(['forest', 'corruption']),
    loadAudio(['click', 'level-up'])
  ]);
}
```

### **Asset Optimization**
```javascript
// Asset compression and caching
const assetOptimizer = {
  compressSprites: (sprites) => {
    // Implement sprite sheet generation
    // Reduce file size while maintaining quality
  },
  generateAtlas: (relatedSprites) => {
    // Create texture atlases for efficient rendering
  },
  cacheAssets: (assets) => {
    // Implement client-side caching
    // Store frequently used assets in memory
  }
};
```

---

This comprehensive asset plan provides everything needed to implement the proposed Terraria Clicker enhancements, with clear sourcing strategies, organization guidelines, and implementation priorities.
