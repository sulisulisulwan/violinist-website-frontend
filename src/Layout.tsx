import * as React from 'react'
import * as ReactDom from 'react-dom'

const { createContext } = React
import { audioTrackDataIF } from './audioPlayer/AudioPlayer'
import { 
  useConfig,
  useDarkMode,
  useFetchAudioData,
  useWindowWidth,
  useLoadingScreen 
} from './hooks'
import { Outlet } from 'react-router-dom'
import AudioPlayerWrapper from './audioPlayer/AudioPlayerWrapper'
import Header from './header/Header'
import Footer from './footer/Footer'
import { useCart } from './hooks/useCart'
import { Config } from './config/config'
import { DARK_MODE_BACKGROUND_COLOR } from './sharedStyles/colors'
import LoadingScreen from './LoadingScreen'

export const GlobalAppState = createContext(null)

export interface globalAppStateIF {
  windowWidth: number 
  cartStateManagement: {
    cart: any
    setCart: React.Dispatch<React.SetStateAction<any>>
  }
  audioPlayerStateManagement: [audioPlayerStateIF, React.Dispatch<React.SetStateAction<audioPlayerStateIF>>]
  config: Config
  darkModeStateManagement: { isDarkMode: boolean, setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>> }
  globalSidePadding: string
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
  const {
    loadingStates,
    openLoadingScreen,
    closeLoadingScreen
  } = useLoadingScreen()
  
  const globalAppState = { 
    config: configInstance,
    windowWidth: windowWidth,
    darkModeStateManagement: useDarkMode(),
    cartStateManagement: useCart(),
    audioPlayerStateManagement: useFetchAudioData(configInstance),
    loadingScreenControls: {
      openLoadingScreen,
      closeLoadingScreen
    },
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
  html.style.backgroundColor = globalAppState.darkModeStateManagement.isDarkMode === true ? DARK_MODE_BACKGROUND_COLOR : 'white'
  
  return (
    <GlobalAppState.Provider value={globalAppState}>
      { 
        globalAppState.config && globalAppState.config.isLoaded ?
          <>
            <Header/>
            <Outlet/>
            <Footer/>
            <AudioPlayerWrapper/>
            {/* <LoadingScreen isLoading={loadingStates.isLoading} prioritizeZIndex={loadingStates.prioritizeZIndex}/> */}
          </>
          : 
          null
      }
    </GlobalAppState.Provider>
  )

}

export default Layout