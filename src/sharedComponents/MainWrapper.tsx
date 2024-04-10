import * as React from 'react'
const { useContext } = React
import { GlobalAppState } from '../Layout'
import HeroImageSlideshow from './heroImageSlideshow/HeroImageSlideshow'
import { DARK_MODE_BACKGROUND_COLOR } from '../sharedStyles/colors'


interface mainWrapperPropsIF {
  children: React.ReactNode
  heroPhotos: string[]
  addPaddingBottom?: number
}

const MainWrapper = ({ children, addPaddingBottom = 0, heroPhotos }: mainWrapperPropsIF) => {

  const { darkModeStateManagement } = useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

  
  return (
    <main 
      className="global-side-padding"
      style={{
        paddingTop: 2,
        paddingBottom: addPaddingBottom + 200, // 100 added for sticky footer
        fontSize: 13,
        backgroundColor: isDarkMode ? DARK_MODE_BACKGROUND_COLOR : 'white',
        color: isDarkMode ? 'white' : 'black',
        // animation: 'fadeIn .5s linear'
      }}
    >
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos}/>
      </section>
      {children}
    </main>
  )
}

export default MainWrapper