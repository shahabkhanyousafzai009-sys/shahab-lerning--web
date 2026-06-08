---
title: Multimedia & Embedding
description: Images, video, audio, and iframes in HTML
order: 5
flashcards:
  - q: What tag embeds an image in HTML?
    a: img
  - q: What tag embeds a video in HTML5?
    a: video
  - q: What attribute in video shows playback controls?
    a: controls
  - q: What tag embeds external content like maps?
    a: iframe
quiz:
  - q: Which attribute is required for the img tag?
    o:
      - src
      - href
      - link
      - source
    a: src
  - q: What video attribute makes it start playing automatically?
    o:
      - autoplay
      - auto
      - play
      - start
    a: autoplay
  - q: What element provides fallback video sources?
    o:
      - source
      - src
      - fallback
      - track
    a: source
---

## Images

The `<img>` tag is self-closing and requires `src` and `alt`:

```html
<img src="photo.jpg" alt="Description of the image" width="800" height="600">
```

### Responsive Images with srcset

```html
<img
  src="small.jpg"
  srcset="small.jpg 480w, medium.jpg 768w, large.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Responsive image example"
>
```

## Video

HTML5's `<video>` element needs no plugins:

```html
<video controls width="640" height="360">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <p>Your browser doesn't support video.</p>
</video>
```

### Common Attributes
- `controls` — Show play/pause/volume controls
- `autoplay` — Start playing automatically (use with `muted`)
- `loop` — Repeat the video
- `muted` — Mute audio (required for autoplay in most browsers)
- `poster` — Thumbnail image before play

## Audio

```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  <p>Your browser doesn't support audio.</p>
</audio>
```

## Iframes

Embed external content like YouTube videos or maps:

```html
<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  width="560"
  height="315"
  allowfullscreen
  loading="lazy"
></iframe>
```

Always use `loading="lazy"` for off-screen iframes to improve performance.

## Figure & Figcaption

Group media with captions:

```html
<figure>
  <img src="chart.png" alt="Sales chart">
  <figcaption>Q1 2024 sales figures</figcaption>
</figure>
```
