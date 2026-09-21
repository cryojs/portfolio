# Project media

Each portfolio project gets its own folder:

```text
public/projects/<project-id>/
  cover.png      # required still image
  preview.mp4    # optional hover video
```

Add or edit the matching project object in `src/data/portfolio.js`. Set `media.image` to the cover path and add `media.video` when a preview exists. Videos are muted, looped, and played only while the card is hovered.

Custom project layouts can reference more than one image. Tidebreak uses `gameplay.png` and `editor.png` from its GitHub README.
