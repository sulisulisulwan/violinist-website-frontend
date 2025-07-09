import * as React from 'react'
const { useContext} = React
import { pausePlayWithFadeOut } from '../audioPlayer/audioControls'
import { GlobalAppState } from '../Layout'
import { NAVY_BLUE_MED } from '../sharedStyles/colors'
// import config from '../config/config'

interface videoThumbnailPropsIF {
  thumbnail_id: number
  caption: string
  youtubeCode: string
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCurrYoutubeCode: React.Dispatch<React.SetStateAction<string>>
}

const VideoThumbnail = ({ thumbnail_id, caption, youtubeCode, setModalIsOpen, setCurrYoutubeCode }: videoThumbnailPropsIF) => {
  
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
    <div className='video-thumbnail-wrapper' onClick={ () => playYoutubeVideo() }>
      <div className={`video-thumbnail-img-wrapper${ isDarkMode ? ' video-thumbnail-img-wrapper-isdm' : '' }`}>
        <img className="video-thumbnail-img" src={`${config.getField('BACKEND_API_BASE_URL')}/photos?id=${thumbnail_id}`}/>
        <img className='video-thumbnail-img-overlay' src={'/images/play-button-overlay.png'}/>
      </div>
      <div className={`video-thumbnail-caption ${isDarkMode ? 'video-thumbnail-caption-isdm' : 'video-thumbnail-caption-notdm' }`}>
        {caption}
      </div>
    </div>
  )
}


export default VideoThumbnail