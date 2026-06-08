---
title: C++ — The Complete Guide
description: Learn C++ from the ground up — syntax, variables, control flow, functions, OOP, pointers, and memory management
author: DevLearn Team
published: 2026-06-08
tags: c++, programming, systems
---

C++ is a powerful compiled language used for systems programming, game development, and high-performance applications.

## Basic Program

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
```

Every C++ program starts execution from `main()`. The function returns an integer — 0 means success.

## Variables and Data Types

C++ is statically typed — every variable's type is fixed at compile time:

```cpp
int age = 25;              // whole number (typically 4 bytes)
double price = 19.99;       // decimal number (8 bytes)
char grade = 'A';           // single character (1 byte)
bool isReady = true;        // true/false (1 byte)
string name = "Alice";      // requires <string> header

const double PI = 3.14159;  // constant value
```

## Input and Output

```cpp
int age;
cout << "Enter your age: ";
cin >> age;
cout << "You are " << age << " years old." << endl;
```

- `cout` with `<<` for output
- `cin` with `>>` for input
- `endl` inserts a newline and flushes the buffer

## Control Flow

```cpp
// Conditionals
if (age >= 18) {
    cout << "Adult" << endl;
} else if (age >= 13) {
    cout << "Teenager" << endl;
} else {
    cout << "Child" << endl;
}

// Switch
switch (grade) {
    case 'A': cout << "Excellent"; break;
    case 'B': cout << "Good"; break;
    default:  cout << "Needs improvement";
}

// For loop
for (int i = 0; i < 5; i++) {
    cout << i << endl;
}

// While loop
int i = 0;
while (i < 5) {
    cout << i << endl;
    i++;
}

// Do-while (runs at least once)
int j = 0;
do {
    cout << j << endl;
    j++;
} while (j < 5);
```

## Functions

```cpp
int add(int a, int b) {
    return a + b;
}

void greet(string name) {
    cout << "Hello, " << name << endl;
}

// Default parameters
int multiply(int a, int b = 2) {
    return a * b;
}

// Function overloading
int max(int a, int b) { return (a > b) ? a : b; }
double max(double a, double b) { return (a > b) ? a : b; }
```

## Arrays and Strings

```cpp
int numbers[5] = {10, 20, 30, 40, 50};
cout << numbers[0] << endl;  // 10

// C++ strings (from <string>)
string greeting = "Hello";
cout << greeting.length() << endl;  // 5
cout << greeting[0] << endl;        // 'H'
```

## Classes and OOP

```cpp
class Rectangle {
private:
    double width, height;

public:
    Rectangle(double w, double h) : width(w), height(h) {}

    double area() const {
        return width * height;
    }

    double perimeter() const {
        return 2 * (width + height);
    }
};

int main() {
    Rectangle rect(5.0, 3.0);
    cout << rect.area() << endl;  // 15
    return 0;
}
```

### Inheritance

```cpp
class Animal {
public:
    virtual void speak() {
        cout << "Animal sound" << endl;
    }
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    void speak() override {
        cout << "Woof!" << endl;
    }
};
```

## Pointers and References

```cpp
int x = 10;
int* ptr = &x;   // pointer stores address
cout << *ptr;    // dereference — prints 10

int& ref = x;    // reference — alias for x
ref = 20;        // x is now 20

// Dynamic memory
int* p = new int(42);
delete p;

int* arr = new int[10];
delete[] arr;
```

## The Standard Template Library (STL)

```cpp
#include <vector>
#include <map>
#include <algorithm>

// Vector (dynamic array)
vector<int> nums = {3, 1, 4, 1, 5};
sort(nums.begin(), nums.end());

// Map (key-value)
map<string, int> ages;
ages["Alice"] = 25;
ages["Bob"] = 30;

// Common algorithms
auto it = find(nums.begin(), nums.end(), 4);
int sum = accumulate(nums.begin(), nums.end(), 0);
```

## Memory Management

Modern C++ prefers smart pointers:

```cpp
#include <memory>

auto ptr = make_unique<int>(42);       // unique ownership
auto shared = make_shared<int>(42);     // shared ownership

// Vectors manage their own memory
vector<int> v = {1, 2, 3};
v.push_back(4);
```

## Best Practices

1. Prefer `std::vector` over raw arrays
2. Use smart pointers (`unique_ptr`, `shared_ptr`) over raw `new`/`delete`
3. Mark overriding methods with `override`
4. Use `const` whenever a value shouldn't change
5. Initialize all variables before use
6. Prefer range-based for loops: `for (int x : vec)`
7. Use namespaces to avoid naming conflicts
8. Enable compiler warnings (`-Wall -Wextra`)
