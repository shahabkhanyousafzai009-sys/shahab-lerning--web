---
title: Variables & Data Types
description: Storing data with let, const, and var
order: 1
flashcards:
  - q: How do you declare a variable that cannot be reassigned?
    a: const
  - q: What is the difference between let and const?
    a: let can be reassigned, const cannot
  - q: What data type represents true or false?
    a: Boolean
quiz:
  - q: Which keyword declares a block-scoped variable that can be updated?
    o:
      - let
      - const
      - var
      - int
    a: let
  - q: What will typeof "hello" return?
    o:
      - string
      - String
      - text
      - "hello"
    a: string
  - q: Which is NOT a JavaScript primitive type?
    o:
      - Object
      - String
      - Number
      - Boolean
    a: Object
---

JavaScript has several ways to store data.

## Variable Declarations

```javascript
// Can't be reassigned
const pi = 3.14159;

// Can be reassigned
let count = 0;
count = 1;

// Old way, avoid using
var name = "John";
```

## Primitive Data Types

```javascript
const name = "Alice";     // String
const age = 25;            // Number
const isStudent = true;    // Boolean
const nothing = null;      // Null
let notDefined;            // Undefined
const id = Symbol("id");   // Symbol
const big = 123n;          // BigInt
```

## Type Checking

Use `typeof` to check a value's type:

```javascript
typeof "hello";  // "string"
typeof 42;       // "number"
typeof true;     // "boolean"
```
