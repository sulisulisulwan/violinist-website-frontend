import React, { useContext } from 'react'
import { GlobalAppState } from '../Layout'
import HeroImageSlideshow from '../sharedComponents/heroImageSlideshow/HeroImageSlideshow'
import { heroPhotos1 } from '../hero-photos'
import MainWrapper from '../sharedComponents/MainWrapper'

const UnderConstruction = () => {

  const { globalSidePadding } = useContext(GlobalAppState)

  return (
    <MainWrapper heroPhotos={heroPhotos1}>
      <section 
        id="under-construction" 
        className="under-construction"
        style={{
          textAlign: 'center',
          padding: 40,
          fontSize: 20
        }}
      >
        This section will be coming soon...
      </section>
    </MainWrapper>
  )
}

export default UnderConstruction