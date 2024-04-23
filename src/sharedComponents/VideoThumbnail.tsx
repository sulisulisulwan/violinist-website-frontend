import * as React from 'react'
const { useContext} = React
import { pausePlayWithFadeOut } from '../audioPlayer/audioControls'
import { GlobalAppState } from '../Layout'
import { NAVY_BLUE_MED } from '../sharedStyles/colors'
// import config from '../config/config'

interface videoThumbnailPropsIF {
  videoId: number
  caption: string
  youtubeCode: string
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCurrYoutubeCode: React.Dispatch<React.SetStateAction<string>>
}

const VideoThumbnail = ({ videoId, caption, youtubeCode, setModalIsOpen, setCurrYoutubeCode }: videoThumbnailPropsIF) => {
  
  const { audioPlayerStateManagement, darkModeStateManagement, config } = useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement
  const [ audioPlayerState, setAudioPlayerState ] = audioPlayerStateManagement

  const playYoutubeVideo = () => {
    const audioPlayer = document.getElementById('player') as HTMLAudioElement
    pausePlayWithFadeOut(audioPlayer, setAudioPlayerState)
    if (setCurrYoutubeCode) {
      setCurrYoutubeCode(youtubeCode)
    }
    setModalIsOpen(true)
  }

  return (
    <div 
      onClick={ () => playYoutubeVideo() }
      style={{
        animation: 'fadeIn 1s linear'
      }}
    >
      <div style={{
        position: 'relative',
        top: 0,
        left: 0,
        border: isDarkMode ? 'solid .5px darkgray' : ''
      }}>
        <img 
          src={`${config.getField('BACKEND_API_BASE_URL')}/videos/thumbnail?id=${videoId}`}
          style={{
            maxWidth: '100%',
            aspectRatio: '2 / 1.5',
            position: 'relative',
            
          }}
        />
        <img
          src={'/images/play-button-overlay.png'}
          style={{
            position: 'absolute',
            margin: 'auto',
            width: 60,
            marginTop: -30,
            marginLeft: -30,
            top: '50%',
            left: '50%',
            animation: 'fadeIn 1s linear'
            // zIndex: 2
          }}
        />
      </div>
      <div
        style={{
        color: isDarkMode ? 'silver' : NAVY_BLUE_MED,
        fontFamily: "Mate, serif",
        fontWeight: 900,
        fontSize: 20,
        paddingTop: 20
      }}>
        {caption}
      </div>
    </div>
  )
}


export default VideoThumbnail