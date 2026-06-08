---
title: CSS — The Complete Guide
description: Master CSS from selectors and the box model to Flexbox, Grid, and responsive design
author: DevLearn Team
published: 2026-06-08
tags: css, web-development, frontend
---

CSS (Cascading Style Sheets) controls the visual presentation of HTML documents. It handles layout, colors, typography, and responsive behavior.

## Applying CSS

Three ways to apply CSS:

```html
<!-- External (best) -->
<link rel="stylesheet" href="styles.css">

<!-- Internal (single page) -->
<style>
    body { font-family: system-ui, sans-serif; }
</style>

<!-- Inline (avoid if possible) -->
<p style="color: red;">This is red text.</p>
```

External stylesheets are the standard — they separate content from presentation.

## Selectors

Selectors target HTML elements to apply styles:

```css
/* Element selector */
p { color: blue; }

/* Class selector */
.highlight { background: yellow; }

/* ID selector */
#header { font-size: 2rem; }

/* Descendant selector */
article p { line-height: 1.6; }

/* Child selector */
ul > li { list-style: none; }

/* Attribute selector */
input[type="text"] { border: 1px solid gray; }

/* Pseudo-class */
button:hover { opacity: 0.8; }
a:focus { outline: 2px solid blue; }

/* Pseudo-element */
p::first-letter { font-size: 2em; }
```

## Specificity

When conflicting rules target the same element, specificity determines which wins:

1. **Inline styles** — highest
2. **IDs** — `#header`
3. **Classes, attributes, pseudo-classes** — `.class`, `[attr]`, `:hover`
4. **Elements, pseudo-elements** — `div`, `::before`

```css
/* Specificity: 0,1,0,1 */
.title p { color: blue; }

/* Specificity: 0,0,1,1 — this wins */
p .text { color: red; }
```

Use the `!important` flag sparingly — it breaks the cascade.

## The Box Model

Every element is a rectangular box with four layers:

```css
.box {
    width: 200px;
    padding: 16px;      /* space inside the border */
    border: 2px solid black;
    margin: 20px;       /* space outside the border */
}

/* Include padding and border in the width */
* { box-sizing: border-box; }
```

Without `border-box`, width = content width only, making layouts unpredictable.

## Typography

```css
body {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    color: #1a1a1a;
}

h1 {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
}
```

Use `rem` for font sizes (relative to the root) and `em` for spacing relative to the element.

## Colors

```css
.element {
    color: #333;                 /* hex */
    background: rgba(0, 0, 0, 0.1);  /* RGB with opacity */
    border-color: hsl(220, 50%, 50%); /* hue, saturation, lightness */
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## Flexbox

One-dimensional layout for rows or columns:

```css
.container {
    display: flex;
    justify-content: center;      /* main axis */
    align-items: center;          /* cross axis */
    gap: 16px;                    /* spacing between items */
    flex-wrap: wrap;              /* allow wrapping */
}

.item {
    flex: 1;                      /* grow equally */
    /* flex: 0 0 250px; — fixed width, no grow/shrink */
}
```

## CSS Grid

Two-dimensional layout for rows and columns:

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.header { grid-column: 1 / -1; }  /* span all columns */

.responsive {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

## Responsive Design

```css
/* Mobile-first approach */
.container {
    grid-template-columns: 1fr;
}

/* Tablet */
@media (min-width: 768px) {
    .container { grid-template-columns: 1fr 1fr; }
}

/* Desktop */
@media (min-width: 1024px) {
    .container { grid-template-columns: 1fr 1fr 1fr; max-width: 1200px; margin: 0 auto; }
}
```

## Positioning

```css
.relative { position: relative; }
.absolute { position: absolute; top: 0; left: 0; }
.fixed    { position: fixed; bottom: 20px; right: 20px; }
.sticky   { position: sticky; top: 0; }
```

## Transitions and Animations

```css
.button {
    background: blue;
    color: white;
    transition: all 0.3s ease;
}

.button:hover {
    background: darkblue;
    transform: translateY(-2px);
}

@keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
}

.element {
    animation: fade-in 0.5s ease-out;
}
```

## Best Practices

1. Use `box-sizing: border-box` globally
2. Start with mobile-first media queries
3. Use CSS custom properties (variables) for repeated values
4. Keep specificity low — avoid deep nesting
5. Use modern layout (Flexbox, Grid) over floats
6. Name classes semantically, not by appearance
