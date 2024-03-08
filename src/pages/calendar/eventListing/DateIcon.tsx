import * as React from 'react'

interface dateIconPropsIF {
  day: number
  month: string
  year: number
}

const DateIcon = ({ day, month, year }: dateIconPropsIF) => {


  return (
    <div style={{
      display: 'flex',
      paddingRight: 5
    }}>
      <div className="day" style={{
        fontSize: 40,
        fontWeight: 900,
        minWidth: 40,
        textAlign: 'center'
      }}>{day}</div>
      <div className="month-year" style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 5,
        paddingLeft: 5
      }}>
        <span 
          className="month"
          style={{
            fontSize: 19
          }}
        >{month}</span>
        <span 
          className="year"
          style={{
            fontSize: 15
          }}
        >{year}</span>
      </div>
    </div>
  )
}

export default DateIcon