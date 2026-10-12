// Replace these existing travel photos with your selected Instagram exports.
// Keep a descriptive alt and caption alongside each replacement.
export const photography = [
  { src: '/photos/japan.jpg', alt: 'A view from Japan', caption: 'japan' },
  { src: '/photos/great-wall-of-china.jpg', alt: 'The Great Wall of China', caption: 'china' },
  { src: '/photos/spain.jpg', alt: 'Flowers and greenery in Spain', caption: 'spain' },
  { src: '/photos/toronto.jpg', alt: 'A view from Toronto', caption: 'toronto' },
]

// Newest first, as supplied. Optional previewSrc supports local muted MP4 clips.
// Titles can be added here; no unverified YouTube titles are invented.
export const motionEdits = [
  'vxETFSMZD_E',
  'm9wu3Buanhs',
  'zkKrLiWMidE',
  'J7wFk-J1X0Q',
  'Odoj9_lRD6s',
  'goz1nkFMPfk',
  'D4KkHJEg3EE',
  'zM0IOky0n5E',
].map((id) => ({ id, title: 'motion / vfx', previewSrc: '' }))
