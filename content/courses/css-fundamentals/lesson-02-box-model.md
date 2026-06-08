---
title: The Box Model
description: Understanding margin, border, padding, and content
order: 2
flashcards:
  - q: What are the four parts of the box model (inside to outside)?
    a: Content, padding, border, margin
  - q: What CSS property adds space inside an element?
    a: padding
  - q: What property adds space outside an element?
    a: margin
quiz:
  - q: Which part of the box model is between content and border?
    o:
      - padding
      - margin
      - outline
      - spacing
    a: padding
  - q: "What does box-sizing: border-box do?"
    o:
      - Includes padding and border in width/height
      - Excludes padding from width
      - Adds margin to width
      - Only works on images
    a: Includes padding and border in width/height
  - q: Which property controls the space between elements?
    o:
      - margin
      - padding
      - gap
      - spacing
    a: margin
---

Every HTML element is a rectangular box.

## Box Model Layers

From inside to outside:

1. **Content** — The actual text or media
2. **Padding** — Space around the content, inside the border
3. **Border** — A line around the padding
4. **Margin** — Space outside the border, between elements

```css
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}
```

## Box-Sizing

By default, `width` only applies to content. Use `border-box` to include padding and border:

```css
* {
  box-sizing: border-box;
}
```

With `border-box`, a 200px wide element with 20px padding stays 200px total, not 240px.
