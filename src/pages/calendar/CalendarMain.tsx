import * as React from 'react' 
const { useState } = React
import HeroImageSlideshow from '../../sharedComponents/HeroImageSlideshow'
import { Outlet } from 'react-router-dom'
import { heroPhotos1 } from '../../hero-photos'
import HoverLink from '../../sharedComponents/HoverLink'
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../../sharedStyles/colors'
import MainWrapper from '../../sharedComponents/MainWrapper'

const CalendarMain = () => {

  const [ pathName, setPathName ] = useState('/calendar')

  return (
    <MainWrapper>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos1}/>
      </section>      
      <section id="concerts" className="concerts">
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h1>CONCERTS</h1>
            { pathName === '/calendar' || pathName === '/upcoming-concerts' ? 
              'NEXT CONCERTS' :
              <HoverLink
                cls="next-concerts-button"
                openInNewTab={false}
                href="/calendar/upcoming-concerts"
                linkText={"NEXT CONCERTS"}
                overColor={NAVY_BLUE_LIGHT}
                offColor={NAVY_BLUE_MED}
                onClickHandler={() => { setPathName('/upcoming-concerts') }}
              />
            }
            { pathName === '/past-concerts' ? 
              'PAST CONCERTS' :
              <HoverLink
                cls="past-concerts-button"
                openInNewTab={false}
                href="/calendar/past-concerts"
                linkText={"PAST CONCERTS"}
                overColor={NAVY_BLUE_LIGHT}
                offColor={NAVY_BLUE_MED}
                onClickHandler={() => { setPathName('/past-concerts') }}
              />
            }
          <Outlet/>
        </div>
      </section>
    </MainWrapper>
  )
}


export default CalendarMain