# Personal photographs

Add Jason’s actual images here. No fictional portraits or stock people are used.

The About portrait is `photographs.portrait` in `src/data/editorial.js`:

```js
{ src: '/photos/portrait.webp', alt: 'An accurate description of the photo', position: 'center 35%' }
```

Use WebP or JPEG, roughly 1200–1600px on the long edge, preferably below 300KB. `position` controls the crop. Empty or failed sources show the designed “photo coming soon” fallback.

Grouped memories used by the home collage live in `photographGroups` in the same file. The home about focal point is the single `selfie-spain.jpg` portrait, while the right-hand stack runs `spain.jpg`, `selfie-toronto.jpg`, then `toronto.jpg`. The travel stack is keyboard-friendly and flips through its related images.
