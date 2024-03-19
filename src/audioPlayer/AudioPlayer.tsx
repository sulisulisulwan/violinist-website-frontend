import * as React from 'react'
const { useContext, useRef } = React
import TrackListing from './TrackListing'
import AudioPlayerButtons from './AudioPlayerButtons'
import { NAVY_BLUE_MED } from '../sharedStyles/colors'
import { next, prev, startPlay, pausePlay, } from './audioControls'

import { GlobalAppState } from '../Layout'

interface audioPlayerPropsIF {
  isMobile: boolean
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


const AudioPlayer = ({ isMobile }: audioPlayerPropsIF) => {

  const { audioPlayerStateManagement, darkModeStateManagement } = useContext(GlobalAppState)
  const [ audioPlayerState, setAudioPlayerState ] = audioPlayerStateManagement
  const { isDarkMode } = darkModeStateManagement
  const audioTagRef = useRef(null)

  // to give space at the bottom of the site for the mobile player without obstructing the footer
  document.querySelector('body').style.marginBottom = isMobile ? '50': '0'

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
          backgroundColor: isDarkMode ? 'rgb(15, 14, 32)' : 'white',
          borderTop: isMobile ? `solid 2px ${isDarkMode ? 'white' : NAVY_BLUE_MED }` : 0,
          paddingTop: isMobile ? 15: 0,
          paddingBottom: isMobile ? 15: 0,
          paddingLeft: isMobile ? 20: 0,
          paddingRight: isMobile ? 20: 0,
        }}
      >
        <ul
          style={{
            padding: 0, 
            margin: 0,
            listStyleType: 'none',
            display: 'flex',
            justifyContent: isMobile ? 'space-between' : ''
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