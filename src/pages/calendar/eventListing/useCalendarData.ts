import { useState } from "react"
import { useFetchApiData } from "../../../hooks/useFetcher"
import { Config } from "../../../config/config"

export const useCalendarData = (config: Config, listKey: any) => {

  const fetchedCalendarData = useFetchApiData('calendar', config)
  const lowerBounds = 10
  const calendarData = fetchedCalendarData?.results[listKey]
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

  return {
    listControls,
    calendarData: finalList
  }
}
