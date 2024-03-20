import * as React from 'react'
const { useState, useContext } = React
import { Outlet } from 'react-router-dom'
import HoverLink from '../../sharedComponents/HoverLink'
import MainWrapper from '../../sharedComponents/MainWrapper'
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../../sharedStyles/colors'
import { heroPhotos1 } from '../../hero-photos'
import { GlobalAppState } from '../../Layout'

const MediaMain = () => {

  const [ pathName, setPathName ] = useState('/media')
  const { darkModeStateManagement } = useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

  return (
    <MainWrapper addPaddingBottom={30} heroPhotos={heroPhotos1}>
      <section  id="media" className="media">
        <h1>MEDIA</h1>
        <div>
          <ul style={{
            listStyleType: 'none',
            padding: 0,
            display: 'flex'
          }}>
            <li style={{
              paddingRight: 20
            }}>
              { pathName === '/media' || pathName === '/photos' ? 
              <span style={{ color: isDarkMode ? 'white' : 'black' }}>PHOTOS</span> :
              <HoverLink
                cls="photos-grid-link"
                linkText={'PHOTOS'}
                href="photos"
                overColor={NAVY_BLUE_LIGHT}
                offColor={isDarkMode ? 'silver' : NAVY_BLUE_MED}
                onClickHandler={() => { setPathName('/photos') }}
                openInNewTab={false}
                />
              }
            </li>
            <li>
              { pathName === '/videos' ? 
                <span style={{ color: isDarkMode ? 'white' : 'black' }}>VIDEOS</span> :
                <HoverLink
                cls="videos-grid-link"
                linkText={'VIDEOS'}
                href="videos"
                overColor={NAVY_BLUE_LIGHT}
                offColor={isDarkMode ? 'silver' : NAVY_BLUE_MED}
                onClickHandler={() => { setPathName('/videos') }}
                openInNewTab={false}
                />
              }
            </li>
          </ul>
        </div>
        <div className="media-grid" style={{
          display: 'flex',
          flexDirection: 'row'
        }}> 
          <Outlet/>
        </div>
        
      </section>
    </MainWrapper>
  )
}

export default MediaMain