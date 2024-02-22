import React, { useState } from 'react'
import HeroImageSlideshow from '../sharedComponents/HeroImageSlideshow'
import { useWindowWidth } from '../hooks/useWindowWidth'
import playlist from '../audioPlayer/dummyPlaylist'
import AudioPlayerWrapper from '../audioPlayer/AudioPlayerWrapper'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { GlobalAppState } from '../Layout'
import { useRouteError } from 'react-router-dom'


const ErrorPage = () => {

  const heroPhotos1 = [
    '/images/SESSION/adjusted_for_hero_DSCF1527.jpg',
  ]

  const windowWidth = useWindowWidth()

  const [ audioPlayerState, setAudioPlayerState ] = useState({
    hasPlayedOnce: false,
    playList: playlist,
    playerStatus: 'stop',
    currentTrack: 0,
    progress: 0
  })

  const globalAppState = { 
    windowWidth, 
    globalSidePadding: windowWidth <= 600 ? '22px' 
    : windowWidth <= 800 ? '32px' 
    : windowWidth <= 1000 ? '42px' 
    : windowWidth <= 1200 ? '52px' 
    : '62px',
    navBarIsWide: windowWidth > 1080,
    audioPlayerStateManagement: [ audioPlayerState, setAudioPlayerState ]
  }

  const error = useRouteError()


  let message = 'Something went wrong....'
  let errorCode = error.status

  if (error.status === 404) {
    message = 'Sorry, this page doesn\'t exist!'
  } else if (error.status === 400) {
    message = 'Sorry, can\'t do that...'
  } else if (error.status === 401) {
    message = 'Sorry, you are not authorized to do what you\'re trying to do here!'
  } else if (error.status === 403) {
    message = 'Sorry, this content is forbidden!'
  } else if (error.status === 500) {
    message = 'Sorry, there was an error with our server!'
  }

  return (
    <GlobalAppState.Provider value={globalAppState}>
      <div id="isLoaded"></div>
      <Header/>
      <main style={{
        paddingLeft: globalAppState.globalSidePadding,
        paddingRight: globalAppState.globalSidePadding,
        paddingBottom: 30,
        fontSize: 13
      }}>
        <HeroImageSlideshow imageSrcArray={heroPhotos1}/>
        <div
          style={{
            fontFamily: 'Mate',
            padding: 100,
            textAlign: 'center',
            fontSize: 20
          }}
        >
          {errorCode ? errorCode + ': ' : ''} {message}
        </div>
      </main>
      <Footer/>
      <AudioPlayerWrapper/>
    </GlobalAppState.Provider>

  )
}

export default ErrorPage