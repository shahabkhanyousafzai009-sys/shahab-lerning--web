---
title: CSS Selectors
description: How to target HTML elements with CSS
order: 1
flashcards:
  - q: How do you select an element by its class?
    a: .classname
  - q: How do you select an element by its id?
    a: "#idname"
  - q: What selector targets all elements?
    a: "*"
quiz:
  - q: Which selector has the highest specificity?
    o:
      - "#id"
      - .class
      - element
      - "*"
    a: "#id"
  - q: How do you select a descendant element?
    o:
      - parent child
      - parent > child
      - parent + child
      - parent ~ child
    a: parent child
  - q: What does the .class selector match?
    o:
      - Elements with that class attribute
      - Elements with that id
      - All elements
      - The first element only
    a: Elements with that class attribute
---

CSS selectors define which HTML elements to style.

## Basic Selectors

```css
/* Element selector */
p { color: blue; }

/* Class selector */
.highlight { background: yellow; }

/* ID selector */
#header { font-size: 24px; }

/* Universal selector */
* { margin: 0; }
```

## Combinators

```css
/* Descendant (any nested level) */
article p { }

/* Child (direct only) */
article > p { }

/* Adjacent sibling */
h2 + p { }

/* General sibling */
h2 ~ p { }
```

## Pseudo-classes

```css
a:hover { color: red; }
li:first-child { font-weight: bold; }
input:focus { border-color: blue; }
```
