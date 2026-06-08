---
title: Python OOP — Classes & Objects
description: Master object-oriented programming in Python — classes, inheritance, polymorphism, dunder methods
order: 6
flashcards:
  - q: What keyword defines a class in Python?
    a: class
  - q: What method is called when an object is created?
    a: __init__
  - q: What does self refer to in a class method?
    a: The current instance of the class
  - q: What is inheritance in OOP?
    a: A class deriving properties from another class
quiz:
  - q: How do you create an instance of a class named Car?
    o:
      - my_car = Car()
      - my_car = new Car()
      - my_car = Car.create()
      - my_car = Car.new()
    a: my_car = Car()
  - q: What is the first parameter of every instance method?
    o:
      - self
      - cls
      - this
      - instance
    a: self
  - q: What does super() do?
    o:
      - Calls the parent class method
      - Creates a new object
      - Deletes an object
      - Returns the class name
    a: Calls the parent class method
  - q: Which method returns a string representation of an object?
    o:
      - __str__
      - __repr__
      - __len__
      - __init__
    a: __str__
---

Object-oriented programming (OOP) is a paradigm that organizes code around objects rather than functions.

## Defining a Class

A class is a blueprint for creating objects:

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        print(f"{self.name} says Woof!")

    def get_human_years(self):
        return self.age * 7
```

## Creating Objects (Instances)

```python
my_dog = Dog("Buddy", 3)
print(my_dog.name)            # "Buddy"
print(my_dog.get_human_years())  # 21
my_dog.bark()                 # "Buddy says Woof!"
```

Each object has its own copy of instance attributes `name` and `age`.

## The __init__ Method

The constructor is called automatically when creating an object:

```python
class Student:
    def __init__(self, name, grade, courses=None):
        self.name = name
        self.grade = grade
        self.courses = courses or []

    def add_course(self, course):
        self.courses.append(course)

alice = Student("Alice", "A")
alice.add_course("Math")
alice.add_course("Physics")
print(alice.courses)  # ["Math", "Physics"]
```

## Instance vs Class Attributes

```python
class BankAccount:
    interest_rate = 0.02  # class attribute — shared by all instances

    def __init__(self, owner, balance=0):
        self.owner = owner      # instance attribute — unique per object
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

acc1 = BankAccount("Alice", 1000)
acc2 = BankAccount("Bob", 500)

print(acc1.interest_rate)  # 0.02
BankAccount.interest_rate = 0.03  # changes for all instances
```

## Inheritance

A class can inherit attributes and methods from a parent class:

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound")

class Cat(Animal):
    def speak(self):
        print(f"{self.name} says Meow!")

class Dog(Animal):
    def speak(self):
        print(f"{self.name} says Woof!")

animals = [Cat("Whiskers"), Dog("Buddy")]
for a in animals:
    a.speak()
# Whiskers says Meow!
# Buddy says Woof!
```

## Using super()

Call the parent class's methods:

```python
class Vehicle:
    def __init__(self, brand, year):
        self.brand = brand
        self.year = year

    def info(self):
        return f"{self.brand} ({self.year})"

class Car(Vehicle):
    def __init__(self, brand, year, doors):
        super().__init__(brand, year)  # call parent constructor
        self.doors = doors

    def info(self):
        return f"{super().info()} — {self.doors} doors"

tesla = Car("Tesla", 2024, 4)
print(tesla.info())  # "Tesla (2024) — 4 doors"
```

## Encapsulation

Use underscores to indicate private attributes:

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance  # "protected" by convention
        self.__pin = "1234"      # name mangling for "private"

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def get_balance(self):
        return self._balance

    def verify_pin(self, pin):
        return self.__pin == pin
```

- Single underscore `_var` — convention for internal use
- Double underscore `__var` — triggers name mangling to avoid subclass conflicts

## Property Decorators

Use `@property` for controlled attribute access:

```python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

temp = Temperature(25)
print(temp.fahrenheit)  # 77.0
temp.celsius = 30
print(temp.fahrenheit)  # 86.0
```

## Class Methods & Static Methods

```python
class MathUtils:
    @classmethod
    def from_string(cls, text):
        """Alternative constructor"""
        return cls()

    @staticmethod
    def add(a, b):
        """No access to class or instance"""
        return a + b

print(MathUtils.add(5, 3))  # 8
```

## Dunder (Magic) Methods

Special methods wrapped in double underscores:

```python
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def __str__(self):
        return f"{self.title} by {self.author}"

    def __repr__(self):
        return f"Book('{self.title}', '{self.author}', {self.pages})"

    def __len__(self):
        return self.pages

    def __eq__(self, other):
        return self.title == other.title and self.author == other.author

book = Book("1984", "George Orwell", 328)
print(str(book))       # "1984 by George Orwell"
print(len(book))       # 328
print(repr(book))      # Book('1984', 'George Orwell', 328)
```

## Composition

Build complex objects by combining simpler ones:

```python
class Engine:
    def start(self):
        return "Engine running"

class Wheels:
    def rotate(self):
        return "Wheels spinning"

class Car:
    def __init__(self):
        self.engine = Engine()
        self.wheels = [Wheels() for _ in range(4)]

    def drive(self):
        return f"{self.engine.start()} — {self.wheels[0].rotate()}"
```

## Practice Challenge

Create a `Library` class that manages a collection of `Book` objects. Include methods to add, remove, search by title, and count books by author.
