import * as React from 'react'
const  { useEffect, useContext } = React
import HoverButtonWithImage from '../sharedComponents/HoverButtonWithImage'
import { GlobalAppState } from '../Layout'
import { audioPlayerStateIF } from './AudioPlayer'

interface audioPlayerButtonsPropsIF {
  next: Function
  prev: Function
  startPlay: Function
  pausePlay: Function
  audioPlayerState: audioPlayerStateIF
  setAudioPlayerState: React.Dispatch<React.SetStateAction<audioPlayerStateIF>>
  audioTagRef: null | React.RefObject<HTMLAudioElement>
}

const AudioPlayerButtons = ({ 
  next, 
  prev, 
  startPlay, 
  pausePlay, 
  audioPlayerState, 
  setAudioPlayerState, 
  audioTagRef 
}: audioPlayerButtonsPropsIF ) => {

  let audioPlayer = audioTagRef.current

  useEffect(() => {

    if (!audioPlayer) {
      audioPlayer = audioTagRef.current
      audioPlayer.onended = next as any
    }

    if (['next', 'prev'].includes(audioPlayerState.playerStatus)) {
      startPlay(audioPlayer, setAudioPlayerState, audioPlayerState)
    }
  }, [audioPlayerState.playerStatus])
  
  const { darkModeStateManagement } = useContext(GlobalAppState)

  const { isDarkMode } = darkModeStateManagement

  const prevIcon = `/images/audio-player-icons/media-step-backward-${isDarkMode ? 'white' : 'blue'}.png`
  const nextIcon = `/images/audio-player-icons/media-step-forward-${isDarkMode ? 'white' : 'blue'}.png`
  const playIcon = `/images/audio-player-icons/media-play-${isDarkMode ? 'white' : 'blue'}.png`
  const pauseIcon = `/images/audio-player-icons/media-pause-${isDarkMode ? 'white' : 'blue'}.png`

  const handlePlayPauseStop = () => { 
    const action = audioPlayerState.playerStatus === 'play' ? pausePlay : startPlay
    action(audioPlayer, setAudioPlayerState, audioPlayerState)
  }

  return (
    <li>
      <span className='btns'>
        <ul className="audio-player-buttons">
          <li><HoverButtonWithImage imgSrc={prevIcon} onClickHandler={() => prev(audioPlayer, setAudioPlayerState, audioPlayerState)}/></li>
          <li><HoverButtonWithImage imgSrc={nextIcon} onClickHandler={() => next(audioPlayer, setAudioPlayerState, audioPlayerState)}/></li>
          <li><HoverButtonWithImage imgSrc={audioPlayerState.playerStatus === 'play' ? pauseIcon : playIcon } onClickHandler={handlePlayPauseStop}/></li>
        </ul>
      </span>
    </li>
  )
}

export default AudioPlayerButtons