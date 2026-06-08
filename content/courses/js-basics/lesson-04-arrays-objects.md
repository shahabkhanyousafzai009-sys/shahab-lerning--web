---
title: JavaScript Arrays & Objects
description: Working with arrays, objects, and data structures in JavaScript
order: 4
flashcards:
  - q: How do you add an element to the end of an array?
    a: push()
  - q: What method removes the last element from an array?
    a: pop()
  - q: How do you access a property of an object?
    a: Dot notation (obj.key)
  - q: What does JSON.stringify() do?
    a: Converts an object to a JSON string
quiz:
  - q: What is the index of the first element in an array?
    o:
      - "0"
      - "1"
      - "-1"
      - first
    a: "0"
  - q: Which method creates a new array with transformed elements?
    o:
      - map()
      - forEach()
      - filter()
      - reduce()
    a: map()
  - q: How do you add a property to an existing object?
    o:
      - obj.newProp = value
      - obj.add("newProp", value)
      - obj["newProp"] = value
      - Both A and C
    a: Both A and C
---

## Arrays

Arrays store ordered collections of data:

```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]);      // "apple"
console.log(fruits.length);  // 3
```

### Common Array Methods

```javascript
let numbers = [1, 2, 3, 4, 5];

numbers.push(6);        // [1,2,3,4,5,6] — add to end
numbers.pop();          // [1,2,3,4,5] — remove from end
numbers.unshift(0);     // [0,1,2,3,4,5] — add to start
numbers.shift();        // [1,2,3,4,5] — remove from start

// Find index of element
numbers.indexOf(3);     // 2

// Check if element exists
numbers.includes(5);    // true
```

### Iterating Arrays

```javascript
let nums = [1, 2, 3];

// forEach — execute for each element
nums.forEach(n => console.log(n));

// map — transform each element
let doubled = nums.map(n => n * 2);  // [2, 4, 6]

// filter — keep matching elements
let evens = nums.filter(n => n % 2 === 0);  // [2]

// reduce — accumulate values
let sum = nums.reduce((acc, n) => acc + n, 0);  // 6
```

## Objects

Objects store key-value pairs:

```javascript
let person = {
    name: "Alice",
    age: 25,
    isStudent: true,
    greet() {
        console.log(`Hi, I'm ${this.name}`);
    }
};

console.log(person.name);     // "Alice"
console.log(person["age"]);   // 25
person.greet();               // "Hi, I'm Alice"
```

### Adding & Updating Properties

```javascript
person.city = "New York";     // add new property
person.age = 26;              // update existing
delete person.isStudent;      // remove property
```

### Nested Objects & Arrays

```javascript
let store = {
    name: "Tech Shop",
    products: [
        { id: 1, name: "Laptop", price: 999 },
        { id: 2, name: "Mouse", price: 25 }
    ],
    isOpen: true
};

console.log(store.products[0].name);  // "Laptop"
```

## JSON

JSON is the standard format for API data:

```javascript
// Object to JSON string
let json = JSON.stringify(person);
// '{"name":"Alice","age":25,"isStudent":true}'

// JSON string to object
let obj = JSON.parse(json);
```
