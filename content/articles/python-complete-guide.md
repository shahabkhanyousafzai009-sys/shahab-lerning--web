---
title: Python — The Complete Guide
description: Learn Python from scratch — variables, control flow, functions, collections, modules, file I/O, and best practices
author: DevLearn Team
published: 2026-06-08
tags: python, programming, beginner
---

Python is a versatile, beginner-friendly programming language used for web development, data science, automation, and more.

## Hello, World!

```python
print("Hello, World!")
```

## Variables and Data Types

Python is dynamically typed — you don't need to declare types:

```python
name = "Alice"       # str
age = 25             # int
height = 5.6         # float
is_student = True    # bool
hobbies = ["reading", "coding"]  # list
person = {"name": "Alice", "age": 25}  # dict

# Type checking
print(type(age))     # <class 'int'>
```

## Basic I/O

```python
name = input("Enter your name: ")
print(f"Hello, {name}!")     # f-string (formatted string)

age = int(input("Age: "))    # convert string to int
```

## Control Flow

```python
# Conditionals
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")

# For loop
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for fruit in ["apple", "banana", "cherry"]:
    print(fruit)

# While loop
count = 0
while count < 5:
    print(count)
    count += 1
```

## Functions

```python
def add(a, b):
    """Return the sum of a and b."""
    return a + b

def greet(name="World"):
    print(f"Hello, {name}!")

# Lambda (anonymous function)
square = lambda x: x ** 2
print(square(5))  # 25

# *args and **kwargs
def log(*args, **kwargs):
    print(f"args: {args}, kwargs: {kwargs}")

log(1, 2, 3, key="value")
```

## Collections

```python
# List — mutable, ordered
fruits = ["apple", "banana"]
fruits.append("cherry")
fruits.sort()

# Tuple — immutable, ordered
point = (3, 4)
x, y = point

# Dictionary — mutable, key-value
student = {"name": "Alice", "grade": "A"}
print(student.get("name", "Unknown"))

# Set — mutable, unordered, unique
unique = {1, 2, 2, 3}  # {1, 2, 3}

# List comprehension
squares = [x**2 for x in range(10) if x % 2 == 0]
```

## File I/O

```python
# Reading
with open("data.txt", "r") as f:
    content = f.read()
    lines = f.readlines()

# Writing
with open("output.txt", "w") as f:
    f.write("Hello, World!\n")

# Append
with open("output.txt", "a") as f:
    f.write("Another line\n")
```

## Error Handling

```python
try:
    num = int(input("Enter a number: "))
    result = 10 / num
except ValueError:
    print("Not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"Error: {e}")
else:
    print(f"Result: {result}")
finally:
    print("This always runs")
```

## Modules

```python
import math
import random
from datetime import datetime
import json

print(math.pi)               # 3.14159...
print(random.randint(1, 10)) # random integer
print(datetime.now())        # current date/time

# JSON
data = {"name": "Alice", "scores": [90, 85]}
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)
```

## Classes

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        print(f"{self.name} says Woof!")

    @property
    def human_years(self):
        return self.age * 7

my_dog = Dog("Buddy", 3)
my_dog.bark()
print(my_dog.human_years)  # 21
```

## Useful Standard Library Modules

```python
import os           # file system operations
import sys          # command-line arguments
import re           # regular expressions
import csv          # CSV files
import collections  # Counter, defaultdict
import itertools    # permutations, combinations
from pathlib import Path  # modern file paths
```

## Best Practices

1. Follow PEP 8 — use 4 spaces for indentation
2. Use snake_case for variables and functions
3. Write docstrings for functions and classes
4. Use type hints for clarity: `def add(a: int, b: int) -> int:`
5. Prefer list comprehensions over map/filter
6. Use `with` for file operations (auto-closes)
7. Keep functions small and focused
8. Test your code with assert or unittest
