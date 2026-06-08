---
title: C++ OOP Basics
description: Classes, objects, and object-oriented programming in C++
order: 3
flashcards:
  - q: What keyword defines a class in C++?
    a: class
  - q: What access specifier makes members accessible outside the class?
    a: public
  - q: What is a constructor?
    a: A special method called when an object is created
  - q: What does -> do?
    a: Accesses members through a pointer
quiz:
  - q: Which access specifier makes members private by default?
    o:
      - private
      - public
      - protected
      - static
    a: private
  - q: How do you create an object of class Car?
    o:
      - Car myCar;
      - new Car myCar;
      - Car() myCar;
      - create Car myCar;
    a: Car myCar;
  - q: What is function overloading?
    o:
      - Same name, different parameters
      - Different name, same parameters
      - Same function in multiple classes
      - A function with no body
    a: Same name, different parameters
---

## Classes & Objects

A class is a blueprint for objects:

```cpp
class Rectangle {
private:
    double width;
    double height;

public:
    Rectangle(double w, double h) {
        width = w;
        height = h;
    }

    double area() {
        return width * height;
    }
};

int main() {
    Rectangle rect(5.0, 3.0);
    cout << rect.area() << endl;  // 15
    return 0;
}
```

## Access Specifiers

- `private` — accessible only within the class (default)
- `public` — accessible from anywhere
- `protected` — accessible in the class and derived classes

## Constructors

A constructor has the same name as the class and no return type:

```cpp
class Student {
public:
    string name;
    int age;

    // Constructor
    Student(string n, int a) {
        name = n;
        age = a;
    }
};
```

## Encapsulation

Use getters and setters to control access:

```cpp
class BankAccount {
private:
    double balance;

public:
    BankAccount(double initial) {
        balance = initial;
    }

    double getBalance() {
        return balance;
    }

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
};
```

## Inheritance

A class can inherit from another:

```cpp
class Animal {
public:
    void speak() {
        cout << "Animal sound" << endl;
    }
};

class Dog : public Animal {
public:
    void speak() {
        cout << "Woof!" << endl;
    }
};
```

## Function Overloading

Multiple functions with the same name but different parameters:

```cpp
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }
```
