
export interface audioTrackDataIF {
  file: string
  author: string
  title: string
}

const playList: audioTrackDataIF[] = [
  { 
    file: '/audio-assets/ravel_tombeau_menuet.mp3',
    author: 'Maurice Ravel, arr. Suliman Tekalli',
    title: 'Le tombeau de Couperin, I: Prelude'
  },
  {
    file: '/audio-assets/granados_el_pelele.mp3',
    author: 'Enrique Granados, arr. Suliman Tekalli',
    title: 'El Pelele' 
  },
  {
    file: '/audio-assets/evans_waltz_for_debby.mp3',
    author: 'Bill Evans, arr. Suliman Tekalli',
    title: 'Waltz for Debby' 
  },
]

export default playList