---
title: Python Modules, Files & Error Handling
description: Importing modules, reading/writing files, and try/except
order: 5
flashcards:
  - q: What keyword imports a module in Python?
    a: import
  - q: What function opens a file in Python?
    a: open()
  - q: What block catches exceptions in Python?
    a: except
  - q: What keyword defines a block of code that always runs?
    a: finally
quiz:
  - q: How do you read an entire file as a string?
    o:
      - file.read()
      - file.read_all()
      - file.get()
      - file.contents()
    a: file.read()
  - q: What mode opens a file for writing?
    o:
      - w
      - r
      - a
      - x
    a: w
  - q: What does with open() do automatically?
    o:
      - Closes the file when done
      - Opens the file in read mode
      - Creates the file if missing
      - Returns a string
    a: Closes the file when done
---

## Importing Modules

Python's standard library has modules for everything:

```python
import math
import random
from datetime import datetime
from pathlib import Path

print(math.pi)                # 3.14159...
print(random.randint(1, 10)) # random int between 1-10
print(datetime.now())        # current date and time
```

### Common Useful Modules

```python
import os                    # operating system interface
import sys                   # system-specific parameters
import json                  # JSON parsing
import re                    # regular expressions
import csv                   # CSV file handling
import collections           # advanced data structures
```

## File Reading

### Reading Entire File

```python
with open("data.txt", "r") as file:
    content = file.read()
    print(content)
# File is automatically closed after the block
```

### Reading Line by Line

```python
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())  # strip removes trailing newline

# Read all lines into a list
with open("data.txt", "r") as file:
    lines = file.readlines()
```

## File Writing

```python
# Write (overwrites existing)
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("Second line\n")

# Append (adds to existing)
with open("output.txt", "a") as file:
    file.write("Third line\n")
```

### File Modes

| Mode | Description |
|------|-------------|
| `r` | Read (default) |
| `w` | Write (overwrites) |
| `a` | Append |
| `x` | Exclusive creation (fails if exists) |
| `r+` | Read and write |

## Error Handling with Try/Except

```python
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result: {result}")
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"An error occurred: {e}")
else:
    print("No errors occurred!")
finally:
    print("This always runs.")
```

### Common Exception Types

- `ValueError` — wrong value
- `TypeError` — wrong type
- `FileNotFoundError` — file doesn't exist
- `KeyError` — dictionary key missing
- `IndexError` — list index out of range
- `ZeroDivisionError` — division by zero

## Working with JSON

```python
import json

# Writing JSON
data = {"name": "Alice", "age": 25, "scores": [90, 85, 92]}
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# Reading JSON
with open("data.json", "r") as f:
    loaded = json.load(f)
    print(loaded["name"])  # "Alice"
```
