

export default (color: string): any[] => {
  return [
    {
      label: 'Facebook',
      src: `/images/social-icons/facebook-${color}.png`,
      href: 'https://www.facebook.com/suliman.tekalli/'
    },
    {
      label: 'Instagram',
      src: `/images/social-icons/instagram-${color}.png`,
      href: 'https://www.instagram.com/sulimantekalli/'
    },
    {
      label: 'Spotify',
      src: `/images/social-icons/spotify-${color}.png`,
      href: 'https://open.spotify.com/artist/1DiEbc7q8bQyhRTI37HwLm'
    },
    {
      label: 'YouTube',
      src: `/images/social-icons/youtube-${color}.png`,
      href: 'https://www.youtube.com/channel/UCfoRFw4amTm0PIFtiOGRmvg'
    },
  ]
} 
