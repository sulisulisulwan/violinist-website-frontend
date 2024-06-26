import * as React from 'react'
import DateInfo from './DateInfo'
import Content from './Content'
import DetailsAccordionButton from './DetailsAccordionButton'
import { useFadeInSection } from '../../../hooks'

interface eventListingPropsIF {
  eventData: any
  setAccordionOpenId: React.Dispatch<React.SetStateAction<number>>
  accordionOpenId: number
  windowWidth: number
}

const EventListing = ({ eventData, setAccordionOpenId, accordionOpenId, windowWidth }: eventListingPropsIF) => {

  const { domRef, fadeInSectionClassName } = useFadeInSection()

  const accordionIsOpen = eventData.id === accordionOpenId
  const setTo = accordionIsOpen ? null : eventData.id

  const handleAccordionClickBehavior = (e: any) => {
    if (e.target.className === 'no-accordion-action') {
      return
    }
    setAccordionOpenId(setTo)
  }

  return (
    <li 
      className={`event-listing ${fadeInSectionClassName}`} 
      style={{
        display: 'table-row',
        width: '100%',
      }}
      onClick={handleAccordionClickBehavior}
      ref={domRef}
    >
      {
        windowWidth < 730 ? (
          <>
            <div style={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex'}}>
                <DateInfo eventData={eventData}/>
                <Content eventData={eventData} accordionIsOpen={accordionIsOpen}/>
              </div>
              <DetailsAccordionButton accordionIsOpen={accordionIsOpen}/>
            </div>
          </>
        ) : (
          <>
            <DateInfo eventData={eventData}/>
            <Content eventData={eventData} accordionIsOpen={accordionIsOpen}/>
            <DetailsAccordionButton accordionIsOpen={accordionIsOpen}/>
          </>
        )
      }
    </li>
  )
}

export default EventListing