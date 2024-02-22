import * as React from 'react'
import DateIcon from './DateIcon'
import { NAVY_BLUE_MED } from '../../../sharedStyles/colors'

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

  return (
    <div className="date" style={{
      color: NAVY_BLUE_MED,
      fontFamily: 'Mate, serif',
      width: '30%',
      paddingTop: 10,
      verticalAlign: 'top',
      display: 'table-cell',
      borderBottom: `1px dotted ${NAVY_BLUE_MED}`,
      cursor: 'pointer'
    }}>
        <div style={{ display: 'flex' }}>
        <DateIcon day={startDay} month={startMonth} year={startYear}/>
        { isEventGroupOnly ?
          <>
            <span style={{
              paddingLeft: 10,
              paddingRight: 10,
              fontSize: 30
            }}>-</span>
            <DateIcon day={endDay} month={endMonth} year={endYear}/>
          </>
          
          : null
        }
      </div>
    </div>
  )
}

export default DateInfo