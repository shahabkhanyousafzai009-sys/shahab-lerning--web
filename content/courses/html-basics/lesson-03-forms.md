---
title: HTML Forms
description: Building interactive forms with HTML
order: 3
flashcards:
  - q: What attribute defines the form submission URL?
    a: action
  - q: What HTTP method is used for form submission by default?
    a: GET
  - q: Which input type creates a clickable button?
    a: submit
quiz:
  - q: Which attribute specifies where to send form data?
    o:
      - action
      - method
      - target
      - submit
    a: action
  - q: What input type hides the typed characters?
    o:
      - password
      - text
      - hidden
      - secure
    a: password
  - q: Which element groups related form fields?
    o:
      - <fieldset>
      - <group>
      - <section>
      - <block>
    a: <fieldset>
---

Forms let users submit data to a server.

## Form Structure

```html
<form action="/submit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email">

  <button type="submit">Submit</button>
</form>
```

## Common Input Types

- `text` — Single line text
- `password` — Masked text
- `email` — Email format validation
- `number` — Numeric input
- `checkbox` — Multiple choice toggle
- `radio` — Single choice from options

## Best Practices

- Always use `<label>` elements linked to inputs via `for`/`id`
- Use `<fieldset>` and `<legend>` to group related inputs
- Mark required fields with the `required` attribute
- Use appropriate `type` values for better mobile UX
