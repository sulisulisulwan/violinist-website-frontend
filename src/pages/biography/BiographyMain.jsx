import React, { useContext } from 'react'
import MainWrapper from '../../sharedComponents/MainWrapper'
import { heroPhotos1 } from '../../hero-photos'
import { useFetchApiData } from '../../hooks/useFetcher'
import { GlobalAppState } from '../../Layout'

const BiographyMain = () => {

  const { config, windowWidth, darkModeStateManagement } = useContext(GlobalAppState)
  const longForm = useFetchApiData('longBio', config)

  return (
    <MainWrapper heroPhotos={heroPhotos1}>
      <section  id="bio" className="bio">

        <h1>BIOGRAPHY</h1>
        {
          !longForm ? <BioLoading isDarkMode={darkModeStateManagement.isDarkMode} repeat={3}/> :
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

const BioLoading = ({ isDarkMode, repeat }) => {

  const skeleton = new Array(repeat).fill(null)

  return (
    <>
      {
        skeleton.map((_, index) => {

          return <div className={ isDarkMode ? "skeleton dark-mode" : "skeleton"} style={{
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: isDarkMode ? 'rgba(200, 200, 200, .1)' : '#eee',
              height: 100,
              border: '0px solid rgba(236, 236, 236, .5)',
              borderRadius: 20,
              marginBottom: index === skeleton.length - 1 ? 0 : 30
            }}/>
        })
      }
    </>
  )
}

export default BiographyMain