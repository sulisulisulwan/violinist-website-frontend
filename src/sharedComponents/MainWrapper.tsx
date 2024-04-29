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
    <main className={`global-side-padding main-wrapper ${ isDarkMode ? 'main-wrapper-isdm' : 'main-wrapper-notdm' }`}>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos}/>
      </section>
      {children}
    </main>
  )
}

export default MainWrapper