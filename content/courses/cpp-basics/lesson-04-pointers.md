---
title: C++ Pointers & Memory
description: Pointers, references, and dynamic memory allocation in C++
order: 4
flashcards:
  - q: What operator gets the address of a variable?
    a: "&"
  - q: What operator dereferences a pointer?
    a: "*"
  - q: What keyword allocates memory on the heap?
    a: new
  - q: What keyword frees heap memory?
    a: delete
quiz:
  - q: What does int* ptr = &x store in ptr?
    o:
      - The address of x
      - The value of x
      - A copy of x
      - Nothing
    a: The address of x
  - q: What does *ptr give you?
    o:
      - The value at the address ptr holds
      - The address of ptr
      - The size of ptr
      - Null
    a: The value at the address ptr holds
  - q: What causes a memory leak?
    o:
      - Forgetting to delete allocated memory
      - Using too many variables
      - Declaring a pointer
      - Using references
    a: Forgetting to delete allocated memory
---

Pointers are variables that store memory addresses. They give you direct control over memory.

## Pointer Basics

```cpp
int x = 10;
int* ptr = &x;   // ptr stores the address of x

cout << ptr << endl;  // prints address (e.g., 0x7ffd)
cout << *ptr << endl; // prints 10 (dereference)
```

- `&` — address-of operator
- `*` — dereference operator (get value at address)

## Pointers and Arrays

Array names act as pointers to the first element:

```cpp
int arr[3] = {10, 20, 30};
int* p = arr;      // points to arr[0]

cout << *p << endl;      // 10
cout << *(p + 1) << endl; // 20
cout << p[1] << endl;     // 20 (same thing)
```

## Dynamic Memory

Use `new` and `delete` for heap allocation:

```cpp
int* p = new int(42);     // allocate and initialize
cout << *p << endl;        // 42
delete p;                  // free memory

int* arr = new int[10];   // allocate array
arr[0] = 5;
delete[] arr;              // free array memory
```

Always `delete` what you `new` — otherwise you get memory leaks.

## References

A reference is an alias for another variable:

```cpp
int x = 10;
int& ref = x;  // ref is a reference to x

ref = 20;      // x is now 20
cout << x;     // 20
```

Unlike pointers, references cannot be null and cannot be reassigned.

## Pass by Reference

Pass large objects efficiently without copying:

```cpp
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5, y = 10;
    swap(x, y);  // x=10, y=5
    return 0;
}
```

## Smart Pointers (C++11+)

Modern C++ prefers smart pointers over raw `new`/`delete`:

```cpp
#include <memory>

unique_ptr<int> p = make_unique<int>(42);
shared_ptr<int> s = make_shared<int>(100);
```

They automatically free memory when no longer needed.
