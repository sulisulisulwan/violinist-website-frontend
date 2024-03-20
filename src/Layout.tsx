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
import { Config } from './config/config'

export const GlobalAppState: React.Context<globalAppStateIF> = createContext(null)

export interface globalAppStateIF {
  audioPlayerStateManagement: [audioPlayerStateIF, React.Dispatch<React.SetStateAction<audioPlayerStateIF>>]
  config: Config
  darkModeStateManagement: { isDarkMode: boolean, setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>> }
  globalSidePadding: string
  navBarIsWide: boolean
  windowWidth: number
  deviceWidths: Record<string, boolean>
  audioPlayerIsMobileMode: boolean
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
    deviceWidths: {
      isGalaxyFold: windowWidth <= 280,
      isIPhone45: windowWidth < 375,
      isIPhone678: 375 <= windowWidth && windowWidth < 400,
      isIPhone14: 400 <= windowWidth && windowWidth < 560,
      isIPadDesktop: windowWidth >= 560
    },
    audioPlayerIsMobileMode: windowWidth < 765
  }

  const html = document.querySelector('html')
  html.style.backgroundColor = globalAppState.darkModeStateManagement.isDarkMode === true ? 'rgb(15, 14, 32)' : 'white'
  
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