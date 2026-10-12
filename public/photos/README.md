# Personal photographs

## About hobby gallery

The photography selection is in `src/data/hobbies.js` (`photography`). The current
four entries are existing travel photos, not a selection verified against Instagram.
Save your chosen @cryojs exports in this directory and update `src`, `alt`, and
`caption` there. The gallery supports click-to-enlarge.

The same data file contains the seven YouTube edits in newest-first order.
No local videos are required for YouTube embeds. For faster hover previews,
place short muted MP4 exports in `public/videos/` and set each edit's `previewSrc`
to `/videos/filename.mp4`. Full playback still opens the YouTube player with sound
enabled and a direct YouTube fallback link. Browser autoplay rules and each video's
embedding permissions can affect playback.

Add Jason’s actual images here. No fictional portraits or stock people are used.

In `src/data/editorial.js`, update `photographs.portrait` and `photographs.everyday`:

```js
{ src: '/photos/portrait.webp', alt: 'An accurate description of the photo', position: 'center 35%', ... }
```

Use WebP or JPEG, roughly 1200–1600px on the long edge, preferably below 300KB. Portrait crops suit the first frame; the second works with landscape or portrait photographs. `position` controls the crop. Each photo is reused on Home and About. Empty or failed sources show the designed “photograph to come” fallback.

Grouped memories used by the home collage live in `photographGroups` in `src/data/editorial.js`. The home about focal point is the single `selfie-spain.jpg` portrait, while the right-hand stack runs `spain.jpg`, `selfie-toronto.jpg`, then `toronto.jpg`. The travel stack remains keyboard-friendly and flips through its related images.
