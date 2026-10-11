# Personal photographs

Add Jason’s actual images here. No fictional portraits or stock people are used.

In `src/data/editorial.js`, update `photographs.portrait` and `photographs.everyday`:

```js
{ src: '/photos/portrait.webp', alt: 'An accurate description of the photo', position: 'center 35%', ... }
```

Use WebP or JPEG, roughly 1200–1600px on the long edge, preferably below 300KB. Portrait crops suit the first frame; the second works with landscape or portrait photographs. `position` controls the crop. Each photo is reused on Home and About. Empty or failed sources show the designed “photograph to come” fallback.
