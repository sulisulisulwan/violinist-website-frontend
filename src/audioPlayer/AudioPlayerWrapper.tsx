import * as React from 'react'
const { useContext } = React
import { GlobalAppState } from '../Layout'
import AudioPlayer from './AudioPlayer'

const AudioPlayerWrapper = () => {

  const { audioPlayerIsMobileMode } = useContext(GlobalAppState)

  const style: React.CSSProperties = {
    right: 0,
    position: 'fixed',
    zIndex: audioPlayerIsMobileMode ? 500 : 4000,
  }

  const computed: React.CSSProperties = audioPlayerIsMobileMode ? {
    ...style,
    bottom: 0,
    background: 'white',
    width: '100%'
  } : {
    ...style,
    top: 5,
  }

  return <div className="audio-player-wrapper" style={computed}><AudioPlayer audioPlayerIsMobileMode={audioPlayerIsMobileMode}/></div>
  
}

export default AudioPlayerWrapper