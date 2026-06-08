---
title: HTML Elements & Tags
description: Common HTML elements for structuring content
order: 2
flashcards:
  - q: What tag is used for the largest heading?
    a: <h1>
  - q: What does the <p> tag represent?
    a: A paragraph of text
  - q: What attribute specifies a link's destination?
    a: href
quiz:
  - q: Which tag creates a hyperlink?
    o:
      - <a>
      - <link>
      - <href>
      - <url>
    a: <a>
  - q: What does <img> require to display an image?
    o:
      - src attribute
      - href attribute
      - class attribute
      - style attribute
    a: src attribute
  - q: Which element is used for an unordered list?
    o:
      - <ul>
      - <ol>
      - <li>
      - <list>
    a: <ul>
---

HTML provides many elements to structure your content.

## Headings

Headings range from `<h1>` (most important) to `<h6>` (least important):

```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
```

## Text Elements

- `<p>` — Paragraph
- `<strong>` — Bold text
- `<em>` — Italic text
- `<br>` — Line break

## Links & Images

Create links with the `<a>` tag and display images with `<img>`:

```html
<a href="https://example.com">Visit Example</a>
<img src="photo.jpg" alt="Description">
```

## Lists

```html
<ul>
  <li>Unordered item</li>
  <li>Another item</li>
</ul>

<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>
```
