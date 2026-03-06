# Terraria Clicker - Current Game Features Analysis

## 🎮 **Game Overview**

Terraria Clicker is an incremental clicker game with RPG elements, inspired by Terraria. Players click to earn coins, purchase upgrades, and progress through prestige levels.

## 🏗️ **Core Game Mechanics**

### **Primary Gameplay Loop**
1. **Click the Sword** - Earn coins per click
2. **Purchase Upgrades** - Increase click power and auto-clickers (CPS)
3. **Progress Through Tiers** - Unlock new visual content
4. **Prestige System** - Reset for permanent bonuses
5. **Compete on Leaderboards** - Compare progress with other players

### **Key Metrics Tracked**
- **Click Power** - Coins earned per manual click
- **CPS (Coins Per Second)** - Auto-earn rate from summons
- **Total Coins** - Current coin balance
- **Prestige Level** - Number of prestige resets
- **Prestige Currency** - Special currency from prestiging
- **Achievements** - Completion tracking
- **Lifetime Stats** - Cumulative progress across prestiges

## 🛍️ **Upgrade System**

### **Tier Upgrades (15 Tiers)**
- **Purpose**: Increase base click power
- **Progression**: Linear cost scaling
- **Visual**: Changes sword appearance
- **Images**: tier1.png through tier15.png (animated GIFs for higher tiers)

### **Sword Upgrades (12 Swords)**
- **Purpose**: Provide click multipliers
- **Effect**: Multiplicative bonus to click power
- **Visual**: Changes sword sprite
- **Images**: sword1.png through sword12.png

### **Summon Upgrades (10 Summons)**
- **Purpose**: Generate passive CPS (auto-clickers)
- **Effect**: Each provides fixed CPS contribution
- **Visual**: Animated minions around the sword
- **Images**: summon1.png through summon10.png
- **Animation**: Floating/jolting animations on both sides of sword

## ⭐ **Prestige System**

### **Prestige Requirements**
- **Base Requirement**: 1,000 clicks
- **Currency**: Prestige tokens based on total clicks
- **Bonus**: 5% permanent bonus per prestige level

### **Prestige Artifacts**
5 types of permanent upgrades purchasable with prestige currency:

1. **CLICK_POWER** - +% click power
2. **CPS_BOOST** - +% CPS from summons  
3. **SWORD_BOOST** - +% sword multiplier
4. **COST_REDUCTION** - -% upgrade costs
5. **PRESTIGE_GAIN** - +% prestige currency earned

### **Artifact Scaling**
- **Cost**: Exponential scaling per level
- **Effect**: Linear scaling per level
- **Max Level**: No hard limit (practically limited by currency)

## 🏆 **Achievement System**

### **Achievement Categories**
1. **Click Power** - Reach click power milestones (100, 1K, 10K)
2. **Total Coins** - Accumulate coin milestones (1K, 100K, 1M)
3. **CPS** - Reach auto-clicker milestones (10, 100, 1K)
4. **Prestige** - Complete prestige milestones (1, 5, 10)
5. **Tier Progress** - Reach specific tiers (5, 10, 15)
6. **Sword Collection** - Own specific swords (3, 6, 9)
7. **Summon Collection** - Own specific summons (3, 5, 7)

### **Achievement Features**
- **Progress Tracking**: Shows current progress vs requirement
- **Visual Indicators**: Icons for each achievement type
- **Completion Status**: Earned/unearned states
- **Grid Layout**: 3-column responsive grid

## 🏅 **Leaderboard System**

### **Leaderboard Categories**
1. **Total Coins** - Primary competitive metric
2. **Prestige Level** - Progress indicator
3. **Achievements Earned** - Completion metric

### **Leaderboard Features**
- **Real-time Updates**: Manual refresh capability
- **User Highlighting**: Shows current player's rank
- **Global Rankings**: All players on same leaderboard
- **Tab Navigation**: Switch between categories
- **Auto-update**: Updates user's entry when viewing

## 👤 **Player Profile**

### **Profile Statistics**
- **Username**: Customizable player name
- **Join Date**: Account creation timestamp
- **Total Clicks**: Lifetime manual clicks
- **Total Coins**: Lifetime coins earned
- **Total Prestiges**: Number of prestige resets
- **Current Stats**: Current game state snapshot

### **Profile Features**
- **Authentication**: Email/password and Google sign-in
- **Username Management**: Change username with availability check
- **Settings**: Audio controls, logout functionality

## 🎨 **UI/UX Design System**

### **Color Palette**
```css
--game-primary: #1E1E2E     /* Dark background */
--game-secondary: #2A2A3E   /* Panel backgrounds */
--game-accent: #3B3B53      /* Borders and dividers */
--game-highlight: #7E6EE8   /* Interactive elements */
--game-text: #E2E2F5        /* Primary text */
--game-gold: #FFD700        /* Coins and highlights */
--game-silver: #C0C0C0      /* Secondary highlights */
```

### **Typography**
- **Primary Font**: "Press Start 2P" (retro pixel font)
- **Usage**: Headers, important stats, game text
- **Fallback**: System fonts for UI elements

### **Visual Style**
- **Theme**: Dark, game-like atmosphere
- **Imagery**: Pixelated sprites (8-bit style)
- **Animations**: Subtle hover effects, transitions
- **Layout**: Centered main game area with sidebar navigation

### **Component Patterns**
- **Modals**: Backdrop blur, centered panels, close buttons
- **Buttons**: Hover states, active states, icon + text combos
- **Cards**: Semi-transparent backgrounds with borders
- **Navigation**: Vertical sidebar with icon-based buttons

## 🎵 **Audio System**

### **Audio Features**
- **Background Music**: Toggle on/off
- **Sound Effects**: Click sounds, upgrade sounds
- **Volume Control**: Master volume slider
- **Persistence**: Audio preferences saved

## 📱 **Responsive Design**

### **Breakpoints**
- **Mobile**: Default (mobile-first)
- **Tablet**: md: breakpoint (768px+)
- **Desktop**: lg: breakpoint (1024px+)

### **Adaptations**
- **Sidebar**: Hidden on mobile, tooltips on desktop
- **Modals**: Full-screen on mobile, centered on desktop
- **Grids**: 1 column → 2 columns → 3 columns
- **Font Sizes**: Responsive scaling

## 🔧 **Technical Architecture**

### **Frontend Stack**
- **Framework**: React 18 with hooks
- **Styling**: Tailwind CSS with custom theme
- **State**: React Context + Firebase real-time
- **Build**: Vite for development and production

### **Backend Services**
- **Authentication**: Firebase Auth (email/password, Google)
- **Database**: Firestore (real-time NoSQL)
- **Storage**: Firebase Storage (for images)
- **Deployment**: Netlify (static hosting)

### **Data Structure**
- **Users**: Profile information, authentication
- **Game Progress**: Current game state, upgrades owned
- **Upgrades**: Individual upgrade levels and data
- **Achievements**: Completion status, progress tracking
- **Lifetime Stats**: Cumulative statistics across prestiges
- **Leaderboard**: Competitive rankings and scores

## 🎯 **Current Game Balance**

### **Progression Speed**
- **Early Game**: Fast progression, quick upgrades
- **Mid Game**: Moderate pace, strategic choices
- **Late Game**: Slow progression, prestige focus
- **Issue**: Currently too fast to complete all content

### **Economy Balance**
- **Click Power**: Primary early-game progression
- **CPS**: Mid-game automation focus
- **Prestige**: End-game progression system
- **Artifacts**: Long-term customization

### **Content Volume**
- **Tiers**: 15 levels (visual progression)
- **Swords**: 12 options (multiplier progression)
- **Summons**: 10 options (CPS progression)
- **Achievements**: 21 total (completion goals)
- **Artifacts**: 5 types × unlimited levels

## 🚀 **Performance Features**

### **Optimizations**
- **Image Rendering**: Pixelated style for performance
- **Lazy Loading**: Components load as needed
- **Real-time Updates**: Efficient Firebase listeners
- **Animation Performance**: CSS-based animations
- **Bundle Size**: Optimized with Vite

### **User Experience**
- **Fast Loading**: Optimized asset delivery
- **Smooth Animations**: 60fps interactions
- **Responsive Feedback**: Immediate visual feedback
- **Error Handling**: Graceful degradation
- **Offline Support**: Basic offline functionality

---

## 📋 **Summary**

The current Terraria Clicker game is a well-structured incremental clicker with:
- **Solid Core Mechanics**: Clicking, upgrades, prestige system
- **Good Visual Design**: Consistent pixel art theme
- **Comprehensive Features**: Achievements, leaderboards, profiles
- **Modern Tech Stack**: React, Firebase, Tailwind CSS
- **Responsive Design**: Works across devices
- **Issue**: Progression too fast, needs rebalancing for longer engagement

The foundation is strong for a rebuild with enhanced features and better game balance.
