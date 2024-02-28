import React, { useContext } from 'react'
import { GlobalAppState } from '../Layout'
import HeroImageSlideshow from '../sharedComponents/HeroImageSlideshow'
import { heroPhotos1 } from '../hero-photos'

const UnderConstruction = () => {

  const { globalSidePadding } = useContext(GlobalAppState)

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