---
title: HTML — The Complete Guide
description: Everything you need to know about HTML, from document structure to semantic markup, forms, and multimedia
author: DevLearn Team
published: 2026-06-08
tags: html, web-development, frontend
---

HTML (HyperText Markup Language) is the backbone of the web. It structures content using elements and attributes.

## Document Structure

Every HTML page follows the same basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a paragraph.</p>
</body>
</html>
```

- `<!DOCTYPE html>` — tells the browser it is HTML5
- `<html>` — the root element
- `<head>` — metadata, title, links to CSS
- `<body>` — visible content

## Headings and Text

Headings range from `<h1>` (most important) to `<h6>` (least):

```html
<h1>Main Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
```

Text elements:
- `<p>` — paragraph
- `<strong>` — bold text
- `<em>` — italic text
- `<br>` — line break
- `<hr>` — horizontal rule

## Links and Images

```html
<a href="https://example.com">Visit Example</a>
<img src="photo.jpg" alt="Description" width="800" height="600">
```

Always use meaningful `alt` text for accessibility.

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

<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
</dl>
```

## Tables

```html
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Alice</td>
            <td>25</td>
        </tr>
    </tbody>
</table>
```

## Forms

Forms collect user input:

```html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email">

    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4"></textarea>

    <label>
        <input type="checkbox" name="subscribe" checked>
        Subscribe to newsletter
    </label>

    <fieldset>
        <legend>Preference</legend>
        <label><input type="radio" name="pref" value="a"> Option A</label>
        <label><input type="radio" name="pref" value="b"> Option B</label>
    </fieldset>

    <select name="country">
        <option value="">Select...</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
    </select>

    <button type="submit">Submit</button>
</form>
```

## Semantic HTML

Use meaningful elements for better structure and accessibility:

```html
<header>Site header</header>
<nav>Navigation</nav>
<main>
    <article>
        <h1>Article Title</h1>
        <section>
            <h2>Section Heading</h2>
            <p>Content...</p>
        </section>
    </article>
    <aside>Sidebar</aside>
</main>
<footer>Footer</footer>
```

## Multimedia

```html
<video controls width="640">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
</video>

<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
</audio>

<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        width="560" height="315" allowfullscreen loading="lazy"></iframe>
```

## Best Practices

1. Always use `<!DOCTYPE html>` and `<html lang="...">`
2. Use semantic elements over `<div>` where possible
3. Provide `alt` text for every image
4. Use `<label>` elements linked to form inputs via `for`/`id`
5. Validate your HTML with the W3C Validator
6. Keep your structure clean — CSS handles presentation, JavaScript handles behavior
