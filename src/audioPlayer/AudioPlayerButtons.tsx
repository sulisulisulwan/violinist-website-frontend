import * as React from 'react'
const  { useEffect } = React
import HoverButton from '../sharedComponents/HoverButtons'
import { audioPlayerStateIF } from '../Layout'

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
  

  const prevIcon = '/images/audio-player-icons/prev-512.png'
  const nextIcon = '/images/audio-player-icons/next-512.png'
  const playIcon = '/images/audio-player-icons/play-512.png'
  const pauseIcon = '/images/audio-player-icons/pause-512.png'

  const handlePlayPauseStop = () => { 
    const action = audioPlayerState.playerStatus === 'play' ? pausePlay : startPlay
    action(audioPlayer, setAudioPlayerState, audioPlayerState)
  }

  return (
    <li>
      <span className='btns'>
        <ul 
          style={{
            padding: 0, 
            display: 'flex',
            listStyleType: 'none'
          }}
          >
          <li><HoverButton imgSrc={prevIcon} onClickHandler={() => prev(audioPlayer, setAudioPlayerState, audioPlayerState)}/></li>
          <li><HoverButton imgSrc={nextIcon} onClickHandler={() => next(audioPlayer, setAudioPlayerState, audioPlayerState)}/></li>
          <li><HoverButton imgSrc={audioPlayerState.playerStatus === 'play' ? pauseIcon : playIcon } onClickHandler={handlePlayPauseStop}/></li>
        </ul>
      </span>
    </li>
  )
}

export default AudioPlayerButtons