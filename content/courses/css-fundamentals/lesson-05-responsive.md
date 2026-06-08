---
title: Responsive Design & Media Queries
description: Building responsive layouts with media queries, mobile-first approach
order: 5
flashcards:
  - q: What CSS at-rule creates responsive breakpoints?
    a: "@media"
  - q: What meta tag is essential for responsive design?
    a: viewport
  - q: What CSS unit is relative to the viewport width?
    a: vw
  - q: What approach starts with mobile styles first?
    a: mobile-first
quiz:
  - q: Which viewport meta tag value is correct?
    o:
      - <meta name="viewport" content="width=device-width, initial-scale=1">
      - <meta name="viewport" content="responsive=true">
      - <meta name="responsive" content="width=device-width">
      - <meta name="viewport" content="device-width">
    a: <meta name="viewport" content="width=device-width, initial-scale=1">
  - q: What media feature checks screen width?
    o:
      - min-width
      - min-height
      - orientation
      - resolution
    a: min-width
  - q: What unit is best for responsive typography?
    o:
      - rem
      - px
      - cm
      - in
    a: rem
---

Responsive design ensures your site looks great on all screen sizes.

## Viewport Meta Tag

Without this, mobile browsers will zoom out to fit the desktop layout:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Place this in the `<head>` of every page.

## Media Queries

Media queries apply styles based on conditions like screen width:

```css
/* Mobile-first approach: base styles are for mobile */

/* Tablet: 768px and up */
@media (min-width: 768px) {
    .container {
        grid-template-columns: 1fr 1fr;
    }
}

/* Desktop: 1024px and up */
@media (min-width: 1024px) {
    .container {
        grid-template-columns: 1fr 1fr 1fr;
        max-width: 1200px;
        margin: 0 auto;
    }
}
```

## Mobile-First vs Desktop-First

| Approach | Base Styles | Media Queries |
|----------|-------------|---------------|
| Mobile-first | Mobile | `min-width` |
| Desktop-first | Desktop | `max-width` |

**Mobile-first** is the modern standard — start small, add complexity as screen grows.

## Responsive Units

```css
/* Relative units scale with the viewport */
font-size: 1rem;     /* relative to root font-size */
width: 50vw;         /* 50% of viewport width */
height: 100vh;       /* full viewport height */
padding: 2em;        /* relative to element's font-size */
```

## Responsive Typography

Use `clamp()` for fluid typography:

```css
h1 {
    font-size: clamp(1.5rem, 4vw, 3rem);
}
```

This scales smoothly between 1.5rem and 3rem based on viewport.

## Responsive Images

```css
img {
    max-width: 100%;
    height: auto;
}
```

## Common Breakpoints

```css
/* Small phones */
@media (min-width: 480px) { }

/* Tablets */
@media (min-width: 768px) { }

/* Laptops */
@media (min-width: 1024px) { }

/* Desktops */
@media (min-width: 1280px) { }
```

Choose breakpoints based on your content, not specific devices.
