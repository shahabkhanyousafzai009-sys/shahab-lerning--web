---
title: Async JavaScript & DOM Events
description: Promises, async/await, fetch API, and DOM event handling
order: 5
flashcards:
  - q: What method adds an event listener to an element?
    a: addEventListener()
  - q: What object represents the result of an async operation?
    a: Promise
  - q: What keyword waits for a Promise in an async function?
    a: await
  - q: What API is used to make HTTP requests in the browser?
    a: fetch()
quiz:
  - q: What does the fetch() function return?
    o:
      - A Promise
      - The response data
      - An error
      - undefined
    a: A Promise
  - q: Which event is fired when a button is clicked?
    o:
      - click
      - hover
      - press
      - tap
    a: click
  - q: What does e.preventDefault() do?
    o:
      - Stops the default browser behavior
      - Stops event propagation
      - Removes the element
      - Prevents future clicks
    a: Stops the default browser behavior
---

## DOM Events

Events let you respond to user interactions:

```javascript
let button = document.getElementById("myBtn");

button.addEventListener("click", function(event) {
    console.log("Button clicked!");
    console.log(event.target);  // the element clicked
});
```

### Common Events

```javascript
element.addEventListener("click", handler);       // mouse click
element.addEventListener("submit", handler);      // form submit
element.addEventListener("keydown", handler);     // key press
element.addEventListener("input", handler);       // value change
element.addEventListener("mouseenter", handler);  // hover in
element.addEventListener("mouseleave", handler);  // hover out
```

### Event Object

```javascript
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();  // stop page reload
    console.log("Form submitted!");
});

document.addEventListener("keydown", (e) => {
    console.log(`Key pressed: ${e.key}`);
    if (e.key === "Enter") {
        console.log("Enter was pressed!");
    }
});
```

## Callbacks

A callback is a function passed to another function:

```javascript
function fetchData(callback) {
    setTimeout(() => {
        callback("Data received!");
    }, 1000);
}

fetchData((message) => {
    console.log(message);  // "Data received!" after 1s
});
```

## Promises

A Promise represents a future value:

```javascript
let promise = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
        resolve("Operation succeeded");
    } else {
        reject("Operation failed");
    }
});

promise
    .then(result => console.log(result))
    .catch(error => console.error(error));
```

## Async/Await

Cleaner syntax for working with promises:

```javascript
async function getData() {
    try {
        let response = await fetch("https://api.example.com/data");
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}
```

## Fetch API

Make HTTP requests from the browser:

```javascript
// GET request
async function getUsers() {
    let res = await fetch("https://jsonplaceholder.typicode.com/users");
    let users = await res.json();
    console.log(users);
}

// POST request
async function createUser() {
    let res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Alice", age: 25 })
    });
    let newUser = await res.json();
    console.log(newUser);
}
```
