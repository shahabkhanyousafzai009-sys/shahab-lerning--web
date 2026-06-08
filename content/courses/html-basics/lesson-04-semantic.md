---
title: Semantic HTML & Accessibility
description: Semantic elements, ARIA, and web accessibility best practices
order: 4
flashcards:
  - q: What semantic element represents the main navigation links?
    a: nav
  - q: What attribute provides a text alternative for images?
    a: alt
  - q: What element defines the main content of a page?
    a: main
  - q: What does ARIA stand for?
    a: Accessible Rich Internet Applications
quiz:
  - q: Which element is semantic?
    o:
      - article
      - div
      - span
      - b
    a: article
  - q: What attribute makes a form field accessible?
    o:
      - label with for/id
      - name
      - class
      - style
    a: label with for/id
  - q: What element groups related navigation links?
    o:
      - nav
      - menu
      - ul
      - links
    a: nav
---

Semantic HTML gives meaning to your markup, helping both browsers and assistive technologies understand your content.

## Semantic Elements

Replace generic `<div>` with meaningful tags:

```html
<header>Site header</header>
<nav>Navigation links</nav>
<main>
  <article>
    <h1>Article Title</h1>
    <section>
      <h2>Section Heading</h2>
      <p>Content here...</p>
    </section>
  </article>
  <aside>Sidebar content</aside>
</main>
<footer>Footer info</footer>
```

## Why Semantic HTML Matters

- **SEO** — Search engines understand your page structure
- **Accessibility** — Screen readers navigate by landmarks
- **Maintainability** — Code is easier to read and understand

## Accessibility Best Practices

### Images
```html
<img src="photo.jpg" alt="A sunset over the mountains">
```
Always provide meaningful `alt` text. Use `alt=""` for decorative images.

### Forms
```html
<label for="email">Email Address:</label>
<input type="email" id="email" name="email" required aria-required="true">
```

### Headings
Use headings in order (h1 &rarr; h2 &rarr; h3) — don't skip levels:

```html
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Sub-section</h3>
```

### Focus Management
```html
<!-- Interactive elements should be focusable -->
<button>Click Me</button>
<a href="/page">Link</a>
<input type="text">
```

### Color Contrast
Ensure text has sufficient contrast against backgrounds. A ratio of 4.5:1 is recommended for normal text.

## ARIA Attributes

Use ARIA when native HTML semantics aren't enough:

```html
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>
<div id="menu" role="navigation" aria-label="Main menu">
  <!-- menu items -->
</div>
```

Skip navigation links help users jump to main content:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```
