# Terraria Clicker Roadmap

## Current State (As of 2024)
- Single page React application based on Cookie Clicker mechanics
- Core functionality implemented but contained in a single App.jsx file
- Basic clicking mechanics with sword upgrades
- Tier-based upgrade system
- Summon-based passive income system
- Basic prestige system (partially implemented)
- Basic mobile responsiveness
- Local storage save system

## Immediate Priorities

### 1. Code Refactoring (Q1 2024)
- [ ] Split App.jsx into logical components:
  - [ ] ClickerCore (sword clicking mechanism)
  - [ ] UpgradeShop (tier, sword, summon shops)
  - [ ] PrestigeSystem
  - [ ] AudioController
  - [ ] SaveSystem
  - [ ] UI Components (header, menus, etc.)
- [ ] Implement proper state management
  - [ ] Consider Redux or Context API
  - [ ] Separate game logic from UI components

### 2. UI Overhaul (Q1-Q2 2024)
- [ ] Implement new UI design based on ui.png
- [ ] Improve mobile responsiveness
- [ ] Add proper loading states
- [ ] Implement better visual feedback for actions
- [ ] Add animations for clicking and upgrades
- [ ] Improve accessibility

### 3. Prestige System Enhancement (Q2 2024)
- [ ] Complete prestige shop implementation
- [ ] Add prestige currency mechanics
- [ ] Implement prestige upgrades:
  - [ ] Click multipliers
  - [ ] Passive income boosters
  - [ ] Special abilities
  - [ ] Unique prestige-only features
- [ ] Add prestige milestones

### 4. Achievement System (Q2-Q3 2024)
- [ ] Design achievement system
- [ ] Implement achievement tracking
- [ ] Create achievement UI
- [ ] Add achievement rewards
- [ ] Include achievement statistics

### 5. Game Balance & Content (Q3 2024)
- [ ] Balance upgrade costs and progression
- [ ] Add more upgrade tiers
- [ ] Implement special events
- [ ] Add more Terraria-themed content
- [ ] Create endgame content

### 6. Quality of Life Improvements (Q3-Q4 2024)
- [ ] Add statistics tracking
- [ ] Implement better save management
- [ ] Add export/import save feature
- [ ] Improve performance optimization
- [ ] Add offline progress calculation

### 7. Polish & Additional Features (Q4 2024)
- [ ] Add sound effects for all actions
- [ ] Implement particle effects
- [ ] Add visual upgrade effects
- [ ] Create tutorial system
- [ ] Add social features (optional)

## Future Considerations
- Cloud save system
- Multiplayer features
- Mobile app version
- Additional game modes
- Seasonal events
- Localization support

## Technical Debt
- Current monolithic structure in App.jsx
- Lack of proper state management
- Limited error handling
- Incomplete type definitions
- Basic testing coverage

## Notes
- Priority order may adjust based on community feedback
- Timeline is tentative and subject to change
- Focus on maintaining game balance throughout updates
- Regular performance monitoring needed during implementation 