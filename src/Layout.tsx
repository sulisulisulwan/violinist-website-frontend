import * as React from 'react'
const { createContext } = React
import { audioTrackDataIF } from './audioPlayer/AudioPlayer'
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
import { useCart } from './hooks/useCart'
import { Config } from './config/config'
import { DARK_MODE_BACKGROUND_COLOR } from './sharedStyles/colors'

export const GlobalAppState = createContext(null)

export interface globalAppStateIF {
  windowWidth: number 
  cartStateManagement: {
    cart: any
    setCart: React.Dispatch<React.SetStateAction<any>>
  }
  audioPlayerStateManagement: [audioPlayerStateIF, React.Dispatch<React.SetStateAction<audioPlayerStateIF>>]
  config: Config | null
  darkModeStateManagement: { isDarkMode: boolean, setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>> }
  navBarIsWide: boolean
}

export interface audioPlayerStateIF {
  hasPlayedOnce: boolean,
  playList: audioTrackDataIF,
  playerStatus: string,
  currentTrack: number,
  progress: number
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
    cartStateManagement: useCart(),
    audioPlayerStateManagement: useFetchAudioData(configInstance as Config),
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
  html.style.backgroundColor = globalAppState.darkModeStateManagement.isDarkMode === true ? DARK_MODE_BACKGROUND_COLOR : 'white'
  
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