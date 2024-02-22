import * as React from 'react'

interface trackListingPropsIF {
  audioPlayerState: any
}

const TrackListing = ({ audioPlayerState }: trackListingPropsIF) => {

  return (
    <li style={{
      paddingRight: 20,
      lineHeight:   2
    }}>
      <p 
        style={{
          margin: 0,
          padding: 0,
          bottom: 0,
          verticalAlign: 'bottom',
          cursor: 'default'
        }}
      >
        {
          !audioPlayerState.hasPlayedOnce ?
            <span style={{
              color: 'gray',
              fontSize: 13,
            }}>LISTEN TO SULIMAN</span>
          :
          <>
            <span style={{
              color: 'gray',
              fontSize: 13,
            }}>{audioPlayerState.playList[audioPlayerState.currentTrack]['author'].toUpperCase()}: </span>
            <span style={{
              color: 'gray',
              fontSize: 13,
            }}>{audioPlayerState.playList[audioPlayerState.currentTrack]['title'].toUpperCase()}</span>
          </>

        }
      </p>
    </li>
  )
}

export default TrackListing