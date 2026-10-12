# Project media

Each portfolio project gets its own folder:

```text
public/projects/<project-id>/
  cover.png        # optional primary still image
  preview.webm     # optional video slide (mp4 is fine too)
  gallery-*.png    # optional additional gallery slides
```

Put additional project gallery files in the matching folder, then add them to that project's `media.gallery` array in `src/data/portfolio.js`. Use `type: 'video'` for a video slide, `type: 'image'` for an image slide, and `type: 'collage'` with an `images` array when several portrait captures should read as one slide. Videos appear first and use native playback controls, with no hover or viewport autoplay. Images can be expanded by clicking them.

For example, Readify files go in `public/projects/readify/` and Tidebreak files go in `public/projects/tidebreak/`. All banners share a responsive height, and media fits without cropping. Colors and decoration are defined in `src/components/ProjectGallery.css`.

Give each image or collage a short `caption` describing the screen or feature shown, alongside its more detailed `alt` text. The caption appears in the banner header; video slides are labeled “demo”.
