import * as React from 'react'
const { createContext } = React
import { Outlet } from 'react-router-dom'
import { useWindowWidth } from './hooks/useWindowWidth'
import { useFetchAudioData } from './hooks/useFetchAudioData'
import { audioTrackDataIF } from './audioPlayer/dummyPlaylist'
import AudioPlayerWrapper from './audioPlayer/AudioPlayerWrapper'
import Header from './header/Header'
import Footer from './footer/Footer'
import configInstance from './config/config'

const { useState } = React

export const GlobalAppState = createContext(null)

export interface globalAppStateIF {
  windowWidth: number 
  darkModeStateManagement: { 
    isDarkMode: boolean
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  }
  audioPlayerStateManagement: [audioPlayerStateIF, React.Dispatch<React.SetStateAction<audioPlayerStateIF>>]
  globalSidePadding: string
  navBarIsWide: boolean
}

export interface audioPlayerStateIF {
  hasPlayedOnce: boolean,
  playList: audioTrackDataIF,
  playerStatus: string,
  currentTrack: number,
  progress: number
}

const useDarkMode = () => {
  const initState = localStorage.getItem('darkMode') === 'true' ? true : false
  const [ isDarkMode, setIsDarkMode ] = useState(initState)

  const darkModeStateSetter = (value: boolean) => {
    localStorage.setItem('darkMode', value.toString())
    setIsDarkMode(value)
  }
  return { isDarkMode, setIsDarkMode: darkModeStateSetter }
}

const useConfig = () => {
  const [ configuration, setConfiguration ] = useState(null)
  React.useEffect(() => {
    const initiateConfiguration = async () => {
      const initializedConfig = await configInstance.initConfig()
      setConfiguration(initializedConfig)
    }
    initiateConfiguration()
  }, [])

  return configuration
}

const Layout = () => {

  const config = useConfig()
  
  const windowWidth = useWindowWidth()
  
  const globalAppState = { 
    config,
    windowWidth: windowWidth,
    darkModeStateManagement: useDarkMode(),
    audioPlayerStateManagement: useFetchAudioData(config),
    globalSidePadding: windowWidth <= 600 ? '22px' 
    : windowWidth <= 800 ? '32px' 
    : windowWidth <= 1000 ? '42px' 
    : windowWidth <= 1200 ? '52px' 
    : '62px',
    navBarIsWide: windowWidth > 1080,
  }
  
  return <GlobalAppState.Provider value={globalAppState}>
      <div id="isLoaded"></div>
      { 
        config ?
        <>
          <Header/>
          <Outlet/>
          <Footer/>
          <AudioPlayerWrapper/>
        </>

        : 
        null
      }
    </GlobalAppState.Provider>

}

export default Layout