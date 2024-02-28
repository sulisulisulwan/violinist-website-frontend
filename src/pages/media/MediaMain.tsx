import * as React from 'react'
const { useContext } = React

import { Outlet } from 'react-router-dom'
import HeroImageSlideshow from '../../sharedComponents/HeroImageSlideshow'
import HoverLink from '../../sharedComponents/HoverLink'
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../../sharedStyles/colors'
import MainWrapper from '../../sharedComponents/MainWrapper'
import { heroPhotos1 } from '../../hero-photos'

const MediaMain = () => {

  return (
    <MainWrapper paddingBottom={30}>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos1}/>
      </section>
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
              <HoverLink
                cls="photos-grid-link"
                linkText={'PHOTOS'}
                href="photos"
                overColor={NAVY_BLUE_LIGHT}
                offColor={NAVY_BLUE_MED}
                onClickHandler={() => {}}
                openInNewTab={false}
                />
            </li>
            <li>
              <HoverLink
                cls="videos-grid-link"
                linkText={'VIDEOS'}
                href="videos"
                overColor={NAVY_BLUE_LIGHT}
                offColor={NAVY_BLUE_MED}
                onClickHandler={() => {}}
                openInNewTab={false}
              />
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