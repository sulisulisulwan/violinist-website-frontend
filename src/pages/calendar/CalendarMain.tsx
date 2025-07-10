import * as React from 'react' 
const { useState, useContext } = React
import { Outlet } from 'react-router-dom'
import { heroPhotos1 } from '../../hero-photos'
import HoverLink from '../../sharedComponents/HoverLink'
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../../sharedStyles/colors'
import MainWrapper from '../../sharedComponents/MainWrapper'
import { GlobalAppState } from '../../Layout'

const CalendarMain = () => {

  const { darkModeStateManagement } = useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement
  const [ pathName, setPathName ] = useState('/calendar')

  return (
    <MainWrapper heroPhotos={heroPhotos1}>
      <section id="concerts" className="concerts">
        <div className="calendar-wrapper">
          <h1 className='section-header'>CONCERTS</h1>
            { pathName === '/calendar' || pathName === '/upcoming-concerts' ? 
              <span className={ isDarkMode ? 'dm-text-color' : '' }>NEXT CONCERTS</span> :
              <HoverLink
                cls="next-concerts-button"
                openInNewTab={false}
                href="/calendar/upcoming-concerts"
                linkText={"NEXT CONCERTS"}
                overColor={NAVY_BLUE_LIGHT}
                offColor={isDarkMode ? 'silver' : NAVY_BLUE_MED}
                onClickHandler={() => { setPathName('/upcoming-concerts') }}
              />
            }
            { pathName === '/past-concerts' ? 
              <span className={ isDarkMode ? 'dm-text-color' : '' }>PAST CONCERTS</span> :
              <HoverLink
                cls="past-concerts-button"
                openInNewTab={false}
                href="/calendar/past-concerts"
                linkText={"PAST CONCERTS"}
                overColor={NAVY_BLUE_LIGHT}
                offColor={isDarkMode ? 'silver' : NAVY_BLUE_MED}
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