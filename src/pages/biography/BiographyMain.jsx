import React, { useContext } from 'react'
import MainWrapper from '../../sharedComponents/MainWrapper'
import { heroPhotos1 } from '../../hero-photos'
import { useFetchApiData } from '../../hooks/useFetcher'
import { GlobalAppState } from '../../Layout'

const BiographyMain = () => {

  const { config } = useContext(GlobalAppState)
  const longForm = useFetchApiData('longBio', config)

  return (
    <MainWrapper heroPhotos={heroPhotos1}>
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