import * as React from 'react'
const { useContext } = React
import { GlobalAppState } from '../Layout'
import AudioPlayer from './AudioPlayer'

const AudioPlayerWrapper = () => {

  const { windowWidth, navBarIsWide } = useContext(GlobalAppState)
  const isMobile = windowWidth < 765

  const style: React.CSSProperties = {
    right: 0,
    position: 'fixed',
    zIndex: isMobile ? 500 : 4000,
  }

  const computed: React.CSSProperties = isMobile ? {
    ...style,
    bottom: 0,
    background: 'white',
    width: '100%'
  } : {
    ...style,
    top: navBarIsWide ? 15 : 0,
  }

  return <div className="audio-player-wrapper" style={computed}><AudioPlayer isMobile={isMobile}/></div>
  
}

export default AudioPlayerWrapper