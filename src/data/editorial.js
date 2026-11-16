// Add your own files to public/photos, then set src to '/photos/filename.webp'.
// Empty or failed sources intentionally render a designed, labelled photo placeholder.
export const photographs = {
  portrait: {
    src: '/photos/selfie-spain.webp',
    alt: 'Jason outdoors in Spain',
    label: 'A face to the name',
    index: '01',
    position: 'center 45%',
  },
}

export const photographGroups = {
  spain: [
    {
      src: '/photos/selfie-spain.webp',
      alt: 'Jason outdoors in Spain',
      position: 'center 45%',
    },
  ],
  toronto: [
    {
      src: '/photos/spain.webp',
      alt: 'A view from Spain',
      position: 'center',
    },
    {
      src: '/photos/selfie-toronto.webp',
      alt: 'Jason outdoors in Toronto',
      position: 'center',
    },
    {
      src: '/photos/toronto.webp',
      alt: 'A view from Toronto',
      position: 'center',
    },
  ],
  travel: [
    {
      src: '/photos/disney.webp',
      alt: 'A day at Disney',
      position: 'center',
    },
    {
      src: '/photos/japan.webp',
      alt: 'A view from Japan',
      position: 'center',
    },
    {
      src: '/photos/japan-uniqlo.webp',
      alt: 'A detail from Japan',
      position: 'center',
    },
    {
      src: '/photos/china2.webp',
      alt: 'A view from China',
      position: 'center',
    },
    {
      src: '/photos/great-wall-of-china.webp',
      alt: 'The Great Wall of China',
      position: 'center',
    },
  ],
}

export const aboutCopy = {
  next: [
    'exploring backend development and ML',
    'tackling harder algorithmic coding problems',
    'making room for fun and the whimsical!',
  ],
}
