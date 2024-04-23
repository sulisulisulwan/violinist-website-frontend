import * as React from 'react'
const { useState } = React
import HoverLink from '../../../sharedComponents/HoverLink'
import EventListing from './EventListing'
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../../../sharedStyles/colors'
import { useFetchApiData } from '../../../hooks/useFetcher'
import { GlobalAppState } from '../../../Layout'
import { Config } from '../../../config/config'
import { useCalendarData } from './useCalendarData'
import UILoading from '../../../sharedComponents/UILoading'

interface eventsListPropsIF {
  listKey: string
}

const EventsList = ({ listKey }: eventsListPropsIF) => {

  const { darkModeStateManagement, config, windowWidth } = React.useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement
  const { calendarData, listControls } = useCalendarData(config, listKey)
  const [ accordionOpenId, setAccordionOpenId ] = useState(null)

  return (
    <>
      <ul style={{
        listStyleType: 'none',
        padding: 0,
        display: 'table',
        tableLayout: 'fixed',
        maxWidth: '950px',
        width: '100%',
        minWidth: '100%',
        borderTop: calendarData ? (`1px dotted ${isDarkMode ? 'white' : NAVY_BLUE_MED}`) : '',
      }}>
        { 
          calendarData ? calendarData.map((concertsDatum: any, i: number) =>
            <EventListing 
              key={'eventSummary' + i} 
              eventData={concertsDatum}
              accordionOpenId={accordionOpenId}
              setAccordionOpenId={setAccordionOpenId}
              windowWidth={windowWidth}
            />
          ) : <UILoading isDarkMode={isDarkMode} repeat={4} isCurved/>
        }
      </ul>
      <div style={{
        textAlign: 'center'
      }}>
        {
          listControls ?
          <HoverLink 
            cls="details-button"
            href=""
            openInNewTab={false}
            linkText={listControls.text}
            offColor={NAVY_BLUE_MED}
            overColor={NAVY_BLUE_LIGHT}
            onClickHandler={listControls.onClickHandler}/> : null
        }
      </div>
    </>
  )
}

export default EventsList