import React, { useContext, useEffect, useState } from 'react'
import HeroImageSlideshow from '../../sharedComponents/heroImageSlideshow/HeroImageSlideshow'
import MainWrapper from '../../sharedComponents/MainWrapper'
import { GlobalAppState } from '../../Layout'
import { heroPhotos1 } from '../../hero-photos'
import axios from 'axios'
import config from '../../../config'

const useFetchLongFormBio = () => {

  const [ longFormBioData, setLongFormBioData ] = useState(null)

  useEffect(() => {
    const getLongFormBio = async () => {
      const longFormData = await axios.get(config.BACKEND_API_BASE_URL + '/bio/longForm')
      setLongFormBioData(longFormData.data)
    }
    getLongFormBio()
  }, [])

  return longFormBioData
}

const BiographyMain = () => {

  const longForm = useFetchLongFormBio()

  return (
    <MainWrapper>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos1}/>
      </section>
      
      <section  id="bio" className="bio">

        <h1>BIOGRAPHY</h1>
        {
          !longForm ? '...Loading' :
          !longForm.components ? null :
          longForm.components.map((component, i) => {
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