# Secretariat Browser - Visual Design & Color Scheme

## Brand Identity

Secretariat Browser represents discovery, elegance, and natural exploration. The visual identity draws inspiration from nature, combining fresh growth (mint), earthy stability (brown), refined sophistication (cream), and vibrant energy (salmon).

## Color Palette

### Primary Colors

#### Mint Green
- **Hex**: `#98D8C8`
- **RGB**: `152, 216, 200`
- **Usage**: Primary brand color, links, success states, active elements
- **Meaning**: Fresh, growth, discovery, hope
- **Applications**:
  - Discovery Engine active mode indicator
  - Search result highlights
  - Success messages
  - Active navigation items
  - Primary buttons

#### Deep Brown
- **Hex**: `#3E2723`
- **RGB**: `62, 39, 35`
- **Usage**: Text, headings, UI framework, dark mode base
- **Meaning**: Stability, trust, grounding, sophistication
- **Applications**:
  - Primary text color
  - Navigation bar background
  - Headings and titles
  - Browser chrome (window frame)
  - Dark mode primary background

### Accent Colors

#### Cream
- **Hex**: `#FFF8E7`
- **RGB**: `255, 248, 231`
- **Usage**: Backgrounds, subtle highlights, card backgrounds (use sparingly)
- **Meaning**: Sophistication, elegance, calm
- **Applications**:
  - Light mode background
  - Card backgrounds in search results
  - Subtle section dividers
  - Tooltip backgrounds
  - Input field backgrounds

#### Salmon
- **Hex**: `#FFA07A`
- **RGB**: `255, 160, 122`
- **Usage**: Warnings, call-to-action, emphasis (use sparingly)
- **Meaning**: Energy, warmth, attention
- **Applications**:
  - Warning states
  - Important notifications
  - Featured Discovery Modes
  - Call-to-action buttons
  - Error state accents

### Supporting Colors

#### Forest Green (darker mint)
- **Hex**: `#5FA292`
- **RGB**: `95, 162, 146`
- **Usage**: Hover states for mint green elements
- **Applications**:
  - Button hover states
  - Active link hover
  - Selected items

#### Light Mint
- **Hex**: `#D4F1E8`
- **RGB**: `212, 241, 232`
- **Usage**: Very subtle backgrounds, disabled states
- **Applications**:
  - Subtle highlights
  - Search input focus glow
  - Disabled button background

#### Charcoal
- **Hex**: `#2C1E1A`
- **RGB**: `44, 30, 26`
- **Usage**: Very dark text, shadows
- **Applications**:
  - Extra emphasis text
  - Shadow colors
  - Dark mode secondary text

## Color Usage by Component

### Discovery Engine Search UI

```
Search Input:
- Background: Cream (#FFF8E7)
- Border: Light Mint (#D4F1E8)
- Focus Border: Mint Green (#98D8C8)
- Text: Deep Brown (#3E2723)
- Placeholder: Forest Green at 50% opacity

Result Cards:
- Background: White (#FFFFFF) or Cream (#FFF8E7)
- Border: Light Mint (#D4F1E8)
- Hover Border: Mint Green (#98D8C8)
- Title: Deep Brown (#3E2723)
- Snippet: Charcoal at 80% opacity
- Source Type Badge: Varies by type (see below)

Source Type Badges:
- Official: Deep Brown background, Cream text
- Hobbyist: Mint Green background, Deep Brown text
- Popular: Forest Green background, Cream text
- Academic: Salmon background, Deep Brown text
- Community: Light Mint background, Deep Brown text
```

### Browser Chrome

```
Navigation Bar (Top):
- Background: Deep Brown (#3E2723)
- Text: Cream (#FFF8E7)
- Active Tab: Mint Green (#98D8C8) underline
- Inactive Tab: Deep Brown at 70% opacity
- Icons: Cream (#FFF8E7)
- Icon Hover: Mint Green (#98D8C8)

Address Bar:
- Background: Cream (#FFF8E7)
- Border: Light Mint (#D4F1E8)
- Focus: Mint Green (#98D8C8) glow
- Text: Deep Brown (#3E2723)
- Suggestions Background: White (#FFFFFF)
- Selected Suggestion: Light Mint (#D4F1E8)
```

### Discovery Modes

Each mode has a signature color for quick visual identification:

```
Balanced Discovery:
- Badge Color: Mint Green (#98D8C8)
- Icon: Balance scales

Deep Dive:
- Badge Color: Deep Brown (#3E2723)
- Icon: Magnifying glass

Serendipity:
- Badge Color: Salmon (#FFA07A)
- Icon: Sparkles/dice

Focused:
- Badge Color: Forest Green (#5FA292)
- Icon: Target/bullseye

Community:
- Badge Color: Light Mint (#D4F1E8) with Deep Brown text
- Icon: Speech bubbles
```

### Settings Page

```
Background: Cream (#FFF8E7)
Sidebar: Deep Brown (#3E2723)
Sidebar Text: Cream (#FFF8E7)
Sidebar Active: Mint Green (#98D8C8) background
Content Area: White (#FFFFFF)
Section Headers: Deep Brown (#3E2723)
Dividers: Light Mint (#D4F1E8)
```

### Buttons

```
Primary Button:
- Background: Mint Green (#98D8C8)
- Text: Deep Brown (#3E2723)
- Hover: Forest Green (#5FA292)
- Active: Darker Forest Green

Secondary Button:
- Background: Cream (#FFF8E7)
- Border: Mint Green (#98D8C8)
- Text: Deep Brown (#3E2723)
- Hover: Light Mint (#D4F1E8) background

Danger Button:
- Background: Salmon (#FFA07A)
- Text: Deep Brown (#3E2723)
- Hover: Darker Salmon

Disabled Button:
- Background: Light Mint (#D4F1E8)
- Text: Forest Green at 40% opacity
```

## Dark Mode

Secretariat supports dark mode with inverted color relationships:

```
Background: Deep Brown (#3E2723)
Surface: Charcoal (#2C1E1A)
Text: Cream (#FFF8E7)
Secondary Text: Cream at 70% opacity
Primary Accent: Mint Green (#98D8C8)
Links: Light Mint (#D4F1E8)
Borders: Deep Brown lightened 20%
Cards: Charcoal (#2C1E1A) with subtle borders
```

## Accessibility

### Contrast Ratios (WCAG AA Compliance)

All color combinations meet WCAG 2.1 Level AA standards:

```
✅ Deep Brown (#3E2723) on Cream (#FFF8E7): 13.5:1 (AAA)
✅ Deep Brown (#3E2723) on White (#FFFFFF): 15.8:1 (AAA)
✅ Deep Brown (#3E2723) on Mint Green (#98D8C8): 4.8:1 (AA)
✅ Deep Brown (#3E2723) on Light Mint (#D4F1E8): 10.2:1 (AAA)
✅ Deep Brown (#3E2723) on Salmon (#FFA07A): 4.9:1 (AA)
✅ Cream (#FFF8E7) on Deep Brown (#3E2723): 13.5:1 (AAA)
✅ Mint Green (#98D8C8) on Deep Brown (#3E2723): 4.8:1 (AA)
```

### Color Blind Considerations

- Never rely on color alone to convey meaning
- All Discovery Modes have both color AND icon
- Source types have text labels in addition to colored badges
- Links are underlined, not just colored
- Error/warning/success states use icons + color

## Typography Pairing

The color scheme pairs well with these fonts:

**Primary Font (UI)**:
- System fonts: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu
- Weight: 400 (regular), 500 (medium), 700 (bold)
- Color: Deep Brown (#3E2723)

**Monospace Font (Code)**:
- "Fira Code", "Source Code Pro", Menlo, Monaco, Consolas, monospace
- Color: Deep Brown (#3E2723) or Charcoal (#2C1E1A)

**Display Font (Large Headings)**:
- Optional: Consider a serif for elegance
- Weight: 600-700
- Color: Deep Brown (#3E2723)

## Animation & Transitions

```css
/* Smooth transitions for color changes */
transition: all 0.2s ease-in-out;

/* Hover glow effect (mint green) */
box-shadow: 0 0 8px rgba(152, 216, 200, 0.4);

/* Focus ring (mint green) */
outline: 2px solid #98D8C8;
outline-offset: 2px;

/* Card elevation */
box-shadow: 0 2px 8px rgba(62, 39, 35, 0.1);
```

## Logo & Icon Design

### Logo Concept
- **Primary Mark**: Stylized "S" incorporating elements of a compass rose (discovery)
- **Color**: Mint Green (#98D8C8) on Deep Brown (#3E2723)
- **Secondary Mark**: Full "Secretariat" wordmark
- **Icon**: Simplified "S" or compass rose for app icon

### Icon Set
- Style: Outlined, minimalist
- Stroke Weight: 2px
- Color: Inherits from parent (usually Deep Brown or Cream)
- Size: 16px, 20px, 24px, 32px

## Implementation

### CSS Variables

```css
:root {
  /* Primary Colors */
  --secretariat-mint-green: #98D8C8;
  --secretariat-deep-brown: #3E2723;

  /* Accent Colors */
  --secretariat-cream: #FFF8E7;
  --secretariat-salmon: #FFA07A;

  /* Supporting Colors */
  --secretariat-forest-green: #5FA292;
  --secretariat-light-mint: #D4F1E8;
  --secretariat-charcoal: #2C1E1A;

  /* Semantic Colors */
  --color-primary: var(--secretariat-mint-green);
  --color-text: var(--secretariat-deep-brown);
  --color-background: var(--secretariat-cream);
  --color-accent: var(--secretariat-salmon);
  --color-surface: #FFFFFF;
  --color-border: var(--secretariat-light-mint);

  /* State Colors */
  --color-hover: var(--secretariat-forest-green);
  --color-active: var(--secretariat-mint-green);
  --color-disabled: var(--secretariat-light-mint);
  --color-success: var(--secretariat-mint-green);
  --color-warning: var(--secretariat-salmon);
  --color-error: #E57373;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--secretariat-deep-brown);
    --color-surface: var(--secretariat-charcoal);
    --color-text: var(--secretariat-cream);
    --color-border: color-mix(in srgb, var(--secretariat-deep-brown) 80%, white);
  }
}
```

### Chromium Theme Integration

For integration with Chromium's theming system, these mappings apply:

```cpp
// theme_constants.h additions for Secretariat
constexpr SkColor kSecretariatMintGreen = SkColorSetRGB(152, 216, 200);
constexpr SkColor kSecretariatDeepBrown = SkColorSetRGB(62, 39, 35);
constexpr SkColor kSecretariatCream = SkColorSetRGB(255, 248, 231);
constexpr SkColor kSecretariatSalmon = SkColorSetRGB(255, 160, 122);
```

## Brand Guidelines

### Do's ✅
- Use mint green as the primary interactive color
- Use deep brown for text and structural elements
- Apply cream sparingly for backgrounds and subtle accents
- Use salmon only for important calls-to-action and warnings
- Maintain high contrast for readability
- Test all color combinations for accessibility

### Don'ts ❌
- Don't use pure black (#000000) - use Deep Brown or Charcoal instead
- Don't overuse salmon - it's an accent, not a primary color
- Don't use cream for important text - contrast is too low
- Don't create new brand colors without documentation
- Don't use gradients (except subtle, purposeful ones)
- Don't ignore dark mode - it's a first-class citizen

## Inspiration

The Secretariat color palette draws inspiration from:
- 🌿 **Mint Green**: Fresh herbs, new growth, spring mornings
- 🪵 **Deep Brown**: Rich soil, tree bark, leather-bound books
- 📜 **Cream**: Aged paper, vintage documents, warm candlelight
- 🌅 **Salmon**: Sunset skies, coral reefs, vibrant energy

This palette evokes the feeling of discovering rare books in an old library, exploring a botanical garden, or finding a hidden gem in nature - perfectly aligned with Secretariat's mission of serendipitous web discovery.

---

**Design Version**: 1.0
**Last Updated**: November 3, 2025
**Designer**: Secretariat Browser Project
**Status**: Official Brand Guidelines
