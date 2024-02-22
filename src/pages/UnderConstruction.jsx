import React, { useContext } from 'react'
import { GlobalAppState } from '../Layout'
import HeroImageSlideshow from '../sharedComponents/HeroImageSlideshow'

const UnderConstruction = () => {

  const { globalSidePadding } = useContext(GlobalAppState)
  const heroPhotos1 = [
    '/images/SESSION/adjusted_for_hero_DSCF1527.jpg',
  ]


  return (
    <main style={{
      paddingLeft: globalSidePadding,
      paddingRight: globalSidePadding,
      paddingBottom: 30,
      fontSize: 13
    }}>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos1}/>
      </section>
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

    </main>
  )
}

export default UnderConstruction