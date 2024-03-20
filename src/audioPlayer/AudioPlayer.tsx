import * as React from 'react'
const { useContext, useRef } = React
import TrackListing from './TrackListing'
import AudioPlayerButtons from './AudioPlayerButtons'
import { DARK_MODE_BACKGROUND_COLOR, NAVY_BLUE_MED } from '../sharedStyles/colors'
import { next, prev, startPlay, pausePlay, } from './audioControls'

import { GlobalAppState } from '../Layout'

interface audioPlayerPropsIF {
  audioPlayerIsMobileMode: boolean
}

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


const AudioPlayer = ({ audioPlayerIsMobileMode }: audioPlayerPropsIF) => {

  const { audioPlayerStateManagement, darkModeStateManagement } = useContext(GlobalAppState)
  const [ audioPlayerState, setAudioPlayerState ] = audioPlayerStateManagement
  const { isDarkMode } = darkModeStateManagement
  const audioTagRef = useRef(null)

  // to give space at the bottom of the site for the mobile player without obstructing the footer
  document.querySelector('body').style.marginBottom = audioPlayerIsMobileMode ? '50': '0'

  return (
    <div style={{
      margin: 0,
      display: 'flex',
    }}>
      <audio 
        id="player"
        ref={audioTagRef}
        autoPlay={true}
      ></audio>
      <div className="player"
        style={{
          width: '100%',
          backgroundColor: isDarkMode ? DARK_MODE_BACKGROUND_COLOR : 'white',
          borderTop: audioPlayerIsMobileMode ? `solid 2px ${isDarkMode ? 'white' : NAVY_BLUE_MED }` : 0,
          paddingTop: audioPlayerIsMobileMode ? 15: 0,
          paddingBottom: audioPlayerIsMobileMode ? 15: 0,
          paddingLeft: audioPlayerIsMobileMode ? 20: 0,
          paddingRight: audioPlayerIsMobileMode ? 20: 0,
        }}
      >
        <ul
          style={{
            padding: 0, 
            margin: 0,
            listStyleType: 'none',
            display: 'flex',
            justifyContent: audioPlayerIsMobileMode ? 'space-between' : ''
          }}
        >
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