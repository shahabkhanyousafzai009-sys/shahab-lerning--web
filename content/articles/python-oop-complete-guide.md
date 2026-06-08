---
title: Python OOP — The Complete Guide
description: Everything you need to know about object-oriented programming in Python, from classes to advanced patterns
author: DevLearn Team
published: 2026-06-08
tags: python, oop, programming
---

Object-oriented programming (OOP) is a paradigm that organizes code around objects — instances of classes that bundle data and behavior together. Python supports OOP natively and makes it elegant.

## Why OOP?

OOP helps manage complexity by grouping related data and functions into objects. Benefits include:

- **Modularity** — Objects are self-contained, making code easier to debug
- **Reusability** — Classes can be reused across projects
- **Maintainability** — Changes to one object rarely affect others
- **Modeling** — Real-world entities map naturally to objects

## Classes and Instances

A class is a blueprint. An instance is the actual object created from that blueprint.

```python
class Car:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
        self.odometer = 0

    def drive(self, miles):
        self.odometer += miles
        return f"Drove {miles} miles. Total: {self.odometer}"

    def info(self):
        return f"{self.year} {self.make} {self.model}"

my_car = Car("Tesla", "Model 3", 2024)
print(my_car.info())       # 2024 Tesla Model 3
print(my_car.drive(50))    # Drove 50 miles. Total: 50
print(my_car.drive(30))    # Drove 30 miles. Total: 80
```

## The `self` Parameter

Every instance method takes `self` as its first parameter. It references the current object. You don't pass it explicitly — Python does it automatically.

## Instance vs Class Attributes

```python
class Employee:
    company = "DevLearn Inc."  # class attribute — shared

    def __init__(self, name, salary):
        self.name = name       # instance attribute — unique
        self.salary = salary

e1 = Employee("Alice", 80000)
e2 = Employee("Bob", 75000)

print(e1.company)  # DevLearn Inc.
print(e2.company)  # DevLearn Inc.

Employee.company = "DevLearn Corp."
print(e1.company)  # DevLearn Corp.  (changed for all)
```

Class attributes are shared across all instances. Instance attributes are unique per object.

## Encapsulation

Encapsulation hides internal details and controls access:

```python
class Account:
    def __init__(self, owner, initial=0):
        self.owner = owner
        self.__balance = initial  # name-mangled "private" attribute

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return True
        return False

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            return True
        return False

    @property
    def balance(self):
        return self.__balance

acc = Account("Alice", 1000)
acc.deposit(500)
print(acc.balance)  # 1500
# acc.__balance  # AttributeError (name mangling)
```

Python uses conventions:
- `_var` — protected (internal use)
- `__var` — name mangling (avoid subclass conflicts)

## Inheritance

A class can inherit from another, gaining all its attributes and methods:

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def move(self):
        return f"{self.name} moves"

class Bird(Animal):
    def move(self):
        return f"{self.name} flies"

class Fish(Animal):
    def move(self):
        return f"{self.name} swims"

animals = [Bird("Eagle"), Fish("Salmon"), Animal("Unknown")]
for a in animals:
    print(a.move())
```

## The `super()` Function

Call the parent class's methods explicitly:

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)

    def __str__(self):
        return f"Square with side {self.width}"

sq = Square(5)
print(sq.area())   # 25
print(sq)          # Square with side 5
```

## Polymorphism

Different classes can implement the same interface in their own way:

```python
class JSONSerializer:
    def serialize(self, data):
        import json
        return json.dumps(data)

class XMLSerializer:
    def serialize(self, data):
        # Simplified XML conversion
        parts = [f"  <{k}>{v}</{k}>" for k, v in data.items()]
        return f"<data>\n" + "\n".join(parts) + "\n</data>"

def save_data(serializer, data, filename):
    with open(filename, "w") as f:
        f.write(serializer.serialize(data))

save_data(JSONSerializer(), {"name": "Alice"}, "data.json")
save_data(XMLSerializer(), {"name": "Alice"}, "data.xml")
```

## Dunder Methods

Double-underscore methods let you define how objects behave with Python operators:

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)

v1 = Vector(3, 4)
v2 = Vector(1, 2)
v3 = v1 + v2       # Vector(4, 6)
v4 = v1 * 2        # Vector(6, 8)
print(v3)          # Vector(4, 6)
print(len(v1))     # 5
print(v1 == Vector(3, 4))  # True
```

## Composition Over Inheritance

Composition builds objects from other objects:

```python
class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower

    def start(self):
        return "Engine started"

class Wheels:
    def __init__(self, count):
        self.count = count

    def rotate(self):
        return f"{self.count} wheels spinning"

class Car:
    def __init__(self, make, model):
        self.make = make
        self.model = model
        self.engine = Engine(300)
        self.wheels = Wheels(4)

    def drive(self):
        return f"{self.engine.start()} — {self.wheels.rotate()}"

tesla = Car("Tesla", "Model 3")
print(tesla.drive())
# "Engine started — 4 wheels spinning"
```

Favor composition over inheritance where possible — it's more flexible.

## Abstract Base Classes

Define interfaces that subclasses must implement:

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

    def perimeter(self):
        return 2 * 3.14159 * self.radius

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h

    def area(self):
        return self.w * self.h

    def perimeter(self):
        return 2 * (self.w + self.h)
```

Abstract methods must be implemented by every concrete subclass, or it can't be instantiated.

## Class Methods and Static Methods

```python
class Pizza:
    def __init__(self, ingredients):
        self.ingredients = ingredients

    @classmethod
    def margherita(cls):
        return cls(["mozzarella", "tomato", "basil"])

    @classmethod
    def pepperoni(cls):
        return cls(["mozzarella", "tomato", "pepperoni"])

    @staticmethod
    def oven_temp():
        return 250

p1 = Pizza.margherita()
p2 = Pizza.pepperoni()
print(p1.ingredients)   # ['mozzarella', 'tomato', 'basil']
print(Pizza.oven_temp())  # 250
```

## Property Decorators in Depth

Properties let you define computed attributes with getter/setter/deleter:

```python
class Student:
    def __init__(self, name, score=0):
        self.name = name
        self._score = score

    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        if not 0 <= value <= 100:
            raise ValueError("Score must be 0-100")
        self._score = value

    @score.deleter
    def score(self):
        del self._score

    @property
    def grade(self):
        if self.score >= 90: return "A"
        if self.score >= 80: return "B"
        if self.score >= 70: return "C"
        if self.score >= 60: return "D"
        return "F"

s = Student("Alice", 85)
print(s.grade)   # B
s.score = 95
print(s.grade)   # A
```

## Multiple Inheritance

Python supports inheriting from multiple classes:

```python
class Flyer:
    def fly(self):
        return "Flying"

class Swimmer:
    def swim(self):
        return "Swimming"

class Duck(Flyer, Swimmer):
    def quack(self):
        return "Quack!"

d = Duck()
print(d.fly())    # Flying
print(d.swim())   # Swimming
print(d.quack())  # Quack!
```

Method resolution follows the MRO (Method Resolution Order), accessible via `ClassName.__mro__`.

## Best Practices

1. **Single Responsibility** — A class should do one thing well
2. **Keep `__init__` simple** — Accept essential data, compute the rest lazily
3. **Use properties over getters/setters** — Pythonic and cleaner
4. **Prefer composition** over inheritance when possible
5. **Use `@classmethod` for alternative constructors**
6. **Use `@staticmethod` for utility functions related to the class**
7. **Document your classes** with docstrings
8. **Write `__repr__` for debugging** — it should recreate the object
9. **Use dataclasses** for simple data containers

## Dataclasses (Python 3.7+)

For simple data-holding classes, Python provides a shortcut:

```python
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

    def distance_from(self, other):
        return ((self.x - other.x)**2 + (self.y - other.y)**2)**0.5

p1 = Point(0, 0)
p2 = Point(3, 4)
print(p1)                       # Point(x=0, y=0)
print(p1.distance_from(p2))    # 5.0
print(p1 == Point(0, 0))       # True (auto-generated __eq__)
```

Dataclasses auto-generate `__init__`, `__repr__`, `__eq__`, and more.

## Putting It All Together

Here is a complete example combining multiple OOP concepts:

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List

@dataclass
class Transaction:
    amount: float
    description: str

class Account(ABC):
    def __init__(self, owner: str, initial: float = 0):
        self.owner = owner
        self._balance = initial
        self._transactions: List[Transaction] = []

    @property
    def balance(self) -> float:
        return self._balance

    def deposit(self, amount: float, desc: str = "") -> bool:
        if amount > 0:
            self._balance += amount
            self._transactions.append(Transaction(amount, desc or "Deposit"))
            return True
        return False

    @abstractmethod
    def withdraw(self, amount: float) -> bool:
        pass

    @property
    def statement(self) -> str:
        lines = [f"Account: {self.owner}", f"Balance: ${self.balance:.2f}", ""]
        for t in self._transactions:
            lines.append(f"  {t.description}: ${t.amount:.2f}")
        return "\n".join(lines)

class SavingsAccount(Account):
    def __init__(self, owner: str, initial: float = 0):
        super().__init__(owner, initial)
        self._withdrawal_limit = 3
        self._withdrawals = 0

    def withdraw(self, amount: float) -> bool:
        if self._withdrawals >= self._withdrawal_limit:
            return False
        if 0 < amount <= self._balance:
            self._balance -= amount
            self._withdrawals += 1
            self._transactions.append(Transaction(amount, "Withdrawal"))
            return True
        return False

# Usage
acc = SavingsAccount("Alice", 1000)
acc.deposit(500, "Salary")
acc.withdraw(200)
print(acc.statement)
```

This guide covers everything you need to write professional, object-oriented Python code. Practice by modeling real-world systems — a library, a parking garage, a chess game — and the patterns will become second nature.
