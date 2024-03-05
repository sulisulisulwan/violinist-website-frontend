import * as React from 'react'
const { useEffect, useState } = React
import HoverLink from '../../../sharedComponents/HoverLink'
import EventListing from './EventListing'
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../../../sharedStyles/colors'
import config from '../../../../config'
import axios from 'axios'

interface eventsListPropsIF {
  listKey: string
}

const useFetchCalendarData = () => {
  const [ calendarData, setCalendarData ] = useState(null)
  useEffect(() => {
    const getCalendarData = async () => {
      const calendarData = await axios.get(`${config.BACKEND_API_BASE_URL}/calendar`)
      setCalendarData (calendarData.data)
    }
    getCalendarData()
  }, [])
  return calendarData
}

const EventsList = ({ listKey }: eventsListPropsIF) => {

  const lowerBounds = 10

  const fetchedCalendarData = useFetchCalendarData()
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
        borderTop: `1px dotted ${NAVY_BLUE_MED}`
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
