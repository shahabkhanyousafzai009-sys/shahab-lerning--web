---
title: C++ Variables & Data Types
description: Learn C++ syntax, variables, data types, and basic I/O
order: 1
flashcards:
  - q: What header is needed for input/output in C++?
    a: iostream
  - q: What operator is used for output in C++?
    a: <<
  - q: What is the C++ equivalent of NULL?
    a: nullptr
  - q: Which data type stores a single character?
    a: char
quiz:
  - q: What does cout << "Hello" do?
    o:
      - Prints Hello to the console
      - Reads input from the user
      - Creates a variable
      - Throws an error
    a: Prints Hello to the console
  - q: Which of these is a valid C++ variable name?
    o:
      - myVar
      - 2ndVar
      - my-var
      - int
    a: myVar
  - q: What is the size of an int in C++ (typically)?
    o:
      - 4 bytes
      - 2 bytes
      - 8 bytes
      - 1 byte
    a: 4 bytes
---

C++ is a powerful, compiled language used for systems programming, games, and high-performance applications.

## Basic C++ Program

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

Every C++ program needs a `main()` function — execution starts here.

## Variables & Data Types

C++ is statically typed — you must declare the type:

```cpp
int age = 25;              // whole number
double price = 19.99;       // decimal number
char grade = 'A';           // single character
bool isReady = true;        // true or false
string name = "Alice";      // text (requires <string>)
```

## Basic I/O

```cpp
#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "Enter your age: ";
    cin >> age;
    cout << "You are " << age << " years old." << endl;
    return 0;
}
```

- `cout` with `<<` for output
- `cin` with `>>` for input
- `endl` adds a newline

## Constants

Use `const` to declare values that won't change:

```cpp
const double PI = 3.14159;
const int MAX_USERS = 100;
```

## Type Conversion

```cpp
double pi = 3.14;
int approx = (int)pi;     // C-style cast —> 3
int modern = static_cast<int>(pi);  // C++ style
```

## Comments

```cpp
// This is a single-line comment
/* This is a
   multi-line comment */
```
