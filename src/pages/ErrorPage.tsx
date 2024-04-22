import * as React from 'react'
import * as ReactDom from 'react-dom'
import AudioPlayerWrapper from '../audioPlayer/AudioPlayerWrapper'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { GlobalAppState } from '../Layout'
import { useRouteError } from 'react-router-dom'
import { heroPhotos1 } from '../hero-photos'
import MainWrapper from '../sharedComponents/MainWrapper'

import { useConfig, useDarkMode, useFetchAudioData, useWindowWidth, useLoadingScreen } from '../hooks'

const ErrorPage = () => {

  const windowWidth = useWindowWidth()
  const configInstance = useConfig()
  const {
    openLoadingScreen,
    closeLoadingScreen
  } = useLoadingScreen()

  const globalAppState = { 
    config: configInstance,
    windowWidth: windowWidth,
    darkModeStateManagement: useDarkMode(),
    audioPlayerStateManagement: useFetchAudioData(configInstance),
    navBarIsWide: windowWidth > 1080,
    loadingScreenControls: {
      openLoadingScreen,
      closeLoadingScreen
    },
  }
  
  const error = useRouteError() as any


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
      <Header/>
      <MainWrapper heroPhotos={heroPhotos1}>
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
      </MainWrapper>
      <Footer/>
      <AudioPlayerWrapper/>
    </GlobalAppState.Provider>

  )
}

export default ErrorPage