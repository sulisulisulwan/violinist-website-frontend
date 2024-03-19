import * as React from 'react'
const { createContext } = React
import { audioPlayerStateIF } from './audioPlayer/AudioPlayer'
import { 
  useConfig,
  useDarkMode,
  useFetchAudioData,
  useWindowWidth, 
} from './hooks'
import { Outlet } from 'react-router-dom'
import AudioPlayerWrapper from './audioPlayer/AudioPlayerWrapper'
import Header from './header/Header'
import Footer from './footer/Footer'

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

const Layout = () => {

  const windowWidth = useWindowWidth()
  const configInstance = useConfig()
  
  const globalAppState = { 
    config: configInstance,
    windowWidth: windowWidth,
    darkModeStateManagement: useDarkMode(),
    audioPlayerStateManagement: useFetchAudioData(configInstance),
    globalSidePadding: windowWidth <= 600 ? '22px' 
    : windowWidth <= 800 ? '32px' 
    : windowWidth <= 1000 ? '42px' 
    : windowWidth <= 1200 ? '52px' 
    : '62px',
    navBarIsWide: windowWidth > 1080,
  }
  
  return (
    <GlobalAppState.Provider value={globalAppState}>
      <div id="isLoaded"></div>
        { 
          globalAppState.config && globalAppState.config.isLoaded ?
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
  )

}

export default Layout