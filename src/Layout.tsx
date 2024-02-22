import * as React from 'react'
const { createContext } = React
import { Outlet } from 'react-router-dom'
import { useWindowWidth } from './hooks/useWindowWidth'
import { useFetchAllData } from './hooks/useFetchAllData'
import { audioTrackDataIF } from './audioPlayer/dummyPlaylist'
import AudioPlayerWrapper from './audioPlayer/AudioPlayerWrapper'
import Header from './header/Header'
import Footer from './footer/Footer'

export const GlobalAppState = createContext(null)

export interface globalAppStateIF {
  data: any,
  windowWidth: number 
  globalSidePadding: string
  navBarIsWide: boolean
  audioPlayerStateManagement: [audioPlayerStateIF, React.Dispatch<React.SetStateAction<audioPlayerStateIF>>]
}

export interface audioPlayerStateIF {
  hasPlayedOnce: boolean,
  playList: audioTrackDataIF,
  playerStatus: string,
  currentTrack: number,
  progress: number
}

const Layout = () => {

  const windowWidth = useWindowWidth()
  
  const { fetchedData, audioPlayerStateManagement } = useFetchAllData()
  
  const globalAppState = { 
    fetchedData,
    windowWidth, 
    audioPlayerStateManagement,
    globalSidePadding: windowWidth <= 600 ? '22px' 
    : windowWidth <= 800 ? '32px' 
    : windowWidth <= 1000 ? '42px' 
    : windowWidth <= 1200 ? '52px' 
    : '62px',
    navBarIsWide: windowWidth > 1080,
  }

  if (globalAppState.fetchedData === null) return null

  return fetchedData === null ? <div>... Loading</div> :
    <GlobalAppState.Provider value={globalAppState}>
      <div id="isLoaded"></div>
      <Header/>
      <Outlet/>
      <Footer/>
      <AudioPlayerWrapper/>
    </GlobalAppState.Provider>

}

export default Layout