# Materials Market Design System

## Brand & Style

The brand identity centers on reliability, efficiency, and industrial precision. It targets professional contractors, builders, and DIY enthusiasts who require a dependable procurement platform. The aesthetic is rooted in a **Corporate Modern** style—balancing the rugged nature of hardware with the sleek, high-velocity feel of a modern fintech or SaaS startup.

The UI must evoke a sense of structural integrity. Use high-quality photography of materials contrasted against clean, expansive white space to ensure the marketplace feels organized rather than cluttered. Interactions should be snappy and purposeful, reinforcing the professional utility of the tool.

## Layout & Spacing

This design system operates on a **fixed grid** model for large screens, transitioning to a fluid layout for mobile devices. 

- **Grid:** A 12-column system with 24px gutters.
- **Rhythm:** All internal spacing (padding, margins) must be multiples of 8px.
- **Containers:** Use 16px (md) for internal card padding and 24px (lg) for section spacing. 
- **Application:** Use the `xl` and `xxl` units to create significant separation between distinct marketplace categories or featured marketing sections to prevent visual fatigue.

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and **Tonal Layering**. Depth is used to signify interactivity and relative importance.

- **Surface 0 (Background):** Slate-50, used as the canvas.
- **Surface 1 (Cards/Items):** White background with a subtle border (Slate-100) and a medium shadow.
- **Elevated State:** On hover, cards transition to a larger shadow to simulate physical lifting.
- **Shadow Profile:** Shadows should be soft, using Slate-900 at 8-10% opacity with a generous blur radius (12px to 20px) to maintain a modern, clean look without appearing \"muddy.\"

## Components

### Buttons
Primary buttons use the Indigo-600 background with white text. They feature a `rounded-lg` corner and a subtle transition effect on hover (brightness adjustment or slight lift).

### Inputs
Text inputs utilize a white background, Slate-200 border, and `rounded-lg` corners. On focus, apply a 2px ring using Indigo-500 and update the border color to match to clearly signal the active state.

### Cards
Cards are the primary container for products. They must include a `rounded-xl` corner radius, a `border-slate-100`, and a `shadow-md`. The transition to `shadow-lg` on hover is mandatory for interactive product tiles.

### Badges
Badges are pill-shaped (`rounded-full`) and small. Use Emerald-500 with white text for positive status (e.g., \"In Stock\") and Slate-100 with Slate-600 text for neutral metadata (e.g., \"Bulk Only\").

### Additional Components
- **Data Tables:** Use for order history and inventory lists. Maintain a Slate-50 header row with Slate-200 dividers.
- **Quantity Selectors:** A combined component with a central input and +/- flanking buttons, maintaining the `rounded-lg` language.
- **Progress Steppers:** Use for checkout flows, utilizing Indigo-600 for completed and active steps.

---

## Design Tokens (JSON)

```json
{
  "colorMode": "LIGHT",
  "font": "INTER",
  "roundness": "ROUND_EIGHT",
  "customColor": "#4F46E5",
  "headlineFont": "INTER",
  "bodyFont": "INTER",
  "labelFont": "INTER",
  "namedColors": {
    "background": "#f7f9fb",
    "error": "#ba1a1a",
    "error_container": "#ffdad6",
    "inverse_on_surface": "#eff1f3",
    "inverse_primary": "#c3c0ff",
    "inverse_surface": "#2d3133",
    "on_background": "#191c1e",
    "on_error": "#ffffff",
    "on_error_container": "#93000a",
    "on_primary": "#ffffff",
    "on_primary_container": "#dad7ff",
    "on_primary_fixed": "#0f0069",
    "on_primary_fixed_variant": "#3323cc",
    "on_secondary": "#ffffff",
    "on_secondary_container": "#586377",
    "on_secondary_fixed": "#111c2d",
    "on_secondary_fixed_variant": "#3c475a",
    "on_surface": "#191c1e",
    "on_surface_variant": "#464555",
    "on_tertiary": "#ffffff",
    "on_tertiary_container": "#67f4b7",
    "on_tertiary_fixed": "#002113",
    "on_tertiary_fixed_variant": "#005236",
    "outline": "#777587",
    "outline_variant": "#c7c4d8",
    "primary": "#3525cd",
    "primary_container": "#4f46e5",
    "primary_fixed": "#e2dfff",
    "primary_fixed_dim": "#c3c0ff",
    "secondary": "#545f73",
    "secondary_container": "#d5e0f8",
    "secondary_fixed": "#d8e3fb",
    "secondary_fixed_dim": "#bcc7de",
    "surface": "#f7f9fb",
    "surface_bright": "#f7f9fb",
    "surface_container": "#eceef0",
    "surface_container_high": "#e6e8ea",
    "surface_container_highest": "#e0e3e5",
    "surface_container_low": "#f2f4f6",
    "surface_container_lowest": "#ffffff",
    "surface_dim": "#d8dadc",
    "surface_tint": "#4d44e3",
    "surface_variant": "#e0e3e5",
    "tertiary": "#005338",
    "tertiary_container": "#006e4b",
    "tertiary_fixed": "#6ffbbe",
    "tertiary_fixed_dim": "#4edea3"
  }
}
```
