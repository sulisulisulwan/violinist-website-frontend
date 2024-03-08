import * as React from 'react'
const { useContext } = React
import { GlobalAppState } from '../Layout'
import HeroImageSlideshow from './heroImageSlideshow/HeroImageSlideshow'


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
      backgroundColor: isDarkMode ? 'rgb(15, 14, 32)' : 'white',
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