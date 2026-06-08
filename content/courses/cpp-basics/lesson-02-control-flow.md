---
title: C++ Control Flow & Functions
description: Conditionals, loops, and defining functions in C++
order: 2
flashcards:
  - q: What keyword starts a conditional block in C++?
    a: if
  - q: What loop is guaranteed to run at least once?
    a: do-while
  - q: What keyword returns a value from a function?
    a: return
  - q: What is an array index of the first element?
    a: "0"
quiz:
  - q: What will this output? int x = 5; if (x > 3) cout << "yes";
    o:
      - yes
      - nothing
      - error
      - 5
    a: yes
  - q: Which loop checks the condition after execution?
    o:
      - do-while
      - while
      - for
      - if
    a: do-while
  - q: What is the correct function declaration?
    o:
      - int add(int a, int b)
      - function add(a, b)
      - def add(a, b)
      - func add(int a, int b)
    a: int add(int a, int b)
  - q: How do you declare an array of 5 integers?
    o:
      - int arr[5];
      - array<int, 5> arr;
      - int[5] arr;
      - int arr(5);
    a: int arr[5];
---

## Conditionals: if / else if / else

```cpp
int age = 18;

if (age >= 18) {
    cout << "Adult" << endl;
} else if (age >= 13) {
    cout << "Teenager" << endl;
} else {
    cout << "Child" << endl;
}
```

## Switch Statement

```cpp
char grade = 'B';
switch (grade) {
    case 'A': cout << "Excellent"; break;
    case 'B': cout << "Good"; break;
    case 'C': cout << "Average"; break;
    default:  cout << "Needs improvement";
}
```

Don't forget `break` — otherwise execution falls through.

## Loops

### for loop
```cpp
for (int i = 0; i < 5; i++) {
    cout << i << " ";  // 0 1 2 3 4
}
```

### while loop
```cpp
int i = 0;
while (i < 5) {
    cout << i << " ";
    i++;
}
```

### do-while loop (runs at least once)
```cpp
int i = 0;
do {
    cout << i << " ";
    i++;
} while (i < 5);
```

## Functions

Functions must declare their return type:

```cpp
int add(int a, int b) {
    return a + b;
}

void greet(string name) {
    cout << "Hello, " << name << endl;
}

int main() {
    int sum = add(5, 3);  // 8
    greet("Alice");
    return 0;
}
```

- `void` means no return value
- Parameters are typed
- Functions must be declared before use (or use prototypes)

## Arrays

```cpp
int numbers[5] = {10, 20, 30, 40, 50};
cout << numbers[0];  // 10

for (int i = 0; i < 5; i++) {
    cout << numbers[i] << " ";
}
```

Arrays have a fixed size set at declaration.
