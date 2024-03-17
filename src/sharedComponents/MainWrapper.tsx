import * as React from 'react'
const { useContext } = React
import { GlobalAppState } from '../Layout'
import HeroImageSlideshow from './heroImageSlideshow/HeroImageSlideshow'
import { DARK_MODE_BACKGROUND_COLOR } from '../sharedStyles/colors'


interface mainWrapperPropsIF {
  children: React.ReactNode
  heroPhotos: any
  paddingBottom?: number
}

const MainWrapper = ({ children, paddingBottom = 30, heroPhotos }: mainWrapperPropsIF) => {

  const { globalSidePadding, darkModeStateManagement } = useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement
  return (
    <main style={{
      paddingLeft: globalSidePadding,
      paddingRight: globalSidePadding,
      paddingBottom,
      fontSize: 13,
      backgroundColor: isDarkMode ? DARK_MODE_BACKGROUND_COLOR : 'white',
      color: isDarkMode ? 'white' : 'black'
    }}>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos}/>
      </section>
      {children}
    </main>
  )
}

export default MainWrapper