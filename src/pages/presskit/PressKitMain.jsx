import React from 'react'
import MainWrapper from '../../sharedComponents/MainWrapper'
import { GlobalAppState } from '../../Layout'
import { heroPhotos1 } from '../../hero-photos'

const PressKitMain = () => {

  return (
    <MainWrapper heroPhotos={heroPhotos1}>
      <section>
        Programs
      </section>
      <section>
        Media Kit
      </section>
    </MainWrapper>
  )
}

export default PressKitMain