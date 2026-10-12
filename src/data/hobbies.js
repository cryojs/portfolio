export const photography = [
  ['japan/japan1.jpg', 'A building framed by a park in Japan'],
  ['japan/japan2.jpg', 'Tall shopfronts in Japan'],
  ['japan/japan3.jpg', 'Sunset over a Japanese park'],
  ['japan/japan4.jpg', 'A Japanese street at dusk'],
  ['japan/japan5.jpg', 'A shopping street in Japan'],
  ['china/china1.jpg', 'City lights in China captured on a phone'],
  ['disneyworld/disney1.webp', 'A temple courtyard at Disney World'],
  ['disneyworld/disney2.webp', 'A pagoda among trees at Disney World'],
  ['disneyworld/disney5.webp', 'A garden at Disney World'],
  ['disneyworld/disney4.webp', 'A lakeside view at Disney World'],
  ['disneyworld/disney3.webp', 'The castle at Disney World'],
  ['spain/spain1.webp', 'Palm trees along a street in Spain'],
  ['toronto/toronto1.webp', 'A tower against the Toronto sky'],
  ['spain/spain3.webp', 'Flowers framed by branches in Spain'],
  ['spain/spain2.webp', 'Sunlit foliage in Spain'],
  ['toronto/toronto2.webp', 'Reflections on blue Toronto towers'],
  ['random/airplane.webp', 'An airplane wing at sunset'],
].map(([file, alt]) => ({ src: `/photos/gallery/${file}`, alt }))

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
