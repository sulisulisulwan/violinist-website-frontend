import React, { useContext } from 'react'
import MainWrapper from '../../sharedComponents/MainWrapper'
import { heroPhotos1 } from '../../hero-photos'
import { useFetchApiData } from '../../hooks/useFetcher'
import { GlobalAppState } from '../../Layout'
import UILoading from '../../sharedComponents/UILoading'

const BiographyMain = () => {

  const { config, windowWidth, darkModeStateManagement } = useContext(GlobalAppState)
  const longForm = useFetchApiData('longBio', config)

  return (
    <MainWrapper heroPhotos={heroPhotos1}>
      <section  id="bio" className="bio">

        <h1>BIOGRAPHY</h1>
        {
          !longForm ? <UILoading isCurved isDarkMode={darkModeStateManagement.isDarkMode} height={300} repeat={3}/> :
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