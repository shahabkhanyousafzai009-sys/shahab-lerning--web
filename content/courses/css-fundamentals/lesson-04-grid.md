---
title: CSS Grid Layout
description: Two-dimensional layouts with CSS Grid
order: 4
flashcards:
  - q: What property turns an element into a grid container?
    a: "display: grid"
  - q: What property defines column widths in a grid?
    a: grid-template-columns
  - q: What unit distributes available space equally?
    a: fr (fraction unit)
  - q: What property creates gaps between grid items?
    a: gap
quiz:
  - q: How do you create 3 equal columns in CSS Grid?
    o:
      - "grid-template-columns: 1fr 1fr 1fr"
      - "grid-template-columns: auto auto auto"
      - "grid-template-columns: 33% 33% 33%"
      - grid-columns: 3
    a: "grid-template-columns: 1fr 1fr 1fr"
  - q: "What does grid-template-rows: 100px auto do?"
    o:
      - First row 100px, second row auto
      - All rows 100px
      - First row auto, second row 100px
      - No effect
    a: First row 100px, second row auto
  - q: Which property places an item across multiple columns?
    o:
      - grid-column
      - grid-span
      - column-span
      - span-column
    a: grid-column
---

CSS Grid is a two-dimensional layout system that handles both columns and rows simultaneously.

## Basic Grid

```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}
```

```html
<div class="container">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>
```

## Fraction Units (fr)

The `fr` unit distributes available space proportionally:

```css
/* 3 columns: 1 part, 2 parts, 1 part */
grid-template-columns: 1fr 2fr 1fr;

/* Fixed sidebar + flexible content */
grid-template-columns: 250px 1fr;
```

## Explicit Rows

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100px 200px;
    gap: 16px;
}
```

## Placing Items Across Cells

Control item placement with `grid-column` and `grid-row`:

```css
.header {
    grid-column: 1 / -1;  /* span all columns */
}

.sidebar {
    grid-column: 1 / 2;
    grid-row: 2 / 4;
}

.main {
    grid-column: 2 / -1;
    grid-row: 2 / 3;
}
```

## Named Grid Areas

A cleaner way to define layouts:

```css
.layout {
    display: grid;
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 200px 1fr 1fr;
    gap: 16px;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

## Auto-fit & Minmax

Create responsive grids without media queries:

```css
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
```

This automatically fits as many 250px columns as possible.
