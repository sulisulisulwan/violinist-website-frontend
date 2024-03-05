import * as React from 'react'
import { parseDateToString } from '../../../utils/date'
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../../../sharedStyles/colors'
import HoverLink from '../../../sharedComponents/HoverLink'
const { useState, useEffect } = React
import axios from 'axios'
import config from '../../../../config'

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


const CalendarHomeListItem = () => {

  const calendarData = useFetchCalendarData()
  const upcomingDates = calendarData?.results.upcoming
  const sortedCalendarData = upcomingDates ? transformAndSortCalendarData(upcomingDates) : null
  const abbreviatedData = sortedCalendarData ? sortedCalendarData.slice(0, 4) : null

  return (
    <>
      <h2>CONCERTS</h2>
      <ul style={{
        listStyleType: 'none',
        padding: 0
      }}>
          { abbreviatedData ? abbreviatedData.map((event: any, i: number) =>  <MiniDateListItem key={'event-' + i} eventData={event}/>) : '...Loading'}
      </ul>
      <div 
        className="more"
        style={{
          paddingTop: 15
        }}
      >
        <HoverLink 
          cls="more-button"
          openInNewTab={false}
          onClickHandler={() => {}}
          href={'calendar'} 
          linkText={'MORE'} 
          overColor={NAVY_BLUE_LIGHT} 
          offColor={'silver'}
        />
      </div>
    </>
  )
}

interface miniDateListItemPropsIF {
  eventData: any
}

const MiniDateListItem = ({ eventData }: miniDateListItemPropsIF ) => {

  let dateTime = eventData.dateTime

  if (typeof dateTime === 'object') {
    dateTime = dateTime.startDate
  }

  let [month, day, year] = parseDateToString(dateTime).split(' ').filter((str, i) => i < 4).slice(1)
  day = Number(day).toString() //remove leading zeros

  let computedVenue  = eventData.venue
  let computedLocation = eventData.location ? '' : eventData.venue

  if (eventData.location) {
    if (eventData.location.city) computedLocation += (eventData.location.city + ', ')

    if (eventData.location.country === 'USA' || !eventData.location.country) {
      computedLocation += eventData.location.stateOrProvince + ' '
    } else {
      computedLocation += eventData.location.country
    }
  }

  return (
    <li 
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <span style={{
        fontFamily: "Mate, serif",
        fontWeight: 900,
        color: NAVY_BLUE_MED,
        fontSize: 17,
        paddingBottom: 5
      }}>{day + ' ' + month + ', ' + year + ' - ' + computedLocation}</span>
      <span style={{
        color: NAVY_BLUE_LIGHT,
        fontSize: 13,
        paddingBottom: 10
      }}>{computedVenue.toUpperCase()}</span>
    </li>
  )
}

const transformAndSortCalendarData = (rawCalendarData: any) => {

  const calendarData = rawCalendarData.slice()
  const flattenedCalendarData = calendarData.reduce((memo: any, currItem: any) => {

    if (currItem.eventDates.length) {
      const transformedEventDates = currItem.eventDates.map((eventDate: any) => {
        const transformed: any = {}
        transformed.eventGroupingId = currItem.id
        transformed.artists = currItem.artists
        transformed.presenter = currItem.presenter
        transformed.type = currItem.type
        transformed.program = currItem.program
        transformed.venue = eventDate.location.venue
        
        transformed.eventId = eventDate.id
        transformed.dateTime = eventDate.dateTime
        transformed.link = eventDate.link
        transformed.location = {
          city: eventDate.location.city,
          stateOrProvince: eventDate.location.stateOrProvince,
          country: eventDate.location.country,
        }
        
        return transformed
      })
      
      return memo.concat(transformedEventDates)
    }

    const transformed: any = {}
    transformed.eventGroupingId = currItem.id
    transformed.artists = currItem.artists
    transformed.presenter = currItem.presenter
    transformed.type = currItem.type
    transformed.program = currItem.program
    transformed.venue = currItem.venue
    
    transformed.eventId = null
    transformed.dateTime = currItem.dateRange
    transformed.link = null
    transformed.location = null
    
    return memo.concat(transformed)

  }, [])
  
  flattenedCalendarData.sort((a: any, b: any) => {
    const timeA = new Date(a.dateTime).getTime()
    const timeB = new Date(b.dateTime).getTime()
    return timeA - timeB
  })

  return flattenedCalendarData
}

export default CalendarHomeListItem