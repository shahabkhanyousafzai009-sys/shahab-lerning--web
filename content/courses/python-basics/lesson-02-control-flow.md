---
title: Python Control Flow
description: Conditionals and loops in Python
order: 2
flashcards:
  - q: What keyword starts a conditional block in Python?
    a: if
  - q: What keyword is used for the else-if condition in Python?
    a: elif
  - q: Which loop repeats while a condition is true?
    a: while
  - q: What function generates a sequence of numbers in Python?
    a: range()
quiz:
  - q: "What will this output? if 5 > 3: print(\"yes\")"
    o:
      - yes
      - nothing
      - error
      - "True"
    a: yes
  - q: Which loop is best for iterating over a list?
    o:
      - for
      - while
      - do-while
      - repeat
    a: for
  - q: What keyword exits a loop immediately?
    o:
      - break
      - exit
      - stop
      - return
    a: break
  - q: What does range(3) produce?
    o:
      - "[0, 1, 2]"
      - "[1, 2, 3]"
      - "[0, 1, 2, 3]"
      - "[1, 2]"
    a: "[0, 1, 2]"
---

Control flow lets your program make decisions and repeat actions.

## Conditionals: if / elif / else

```python
age = 18

if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")
```

Python uses **indentation** (spaces or tabs) to define blocks — don't forget the colon `:`.

## Comparison Operators

| Operator | Meaning       |
|----------|---------------|
| `==`     | Equal to      |
| `!=`     | Not equal to  |
| `<`      | Less than     |
| `>`      | Greater than  |
| `<=`     | Less or equal |
| `>=`     | Greater or equal |

## Logical Operators

Combine conditions with `and`, `or`, and `not`:

```python
score = 85
if score >= 80 and score <= 100:
    print("Great job!")
```

## For Loops

Iterate over sequences with `for`:

```python
# Loop over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Loop using range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4
```

## While Loops

Repeat while a condition holds true:

```python
count = 0
while count < 5:
    print(count)
    count += 1
```

## Loop Control: break and continue

- `break` — Exit the loop entirely
- `continue` — Skip to the next iteration

```python
for i in range(10):
    if i == 3:
        continue  # skip 3
    if i == 7:
        break     # stop at 7
    print(i)
```
