---
title: Python Variables & Data Types
description: Learn Python variables, data types, and basic I/O
order: 1
flashcards:
  - q: How do you print output in Python?
    a: print()
  - q: What function reads user input in Python?
    a: input()
  - q: What type does a variable get if you assign it the value 42?
    a: int
  - q: How do you check the type of a variable in Python?
    a: type()
quiz:
  - q: Which of these is a valid Python variable name?
    o:
      - my_var
      - 2nd_var
      - my-var
      - var two
    a: my_var
  - q: What does print(type(3.14)) output?
    o:
      - <class 'float'>
      - <class 'int'>
      - <class 'str'>
      - <class 'number'>
    a: <class 'float'>
  - q: Which function is used to get input from the user?
    o:
      - input()
      - read()
      - get()
      - scan()
    a: input()
---

Python is a versatile, beginner-friendly programming language known for its readable syntax.

## Your First Python Program

```python
print("Hello, World!")
```

## Variables

Variables store data. You don't need to declare a type — Python infers it:

```python
name = "Alice"
age = 25
height = 5.6
is_student = True
```

## Data Types

Python has several built-in data types:

- `int` — Whole numbers like `42`, `-7`, `0`
- `float` — Decimal numbers like `3.14`, `-0.5`
- `str` — Text like `"hello"`, `'world'`
- `bool` — `True` or `False`
- `list` — Ordered collections like `[1, 2, 3]`
- `dict` — Key-value pairs like `{"name": "Alice"}`

Use the `type()` function to check a variable's type:

```python
print(type(42))       # <class 'int'>
print(type("hello"))  # <class 'str'>
```

## Basic Input & Output

```python
name = input("Enter your name: ")
print(f"Hello, {name}!")
```

The `f` before the string creates an f-string, which lets you embed variables inside `{}`.

## Type Conversion

Convert between types using functions like `int()`, `float()`, and `str()`:

```python
age_str = "25"
age_int = int(age_str)
print(age_int + 5)  # 30
```

## Comments

Use `#` for single-line comments:

```python
# This is a comment
print("Comments are ignored by Python")
```
