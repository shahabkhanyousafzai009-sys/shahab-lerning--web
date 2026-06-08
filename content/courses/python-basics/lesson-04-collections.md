---
title: Python Collections
description: Lists, tuples, dictionaries, and sets in Python
order: 4
flashcards:
  - q: What type is an ordered, mutable collection in Python?
    a: list
  - q: What type is an immutable sequence?
    a: tuple
  - q: What type stores key-value pairs?
    a: dict
  - q: What type stores unique unordered elements?
    a: set
quiz:
  - q: How do you add an item to a list?
    o:
      - append()
      - add()
      - push()
      - insert()
    a: append()
  - q: What is the difference between a list and a tuple?
    o:
      - Lists are mutable, tuples are immutable
      - Tuples are mutable, lists are immutable
      - Lists can only store numbers
      - There is no difference
    a: Lists are mutable, tuples are immutable
  - q: How do you access a dictionary value?
    o:
      - dict["key"]
      - dict.key
      - dict->key
      - dict.get("key")
    a: dict["key"]
---

Python provides powerful built-in collection types.

## Lists (mutable, ordered)

```python
fruits = ["apple", "banana", "cherry"]
fruits.append("date")        # add to end
fruits.insert(1, "blueberry") # insert at index
fruits.remove("banana")      # remove by value
popped = fruits.pop()        # remove and return last

print(fruits[0])             # first element
print(fruits[-1])            # last element
print(len(fruits))           # number of items

# Slicing
print(fruits[1:3])           # index 1 to 2
print(fruits[::-1])          # reversed copy
```

### List Methods

```python
numbers = [3, 1, 4, 1, 5]
numbers.sort()               # [1, 1, 3, 4, 5]
numbers.reverse()            # [5, 4, 3, 1, 1]
numbers.count(1)             # 2
numbers.index(4)             # 2
```

### List Comprehensions

```python
squares = [x**2 for x in range(10)]     # [0,1,4,...,81]
evens = [x for x in range(20) if x % 2 == 0]
```

## Tuples (immutable, ordered)

```python
point = (3, 4)
x, y = point                # unpacking
print(x)                    # 3

# Tuples are faster and can be used as dictionary keys
coordinates = {(0, 0): "origin", (1, 0): "right"}
```

## Dictionaries (mutable, key-value)

```python
student = {
    "name": "Alice",
    "age": 20,
    "courses": ["Math", "CS"]
}

print(student["name"])       # "Alice"
student["grade"] = "A"       # add new key
student["age"] = 21          # update value

# Safe access with default
print(student.get("phone", "N/A"))  # "N/A"

# Iteration
for key, value in student.items():
    print(f"{key}: {value}")

for key in student.keys():   # keys only
for value in student.values():  # values only
```

## Sets (mutable, unordered, unique)

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a.add(5)                     # add element
a.remove(2)                  # remove (errors if missing)
a.discard(10)                # remove (no error)

print(a | b)                 # union: {1,2,3,4,5,6}
print(a & b)                 # intersection: {3,4}
print(a - b)                 # difference: {1,2}
print(a ^ b)                 # symmetric difference: {1,2,5,6}
```

Sets are great for removing duplicates:

```python
unique = set([1, 2, 2, 3, 3, 3])  # {1, 2, 3}
```
