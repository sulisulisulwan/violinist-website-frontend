import * as React from 'react'
import DateIcon from './DateIcon'
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../../../sharedStyles/colors'
import { GlobalAppState } from '../../../Layout'

type fullMonth = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'



const numToMonth: Record<string, fullMonth> = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August', 
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

interface dateInfoPropsIF {
  eventData: any
}
 
const DateInfo = ({ eventData }: dateInfoPropsIF) => {

  const { darkModeStateManagement, windowWidth } = React.useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

  let startMonth, startDay, startYear
  let endMonth, endDay, endYear
  const isEventGroupOnly = eventData.dataType === 'eventGroup'

  const startDate = eventData.dateTime ? new Date(eventData.dateTime) : new Date(eventData.dateRange.start)
  startDay = startDate.getUTCDate()
  startMonth = numToMonth[startDate.getMonth()]
  startYear = startDate.getUTCFullYear()


  if (isEventGroupOnly) {
    const endDate = eventData.dateTime ? new Date(eventData.dateTime) : new Date(eventData.dateRange.end)
    endDay = endDate.getUTCDate()
    endMonth = numToMonth[endDate.getMonth()]
    endYear = endDate.getUTCFullYear()
  }

  let computedComponent = <DateIcon day={startDay} month={startMonth} year={startYear}/>

  if (isEventGroupOnly) {
    if (windowWidth < 730) {
      computedComponent = (
        <>
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <DateIcon day={startDay} month={startMonth} year={startYear}/>
            <span style={{
              paddingLeft: 10,
              paddingRight: 10,
              fontSize: 15,
              textAlign: 'center'
            }}>|</span>
            <DateIcon day={endDay} month={endMonth} year={endYear}/>
          </div>
        </>
      )
    } else {
      computedComponent = (
        <>
          <DateIcon day={startDay} month={startMonth} year={startYear}/>
          <span style={{
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 30
          }}>-</span>
          <DateIcon day={endDay} month={endMonth} year={endYear}/>
        </>
      )

    }
  }


  return (
    <div className="date" 
      style={{
        color: isDarkMode ? 'white' : NAVY_BLUE_MED,
        fontFamily: 'Mate, serif',
        [windowWidth < 730 ? 'flexBasis' : 'width']: windowWidth < 730 ? '50%' : '30%',
        maxWidth: windowWidth < 730 ? '' : '30%',
        paddingTop: 10,
        verticalAlign: 'top',
        display: 'table-cell',
        borderBottom: windowWidth < 730 ? '' :  `1px dotted ${isDarkMode ? 'white' : NAVY_BLUE_MED}`,
        cursor: 'pointer'
      }}
    >
        <div 
          style={{ 
            display: 'flex', 
          }}
        >
          {computedComponent}
      </div>
    </div>
  )
}

export default DateInfo