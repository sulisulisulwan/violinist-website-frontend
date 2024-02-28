import React, { useContext, useEffect, useState } from 'react'
import HeroImageSlideshow from '../../sharedComponents/HeroImageSlideshow'
import MainWrapper from '../../sharedComponents/MainWrapper'
import { GlobalAppState } from '../../Layout'
import { heroPhotos1 } from '../../hero-photos'

const BiographyMain = () => {

  const { fetchedData } = useContext(GlobalAppState)

  return (
    <MainWrapper>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos1}/>
      </section>
      
      <section  id="bio" className="bio">

        <h1>BIOGRAPHY</h1>
        {
          !fetchedData.bio.longForm ? null :
          !fetchedData.bio.longForm.components ? null :
          fetchedData.bio.longForm.components.map((component, i) => {
            if (component.type === 'p') {
              return <p key={component.type + i}>{component.content}</p>
            }
          })
        }
      </section>
    </MainWrapper>
  )
}

export default BiographyMain