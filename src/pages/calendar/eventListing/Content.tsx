import * as React from 'react'
import HoverLink from "../../../sharedComponents/HoverLink"
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from "../../../sharedStyles/colors"
import { GlobalAppState } from '../../../Layout'

interface eventListingContentPropsIF {
  eventData: any
  accordionIsOpen: boolean
}

const Content = ({ eventData, accordionIsOpen }: eventListingContentPropsIF) => {
  const { darkModeStateManagement } = React.useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

  let city, region, venue

  if (eventData.location) {
    city = eventData.location.city
    venue = eventData.location.venue
    region = eventData.location.stateOrProvince || eventData.location.country
  }

  if (!venue && eventData.presenter) venue = eventData.presenter

  let location
  
  if (city) {
    location = city + ', ' + region
  }

  if (eventData.dataType === 'eventGroup' && venue) {
    location = eventData.venue
    venue = eventData.type
  }

  let program = eventData.program.length ? eventData.program : ''
  let artists = eventData.artists.length ? eventData.artists : ''
  let link = eventData.link ? eventData.link : ''
  let hours = ''
  let minutes = ''
  let amPm = ''

  if (eventData.dateTime) {
    const date = new Date(eventData.dateTime)
    let utcHours = date.getUTCHours()
    let utcMinutes = date.getUTCMinutes()
  
    if (utcHours) {
      if (utcHours > 12) {
        amPm = 'PM'
        hours = (utcHours - 12).toString()
      } else {
        amPm = 'AM'
      }

    }

    if (utcMinutes < 10) {
      minutes = '0' + utcMinutes
    } else {
      minutes = utcMinutes.toString()
    }

  }

  return (
    <div 
      className="content"
      style={{
        width: '45%',
        paddingTop: 20,
        paddingBottom: 20,
        verticalAlign: 'top',
        display: 'table-cell',
        borderBottom: `1px dotted ${isDarkMode ? 'white' : NAVY_BLUE_MED}`,
        cursor: 'pointer',
        color: isDarkMode ? 'white' : NAVY_BLUE_MED,
        fontFamily: 'Mate, serif',
      }}
    >
      <h3 style={{ margin: 0, fontSize: 17 }}>{location}</h3>
      <h4 style={{ margin: 0, fontSize: 14 }}>{venue}</h4>
      <div className="more-details"
        style={{
          maxHeight: accordionIsOpen ? 500 : 0,
          opacity: accordionIsOpen ? 1 : 0,
          overflow: 'hidden',
          transition: accordionIsOpen ? 
            'max-height 1s, opacity 1s' : 
            'max-height 1s, opacity 1s' 
        }}
      >
        {
          program ? 
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              {
                eventData.program.map((piece: any, i: number) => {
                  return (
                    <div key={piece.composer + i}>
                      <span>{piece.composer}: </span>
                      <span>{piece.arranger}</span>
                      <span>{piece.work}</span>
                    </div>
                  )
                })
              }
            </div> 
            : null
        }
        {
          artists ? 
            <div style={{ paddingTop: 10, paddingBottom: 10}}>
              {
                eventData.artists.map((artist: any, i: number) => {
                  return (
                    <div key={artist.name + i}>
                      <span>{artist.name}</span>
                      <span>{artist.medium ? ', ' + artist.medium : ''}</span>
                    </div>
                  )
                })
              }
            </div> 
            : null
        }
        {
          <div style={{ paddingTop: 10, paddingBottom: 10}}>{hours ? (hours + ':' + minutes + ' ' + amPm) : ''}</div> 
        }
        {
          link ? 
            <div style={{ paddingTop: 10, paddingBottom: 10}}>
              <HoverLink
                cls={'no-accordion-action'}
                onClickHandler={() => {}}
                linkText={'GET TICKETS'} 
                offColor={isDarkMode ? 'white' : NAVY_BLUE_MED}
                overColor={NAVY_BLUE_LIGHT}
                href={link} 
                openInNewTab={true}
              /> 
            </div>
            : null
        }
      </div>
    </div>
  )
}

export default Content