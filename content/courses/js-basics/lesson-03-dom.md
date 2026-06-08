---
title: DOM Manipulation
description: Interacting with the page using JavaScript
order: 3
flashcards:
  - q: What does DOM stand for?
    a: Document Object Model
  - q: What method selects an element by its id?
    a: document.getElementById()
  - q: How do you change an element's text content?
    a: element.textContent
quiz:
  - q: Which method selects the first matching CSS selector?
    o:
      - document.querySelector()
      - document.getElementById()
      - document.getElementsByClassName()
      - document.querySelectorAll()
    a: document.querySelector()
  - q: What property sets the HTML inside an element?
    o:
      - innerHTML
      - textContent
      - innerText
      - htmlContent
    a: innerHTML
  - q: Which method adds an event listener to an element?
    o:
      - addEventListener
      - onEvent
      - listen
      - attachEvent
    a: addEventListener
---

The DOM is the browser's representation of your HTML page.

## Selecting Elements

```javascript
// By ID
const header = document.getElementById("header");

// By CSS selector (first match)
const btn = document.querySelector(".btn");

// By CSS selector (all matches)
const items = document.querySelectorAll("li");
```

## Modifying Elements

```javascript
const el = document.querySelector("h1");

el.textContent = "New Title";
el.style.color = "blue";
el.classList.add("highlight");
el.innerHTML = "<span>Bold text</span>";
```

## Event Listeners

```javascript
const button = document.querySelector("button");

button.addEventListener("click", () => {
  alert("Button clicked!");
});
```

## Creating Elements

```javascript
const div = document.createElement("div");
div.textContent = "Hello";
document.body.appendChild(div);
```
