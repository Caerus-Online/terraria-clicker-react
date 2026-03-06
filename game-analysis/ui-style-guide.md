# Terraria Clicker - UI Style Guide

## 🎨 **Design Philosophy**

The Terraria Clicker UI combines retro gaming aesthetics with modern web design principles, creating an immersive dark-themed experience that feels both nostalgic and contemporary.

## 🎯 **Core Design Principles**

### **1. Dark Gaming Atmosphere**

- **Primary Theme**: Dark, immersive gaming environment
- **Purpose**: Reduce eye strain during extended play sessions
- **Feel**: Similar to modern gaming interfaces (Steam, Discord)

### **2. Retro Pixel Art Aesthetic**

- **Visual Style**: 8-bit pixel art sprites and animations
- **Typography**: Pixelated "Press Start 2P" font
- **Purpose**: Nostalgic appeal to retro gaming era

### **3. Modern Web Interactions**

- **Animations**: Smooth CSS transitions and hover effects
- **Feedback**: Immediate visual responses to user actions
- **Accessibility**: Clear visual hierarchy and contrast

## 🎨 **Color System**

### **Primary Palette**

```css
/* Dark Gaming Theme */
--game-primary: #1e1e2e /* Main backgrounds */ --game-secondary: #2a2a3e
  /* Panel/Modal backgrounds */ --game-accent: #3b3b53 /* Borders, dividers */
  --game-highlight: #7e6ee8 /* Interactive elements */ --game-text: #e2e2f5
  /* Primary text color */ /* Accent Colors */ --game-gold: #ffd700
  /* Coins, premium content */ --game-silver: #c0c0c0 /* Secondary highlights */
  --game-purple: #9b59b6 /* Prestige, special features */ --game-red: #e74c3c
  /* Errors, warnings */ --game-green: #27ae60 /* Success, positive feedback */;
```

### **Color Usage Guidelines**

- **Backgrounds**: Use primary/secondary for depth
- **Interactive Elements**: Highlight color for hover/active states
- **Text**: Game-text for readability, accent for emphasis
- **Premium Content**: Gold for coins, purple for prestige
- **Status Indicators**: Green (success), Red (error), Gold (warning)

## 📝 **Typography System**

### **Font Hierarchy**

```css
/* Primary Game Font */
font-family: "Andy-Bold", custom-font, cursive;

/* Fallback UI Font */
font-family: "Press Start 2P", cursive;
```

### **Typography Scale**

```css
/* Headings */
.text-2xl → 24px (Main titles)
.text-xl → 20px (Section headers)
.text-lg → 18px (Sub-headers)

/* Body Text */
.text-base → 18px (Primary content - default)
.text-sm → 16px (Secondary info)
.text-xs → 14px (Helper text, labels)
```

### **Typography Usage**

- **Game Elements**: Andy-Bold for authentic Terraria feel
- **UI Controls**: Press Start 2P for retro gaming aesthetic
- **Numbers/Stats**: Andy-Bold for consistency
- **Tooltips**: Press Start 2P for readability

## 🎪 **Component Design Patterns**

### **1. Modal/Panel Pattern**

```css
.modal-backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-panel {
  background: rgba(42, 42, 62, 0.9);
  border: 1px solid var(--game-accent);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(126, 110, 232, 0.5);
}
```

**Usage**: Shop, prestige, achievements, settings
**Features**: Backdrop blur, close button, responsive sizing

### **2. Button Pattern**

```css
.btn-primary {
  background: var(--game-highlight);
  color: white;
  border: none;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #9b7ee8;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(126, 110, 232, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(126, 110, 232, 0.3);
}
```

**Variants**: Primary (highlight), Secondary (accent), Success (green), Danger (red)

### **3. Card Pattern**

```css
.game-card {
  background: rgba(26, 26, 46, 0.8);
  border: 1px solid var(--game-accent);
  border-radius: 6px;
  padding: 16px;
  backdrop-filter: blur(2px);
}

.game-card:hover {
  border-color: var(--game-highlight);
  box-shadow: 0 0 15px rgba(126, 110, 232, 0.2);
}
```

**Usage**: Upgrade items, achievement cards, stat displays

### **4. Input Pattern**

```css
.game-input {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--game-accent);
  border-radius: 4px;
  color: var(--game-text);
  padding: 8px 12px;
  transition: border-color 0.2s ease;
}

.game-input:focus {
  outline: none;
  border-color: var(--game-highlight);
  box-shadow: 0 0 0 2px rgba(126, 110, 232, 0.2);
}
```

## 🎭 **Animation System**

### **Animation Library**

```css
/* Core Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes swing {
  0%,
  100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes click-rotate {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(0.95) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
```

### **Animation Guidelines**

- **Duration**: 0.2s (fast), 0.5s (normal), 1s+ (slow)
- **Easing**: ease-out for entrances, ease-in-out for loops
- **Purpose**: Enhance interaction, provide feedback
- **Performance**: Use CSS transforms and opacity

### **Animation Usage**

- **Hover Effects**: Scale, color transitions
- **Loading States**: Pulse, float animations
- **Click Feedback**: Scale, rotate transforms
- **Page Transitions**: Slide, fade effects

## 🖼️ **Visual Assets**

### **Image Style Guidelines**

- **Rendering**: `image-rendering: pixelated` for authentic pixel art
- **Format**: PNG for static, GIF for animated sprites
- **Sizing**: Consistent scale ratios (16x16, 32x32, 64x64)
- **Background**: Transparent backgrounds for layering

### **Asset Categories**

1. **Game Sprites**: Swords (sword1-12.png), Summons (summon1-10.png), Tiers (tier1-15.png)
2. **UI Icons**: Material Icons for navigation and actions
3. **Game Icons**: Custom pixel art (coin-icon.png, click-icon.png, cpsIcon.png, settings-icon.png)
4. **Background Images**: Terraria-themed backgrounds (terraria.png, background.png)
5. **Logo/Branding**: Game logo (logo.png), preview images (preview.png)
6. **Prestige Assets**: Prestige icons (prestige1-10.png), prestige currency (platnium.png)

### **Icon System**

- **Primary**: Material Icons (Google Fonts) for UI navigation elements
- **Game**: Custom pixel art icons for game-specific elements
- **Fallback**: Material Icons for missing custom assets
- **Sizing**: 16px, 24px, 32px standard sizes for Material Icons
- **Game Assets**: Various sizes (typically 32x32 to 64x64 pixels)

## 📱 **Responsive Design System**

### **Breakpoint Strategy**

```css
/* Mobile First Approach */
/* Default: 320px+ (mobile) */
@media (min-width: 768px) {
  /* Tablet */
}
@media (min-width: 1024px) {
  /* Desktop */
}
@media (min-width: 1280px) {
  /* Large Desktop */
}
```

### **Layout Adaptations**

- **Mobile**: Single column, stacked layouts
- **Tablet**: Two-column grids, side-by-side panels
- **Desktop**: Multi-column grids, floating panels
- **Large**: Maximum content width, centered layouts

### **Component Responsiveness**

- **Modals**: Full-screen (mobile) → Centered (desktop)
- **Navigation**: Bottom tabs (mobile) → Sidebar (desktop)
- **Grids**: 1 column → 2 columns → 3+ columns
- **Typography**: Scales up with viewport size

## 🎪 **Layout Patterns**

### **1. Main Game Layout**

```
┌─────────────────────────────────────┐
│            Logo Header              │
├─────────────────────────────────────┤
│                                     │
│         Main Click Area             │
│        (Sword + Stats)             │
│                                     │
├─────────────────────────────────────┤
│        Bottom Navigation            │
└─────────────────────────────────────┘
```

### **2. Modal Layout**

```
┌─────────────────────────────────────┐
│  Header [Title]        [Close]     │
├─────────────────────────────────────┤
│                                     │
│            Content Area              │
│         (Scrollable)                │
│                                     │
├─────────────────────────────────────┤
│          Action Buttons             │
└─────────────────────────────────────┘
```

### **3. Sidebar Navigation**

```
┌─────────┐
│  Profile │  ← Icon + Tooltip
│  Shop    │
│ Prestige │
│Achieves  │
│Leaderbrd │
│ Settings │
└─────────┘
```

## 🔧 **Technical Implementation**

### **CSS Architecture**

- **Framework**: Tailwind CSS with custom configuration
- **Custom Theme**: Extended color palette and fonts
- **Component Classes**: Reusable utility combinations
- **Responsive**: Mobile-first breakpoint system
- **Font Loading**: Andy-Bold.otf (local) + Press Start 2P (Google Fonts) + Material Icons

### **State Management**

- **Active States**: Hover, focus, active, disabled
- **Loading States**: Skeletons, spinners, progress bars
- **Error States**: Color-coded feedback, helpful messages
- **Success States**: Confirmation, positive reinforcement

### **Accessibility**

- **Contrast**: WCAG AA compliant color combinations
- **Focus**: Visible focus indicators for keyboard navigation
- **Screen Readers**: Semantic HTML, ARIA labels
- **Reduced Motion**: Respect user preferences

## 🎯 **Design Do's and Don'ts**

### **Do ✅**

- Use consistent spacing (4px, 8px, 16px, 24px, 32px)
- Maintain visual hierarchy with size and color
- Provide immediate feedback for all interactions
- Use pixelated rendering for game assets
- Keep animations subtle and purposeful
- Ensure text readability at all sizes

### **Don't ❌**

- Use bright, saturated colors for large areas
- Overwhelm with too many animations
- Break the pixel art aesthetic with smooth gradients
- Use system fonts for game elements (use Andy-Bold or Press Start 2P)
- Ignore mobile viewport constraints
- Create overly complex layouts

---

## 📋 **Implementation Checklist**

### **New Component Development**

- [ ] Use established color palette
- [ ] Apply correct typography hierarchy
- [ ] Include hover and active states
- [ ] Add responsive breakpoints
- [ ] Test with pixelated images
- [ ] Verify accessibility compliance
- [ ] Include loading/error states
- [ ] Add smooth animations

### **Style Consistency**

- [ ] Follow naming conventions
- [ ] Use utility classes consistently
- [ ] Maintain spacing rhythm
- [ ] Test across all breakpoints
- [ ] Verify color contrast ratios
- [ ] Check animation performance

---

This style guide serves as the foundation for maintaining visual consistency across the Terraria Clicker game while providing flexibility for future enhancements and feature additions.
