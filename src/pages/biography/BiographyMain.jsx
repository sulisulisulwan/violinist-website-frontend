import React, { useContext } from 'react'
import MainWrapper from '../../sharedComponents/MainWrapper'
import { heroPhotos1 } from '../../hero-photos'
import { useFetchApiData } from '../../hooks/useFetcher'
import { GlobalAppState } from '../../Layout'
import UILoading from '../../sharedComponents/UILoading'
import FadeInParagraph from '../../sharedComponents/FadeInParagraph'
import parser from '../../utils/parser'

const BiographyMain = () => {

  const { config, darkModeStateManagement } = useContext(GlobalAppState)
  const longForm = useFetchApiData('longBio', config)
  
  let components = null
  if (longForm?.components) {
    components = parser.parseToReactElements(React, longForm.components)
  }

  return (
    <MainWrapper heroPhotos={heroPhotos1}>
      <section  id="bio" className="bio">

        <h1>BIOGRAPHY</h1>
        {
          !components ? <UILoading isCurved isDarkMode={darkModeStateManagement.isDarkMode} height={300} repeat={3}/> :
          components.map((component, i) => components)
        }
      </section>
    </MainWrapper>
  )
}

export default BiographyMain