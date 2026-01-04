# ElyraOS Design Guidelines

## Design Approach
**Reference-Based**: Directly inspired by daisyOS.xyz with cyber-punk kawaii terminal aesthetic, adapted with brighter, more vibrant color palette dominated by pink and purple hues.

## Core Design Principles

### 1. Color System
**Primary Palette** (Bright & Vibrant):
- **Base**: Bright whites (#FFFFFF, #F8F9FA) for backgrounds
- **Pink Gradient**: Hot pink (#FF1B8D) to light pink (#FFB3D9)
- **Purple Gradient**: Electric purple (#9D4EDD) to lavender (#E0BBE4)
- **Accent Neon**: Cyan (#00F5FF), neon green (#39FF14), electric blue (#7DF9FF)
- **Contrast**: Deep purple-black (#1A0B2E) for text and terminals

**Gradient Applications**:
- Hero overlay: Pink-to-purple diagonal gradient with 30% opacity
- Card backgrounds: Light gradient overlays (white to soft pink/purple)
- Glow effects: Neon pink/purple/cyan halos around interactive elements
- Text gradients: Pink-purple on headings

### 2. Typography
**Font Families**:
- Primary (Terminal): "JetBrains Mono", "Fira Code", monospace
- Headings: "Space Mono", "Courier New", monospace
- UI Elements: "IBM Plex Mono", monospace

**Scale**:
- Hero Heading: 4xl-6xl (bold, gradient text)
- Section Headings: 2xl-3xl (semibold)
- Body: base-lg (regular)
- Terminal/Code: sm-base (regular, 1.5 line-height)
- Small UI: xs-sm (medium)

### 3. Layout System
**Spacing Units**: Tailwind spacing - primarily use 4, 6, 8, 12, 16, 20, 24
**Container**: max-w-7xl centered
**Grid**: CSS Grid for card layouts (1-3 columns responsive)

## Component Specifications

### Loading Screen
- Full viewport (100vh/100vw) covering entire page
- Video background (jhdhd.mp4) with slight pink/purple overlay (20% opacity)
- Center: ElyraOS logo with pulsing glow effect
- Loading text: "Syncing distributed ledger..." in monospace font
- Fade out animation (1s) after 2-3 seconds

### Hero Section
- Height: 90vh minimum
- Video background (jhdhd.mp4) looping, slight blur
- Gradient overlay: Diagonal pink-to-purple (25% opacity)
- Content: Center-aligned with glassmorphism card containing:
  - Logo (medium size)
  - Main heading with gradient text
  - Subheading in monospace
  - Primary CTA button with neon glow

### Glassmorphism Navbar
- Position: Fixed top, full width
- Background: Frosted glass effect (backdrop-blur-xl, white 10% opacity)
- Border: 1px solid with pink/purple gradient (20% opacity)
- Logo: Left side (ElyraOS from akakakaka.png), height ~40px
- Navigation: Right side with monospace links
- Glow: Subtle pink shadow on scroll

### Character Profile Card
- Layout: Horizontal split (image left, info right) on desktop; stack on mobile
- Background: Glassmorphism with white/pink gradient
- Border: Neon pink glow (box-shadow with pink)
- Avatar: Large circular image with neon border
- Info sections:
  - Name/Title with gradient text
  - Stats grid (Age, Height, Weight) in terminal style
  - Personality tags as neon-bordered pills
  - Topics as smaller pills with gradient backgrounds

### Live Token Monitoring Cards
- Grid: 2 columns on desktop, 1 on mobile
- Card design:
  - Glassmorphism background
  - Neon border (pink for first, purple for second)
  - Token logo: Top-left, circular with glow
  - Token name/symbol: Large, bold, monospace
  - Price change: Color-coded (+green glow, -red glow)
  - Stats grid: Price, MCap, Holders, Liquidity in terminal format
  - Contract address: Small, monospace, truncated with copy icon

### MCP Tools Section
- Grid: 2-3 columns responsive
- Card design:
  - Glassmorphism with light gradient
  - Rotating neon border colors (pink/purple/cyan)
  - Header: Tool name with version badge
  - Status badge: "ACTIVE" with neon green glow
  - Features list: Monospace bullets with icons
  - Footer: Pricing info in terminal style
  - Hover: Intensified glow effect

## Visual Effects

### Glassmorphism
```
backdrop-filter: blur(12px)
background: rgba(255, 255, 255, 0.1)
border: 1px solid rgba(255, 255, 255, 0.2)
```

### Neon Glow
- Pink glow: `box-shadow: 0 0 20px rgba(255, 27, 141, 0.6)`
- Purple glow: `box-shadow: 0 0 20px rgba(157, 78, 221, 0.6)`
- Multi-color: Layer multiple shadows

### Glitch Effect
- Apply to headings occasionally
- Quick horizontal offset animation
- RGB channel split effect
- Trigger: Page load or hover

### Syncing Animation
- Rotating spinner with gradient
- Pulsing dots (...)
- Applied to "Syncing distributed ledger" text

## Interactions
- Buttons: Glow intensifies on hover, slight scale (1.05)
- Cards: Lift on hover (translateY -4px), glow expands
- Links: Underline with gradient on hover
- Minimal animations - focus on glow and subtle movements

## Images
- **Logo**: ElyraOS branding (akakakaka.png) - used in navbar and hero
- **Video**: Background video (jhdhd.mp4) - loading screen and hero section
- **Character Avatar**: Anime-style character portrait for profile card
- **Token Logos**: Circular crypto token icons for monitoring cards

## Responsive Behavior
- Desktop: Multi-column grids, horizontal card layouts
- Tablet: 2-column grids, maintain glassmorphism
- Mobile: Single column, stack all elements, reduce glow intensity for performance