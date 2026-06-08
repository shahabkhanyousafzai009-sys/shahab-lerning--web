---
title: Introduction to HTML
description: What is HTML and how the web works
order: 1
flashcards:
  - q: What does HTML stand for?
    a: HyperText Markup Language
  - q: What is the purpose of HTML?
    a: To structure content on the web
  - q: Is HTML a programming language?
    a: No, it is a markup language
quiz:
  - q: What does HTML stand for?
    o:
      - HyperText Markup Language
      - High Tech Modern Language
      - Home Tool Markup Language
      - Hyper Transfer Markup Language
    a: HyperText Markup Language
  - q: Which tag is the root element of an HTML page?
    o:
      - <html>
      - <head>
      - <body>
      - <main>
    a: <html>
  - q: HTML is a...
    o:
      - Markup language
      - Programming language
      - Scripting language
      - Database language
    a: Markup language
---

HTML (HyperText Markup Language) is the standard language for creating web pages. It describes the structure of a web page using a system of tags and attributes.

## How the Web Works

When you visit a website, your browser sends a request to a server. The server responds with HTML, which the browser renders into the page you see.

## Basic HTML Document

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
  </body>
</html>
```

## Key Concepts

- **Tags**: Elements surrounded by angle brackets like `<h1>`
- **Attributes**: Extra information in tags like `class="container"`
- **Content**: The text or media between opening and closing tags

HTML documents start with `<!DOCTYPE html>` declaration, followed by `<html>` as the root element.
