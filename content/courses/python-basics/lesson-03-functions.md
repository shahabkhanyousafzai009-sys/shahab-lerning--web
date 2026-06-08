---
title: Python Functions
description: Defining and using functions in Python
order: 3
flashcards:
  - q: What keyword defines a function in Python?
    a: def
  - q: How do you return a value from a function?
    a: return
  - q: What do you call a value passed to a function?
    a: argument
  - q: What is the default return value of a function without return?
    a: "None"
quiz:
  - q: Which keyword defines a function in Python?
    o:
      - def
      - function
      - func
      - define
    a: def
  - q: "What will this return? def add(a, b): return a + b add(2, 3)"
    o:
      - "5"
      - "23"
      - "None"
      - error
    a: "5"
  - q: A parameter with a default value is called a...
    o:
      - default parameter
      - required parameter
      - keyword parameter
      - optional parameter
    a: default parameter
  - q: What does a function return if no return statement is used?
    o:
      - "None"
      - "0"
      - "False"
      - undefined
    a: "None"
---

Functions let you group reusable code into named blocks.

## Defining a Function

Use the `def` keyword followed by the function name and parentheses:

```python
def greet():
    print("Hello, World!")

greet()  # Call the function
```

## Parameters & Arguments

Pass data into functions using parameters:

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
```

## Return Values

Use `return` to send a value back to the caller:

```python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8
```

A function without `return` implicitly returns `None`.

## Default Parameters

Provide default values for optional parameters:

```python
def greet(name="World"):
    print(f"Hello, {name}!")

greet()          # Hello, World!
greet("Alice")   # Hello, Alice!
```

## Multiple Return Values

Return multiple values as a tuple:

```python
def min_max(nums):
    return min(nums), max(nums)

low, high = min_max([3, 1, 7, 2, 9])
print(low, high)  # 1 9
```

## Docstrings

Document your functions with triple-quoted strings:

```python
def multiply(a, b):
    """Return the product of a and b."""
    return a * b
```

## Scope

Variables defined inside a function are local to that function:

```python
def my_func():
    x = 10  # local variable
    print(x)

my_func()
# print(x)  # This would cause an error
```

## Practice

Try writing a function that takes a list of numbers and returns their average.
