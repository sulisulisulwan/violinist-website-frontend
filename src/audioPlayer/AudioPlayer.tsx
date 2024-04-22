import * as React from 'react'
const { useContext, useRef } = React
import TrackListing from './TrackListing'
import AudioPlayerButtons from './AudioPlayerButtons'
import { DARK_MODE_BACKGROUND_COLOR, NAVY_BLUE_MED } from '../sharedStyles/colors'
import { next, prev, startPlay, pausePlay, } from './audioControls'

import { GlobalAppState } from '../Layout'


export interface audioTrackDataIF {
  file: string
  author: string
  title: string
}


export interface audioPlayerStateIF {
  hasPlayedOnce: boolean,
  playList: audioTrackDataIF,
  playerStatus: string,
  currentTrack: number,
  progress: number
}


const AudioPlayer = () => {

  const { audioPlayerStateManagement, darkModeStateManagement, audioPlayerIsMobileMode } = useContext(GlobalAppState)
  const [ audioPlayerState, setAudioPlayerState ] = audioPlayerStateManagement
  const { isDarkMode } = darkModeStateManagement
  const audioTagRef = useRef(null)

  return (
    <div className="audio-player-wrapper">
      <audio id="player" ref={audioTagRef} autoPlay={true}/>
      <div className="audio-player"
        style={{
          backgroundColor: isDarkMode ? DARK_MODE_BACKGROUND_COLOR : 'white',
          borderTopColor: audioPlayerIsMobileMode ? `${isDarkMode ? 'white' : NAVY_BLUE_MED }` : '',
        }}
      >
        <ul className="audio-player-interface">
          <TrackListing audioPlayerState={audioPlayerState}/>
          <AudioPlayerButtons 
            next={next} 
            prev={prev} 
            pausePlay={pausePlay} 
            startPlay={startPlay} 
            audioTagRef={audioTagRef}
            audioPlayerState={audioPlayerState}
            setAudioPlayerState={setAudioPlayerState}
          />
        </ul>
      </div>
    </div>
  )
}



export default AudioPlayer