import * as React from 'react'
import { parseDateToString } from '../../../utils/date'
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../../../sharedStyles/colors'
import HoverLink from '../../../sharedComponents/HoverLink'
import { useFetchApiData } from '../../../hooks/useFetcher'
import { GlobalAppState } from '../../../Layout'
import UILoading from '../../../sharedComponents/UILoading'
// import config from '../../../config/config'

const CalendarHomeListItem = () => {

  const { config, darkModeStateManagement } = React.useContext(GlobalAppState)
  const calendarData = useFetchApiData('calendar', config)
  const upcomingDates = calendarData?.results.upcoming
  const sortedCalendarData = upcomingDates ? transformAndSortCalendarData(upcomingDates) : null
  const abbreviatedData = sortedCalendarData ? sortedCalendarData.slice(0, 4) : null

  return (
    <>
      <h2 className='section-header'>CONCERTS</h2>
      <ul style={{
        listStyleType: 'none',
        padding: 0
      }}>
          { 
            abbreviatedData ? 
              abbreviatedData.map((event: any, i: number) =>  <MiniDateListItem key={'event-' + i} eventData={event}/>) 
              : <UILoading isCurved isDarkMode={darkModeStateManagement.isDarkMode} height={300}/>
          }
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
  const { darkModeStateManagement } = React.useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

  let dateTime = eventData.dateTime

  if (typeof dateTime === 'object') {
    dateTime = dateTime.start
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
        color: isDarkMode ? 'silver' : NAVY_BLUE_MED,
        fontSize: 17,
        paddingBottom: 5
      }}>{day + ' ' + month + ', ' + year + ' - ' + computedLocation}</span>
      <span style={{
        color: isDarkMode ? 'white' : NAVY_BLUE_LIGHT,
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