---
title: Flexbox Layout
description: Building flexible layouts with CSS Flexbox
order: 3
flashcards:
  - q: What display value enables Flexbox?
    a: "display: flex"
  - q: What property aligns items along the main axis?
    a: justify-content
  - q: What property aligns items along the cross axis?
    a: align-items
quiz:
  - q: Which property creates a flex container?
    o:
      - "display: flex"
      - "display: block"
      - "display: inline"
      - "position: flex"
    a: "display: flex"
  - q: "What does justify-content: center do?"
    o:
      - Centers items along the main axis
      - Centers items along the cross axis
      - Centers text inside items
      - Centers the container itself
    a: Centers items along the main axis
  - q: Which property makes flex items wrap?
    o:
      - flex-wrap
      - wrap-content
      - flex-flow
      - overflow
    a: flex-wrap
---

Flexbox is a one-dimensional layout method that distributes space efficiently.

## Flex Container

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## Main Properties

### On the container:
- `flex-direction` — Row (default) or column
- `justify-content` — Main axis alignment (start, center, space-between, etc.)
- `align-items` — Cross axis alignment (stretch, center, etc.)
- `flex-wrap` — Allow items to wrap to next line
- `gap` — Space between items

### On the items:
- `flex-grow` — How much to grow relative to siblings
- `flex-shrink` — How much to shrink
- `flex-basis` — Initial size before growing/shrinking
- `align-self` — Override alignment for one item

```css
.item {
  flex: 1;
  margin: 8px;
}
```
