---
title: Functions
description: Writing reusable code with functions
order: 2
flashcards:
  - q: What keyword defines a function?
    a: function
  - q: What is an arrow function?
    a: A shorter function syntax using =>
  - q: What do you call values passed to a function?
    a: Arguments (or parameters)
quiz:
  - q: How do you define an arrow function?
    o:
      - const fn = () => {}
      - function => fn() {}
      - const fn = function => {}
      - arrow fn() {}
    a: const fn = () => {}
  - q: What does return do inside a function?
    o:
      - Sends a value back and exits
      - Prints a value
      - Stops the program
      - Declares a variable
    a: Sends a value back and exits
  - q: What happens if a function has no return statement?
    o:
      - It returns undefined
      - It returns null
      - It throws an error
      - It returns 0
    a: It returns undefined
---

Functions are reusable blocks of code.

## Function Declaration

```javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Alice")); // "Hello, Alice!"
```

## Arrow Functions

Shorter syntax, especially useful for callbacks:

```javascript
const add = (a, b) => a + b;
const double = (x) => x * 2;
const sayHi = () => console.log("Hi!");
```

## Parameters & Defaults

```javascript
function multiply(a, b = 1) {
  return a * b;
}
multiply(5);    // 5 (b defaults to 1)
multiply(5, 3); // 15
```

## Best Practices

- Use descriptive names (verbs for functions)
- Keep functions small — one job per function
- Use default parameters instead of manual checks
