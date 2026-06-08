---
title: JavaScript — The Complete Guide
description: Master JavaScript from variables and functions to DOM manipulation, async programming, and modern ES6+ features
author: DevLearn Team
published: 2026-06-08
tags: javascript, web-development, programming
---

JavaScript is the programming language of the web. It runs in every browser and on servers via Node.js.

## Variables

Three ways to declare variables:

```javascript
let name = "Alice";       // block-scoped, can be reassigned
const age = 25;           // block-scoped, cannot be reassigned
var old = "Avoid this";   // function-scoped, can be reassigned
```

Always prefer `const` by default, use `let` when you need reassignment.

## Data Types

```javascript
// Primitive types
const str = "hello";        // string
const num = 42;             // number
const bool = true;          // boolean
const n = null;             // null
let u;                      // undefined
const sym = Symbol();       // symbol

// Reference types
const obj = { a: 1 };       // object
const arr = [1, 2, 3];     // array
const fn = () => {};        // function

console.log(typeof "hello");  // "string"
console.log(typeof 42);       // "number"
```

## Functions

```javascript
// Function declaration (hoisted)
function add(a, b) { return a + b; }

// Function expression
const multiply = function(a, b) { return a * b; };

// Arrow function (lexical `this`)
const subtract = (a, b) => a - b;

// Default parameters
function greet(name = "World") {
    return `Hello, ${name}!`;
}

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}
```

## Objects

```javascript
const person = {
    name: "Alice",
    age: 25,
    greet() {
        console.log(`Hi, I'm ${this.name}`);
    }
};

// Destructuring
const { name, age } = person;
console.log(name);  // "Alice"

// Spread operator
const clone = { ...person, city: "NYC" };
```

## Arrays

```javascript
const numbers = [1, 2, 3, 4, 5];

// Modern array methods
numbers.forEach(n => console.log(n));
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
const found = numbers.find(n => n > 3);
const hasEven = numbers.some(n => n % 2 === 0);
const allPositive = numbers.every(n => n > 0);

// Spread and destructuring
const more = [...numbers, 6, 7];
const [first, second, ...rest] = numbers;
```

## DOM Manipulation

```javascript
// Selecting elements
const header = document.getElementById("header");
const buttons = document.querySelectorAll(".btn");
const firstBtn = document.querySelector(".btn");

// Modifying
header.textContent = "New Text";
header.innerHTML = "<span>HTML content</span>";
header.classList.add("active");
header.style.color = "blue";

// Creating elements
const div = document.createElement("div");
div.textContent = "Hello";
document.body.appendChild(div);
```

## Events

```javascript
button.addEventListener("click", (e) => {
    e.preventDefault();  // stop default behavior
    console.log("Clicked!", e.target);
});

// Event delegation
document.addEventListener("click", (e) => {
    if (e.target.matches(".delete-btn")) {
        e.target.closest("li").remove();
    }
});
```

## Promises and Async/Await

```javascript
// Promise
fetch("https://api.example.com/data")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

// Async/await (cleaner)
async function getData() {
    try {
        const res = await fetch("https://api.example.com/data");
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error("Error:", err);
    }
}
```

## ES6+ Features

```javascript
// Template literals
const name = "Alice";
console.log(`Hello, ${name}!`);

// Optional chaining
const city = user?.address?.city;

// Nullish coalescing
const value = input ?? "default";  // only for null/undefined

// Short-circuit evaluation
const display = user.name || "Guest";

// Ternary
const status = age >= 18 ? "Adult" : "Minor";

// Modules (ESM)
// export const foo = 42;
// import { foo } from './module.js';

// Map and Set
const map = new Map([["key", "value"]]);
const set = new Set([1, 2, 2, 3]);  // {1, 2, 3}
```

## Closures

A closure is a function that remembers its outer variables:

```javascript
function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
```

## Classes (ES6)

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a sound`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks`);
    }
}
```

## Best Practices

1. Use `const` and `let`, never `var`
2. Use arrow functions for callbacks
3. Prefer `===` over `==` (strict equality)
4. Use template literals instead of string concatenation
5. Destructure objects and arrays for cleaner code
6. Handle async errors with try/catch
7. Keep functions small and focused
8. Use meaningful variable and function names
