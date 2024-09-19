import * as React from 'react'
import InfiniteMarquee from '../sharedComponents/InfiniteMarquee'

interface trackListingPropsIF {
  audioPlayerState: any
}

const TrackListing = ({ audioPlayerState }: trackListingPropsIF) => {


  let trackListingText = ''
  
  if (audioPlayerState.hasPlayedOnce) {
    trackListingText = audioPlayerState.playList[audioPlayerState.currentTrack]['author'].toUpperCase() + 
    ': ' +
    audioPlayerState.playList[audioPlayerState.currentTrack]['title'].toUpperCase()
  }

  return (
    <li style={{
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    }}>
      {
        !audioPlayerState.hasPlayedOnce ?  
          <div>
            <p 
              style={{
                margin: 0,
                padding: 0,
                bottom: 0,
                verticalAlign: 'bottom',
                cursor: 'default'
              }}
            >
              
              <span style={{
                color: 'gray',
                fontSize: 13,
              }}>LISTEN TO SULIMAN</span>
            </p>
          </div>      
          :
          <>
            <InfiniteMarquee 
              text={trackListingText} 
              fontSize={13} 
              color={'gray'}
              scrollCycleDuration={20}
            />
            {/* <span style={{
              color: 'gray',
              fontSize: 13,
            }}>{audioPlayerState.playList[audioPlayerState.currentTrack]['author'].toUpperCase()}: </span>
            <span style={{
              color: 'gray',
              fontSize: 13,
            }}>{audioPlayerState.playList[audioPlayerState.currentTrack]['title'].toUpperCase()}</span> */}
          </>
      }

    </li>
  )
}

export default TrackListing