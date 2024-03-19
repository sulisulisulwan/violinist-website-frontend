import * as React from 'react'
import { heroPhotos1 } from '../hero-photos'
import MainWrapper from '../sharedComponents/MainWrapper'

const UnderConstruction = () => {

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