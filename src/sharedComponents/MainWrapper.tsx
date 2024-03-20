import * as React from 'react'
const { useContext } = React
import { GlobalAppState } from '../Layout'
import HeroImageSlideshow from './heroImageSlideshow/HeroImageSlideshow'


interface mainWrapperPropsIF {
  children: React.ReactNode
  heroPhotos: string[]
  addPaddingBottom?: number
}

const MainWrapper = ({ children, addPaddingBottom = 0, heroPhotos }: mainWrapperPropsIF) => {

  const { globalSidePadding, darkModeStateManagement } = useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

  
  
  return (
    <main style={{
      paddingLeft: globalSidePadding,
      paddingRight: globalSidePadding,
      paddingTop: 2,
      paddingBottom: addPaddingBottom + 130, // 100 added for sticky footer
      fontSize: 13,
      backgroundColor: isDarkMode ? 'rgb(15, 14, 32)' : 'white',
      color: isDarkMode ? 'white' : 'black',
    }}>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos}/>
      </section>
      {children}
    </main>
  )
}

export default MainWrapper