import * as React from 'react'
const { useEffect, useState } = React
import HoverLink from '../../../sharedComponents/HoverLink'
import EventListing from './EventListing'
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../../../sharedStyles/colors'
import config from '../../../../config'
import axios from 'axios'
import { useFetchApiData } from '../../../hooks/useFetcher'
import { GlobalAppState } from '../../../Layout'

interface eventsListPropsIF {
  listKey: string
}


const EventsList = ({ listKey }: eventsListPropsIF) => {

  const { darkModeStateManagement } = React.useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

  const lowerBounds = 10

  const fetchedCalendarData = useFetchApiData('calendar')
  const calendarData = fetchedCalendarData?.results[listKey]

  const [ accordionOpenId, setAccordionOpenId ] = useState(null)
  const [ listLimit, setListLimit ] = useState(lowerBounds)

  const flattenedCalendarData = !calendarData ? null : calendarData.reduce((memo: any, eventGroupData: any) => {
    const mapped = eventGroupData.eventDates.length ? eventGroupData.eventDates.map((eventDate: any) => {
      return {
        id: eventDate.id,
        detailsOpen: false,
        dataType: 'eventDate',
        dateRange: null,
        dateTime: eventDate.dateTime,
        link: eventDate.link,
        location: eventDate.location,
        type: eventGroupData.type,
        presenter: eventGroupData.presenter,
        venue: eventGroupData.venue,
        artists: eventGroupData.artists,
        program: eventGroupData.program,
      } as any
    }) : [{
      id: eventGroupData.id,
      detailsOpen: false,
      dataType: 'eventGroup',
      dateRange: eventGroupData.dateRange,
      dateTime: null,
      link: null,
      location: null,
      type: eventGroupData.type,
      presenter: eventGroupData.presenter,
      venue: eventGroupData.venue,
      artists: eventGroupData.artists,
      program: eventGroupData.program,
    }]

    return memo.concat(mapped)
  }, [])

  const finalList = !flattenedCalendarData ? null : flattenedCalendarData.slice(0, listLimit)
  const listControls = !finalList ? null : finalList.length < flattenedCalendarData.length ? { text: 'SHOW MORE', onClickHandler: () => { setListLimit(listLimit + lowerBounds) } }
    : finalList.length > lowerBounds ? { text: 'SHOW LESS', onClickHandler: () => { setListLimit(listLimit - lowerBounds) }} : { text: '', onClickHandler: () => {}}

  return (
    <>
      <ul style={{
        listStyleType: 'none',
        padding: 0,
        minWidth: '100%',
        display: 'table',
        maxWidth: '950px',
        borderTop: `1px dotted ${isDarkMode ? 'white' : NAVY_BLUE_MED}`
      }}>
        { 
          finalList ? finalList.map((concertsDatum: any, i: number) =>
            <EventListing 
              key={'eventSummary' + i} 
              eventData={concertsDatum}
              accordionOpenId={accordionOpenId}
              setAccordionOpenId={setAccordionOpenId}
            />
          ) : null
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

export const UpcomingEvents = () =>  <EventsList listKey={'upcoming'}/>
export const PastEvents = () => <EventsList listKey={'past'}/>
