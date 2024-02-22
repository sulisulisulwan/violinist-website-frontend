import * as React from 'react'
import HoverLink from "../../../sharedComponents/HoverLink"
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../../../sharedStyles/colors'

interface detailsAccordionButtonPropsIF {
  accordionIsOpen: boolean
}

const DetailsAccordionButton = ({ accordionIsOpen }: detailsAccordionButtonPropsIF) => {

  return (
    <div 
      className="content"
      style={{
        width: '25%',
        textAlign: 'right',
        verticalAlign: 'middle',
        paddingTop: 20,
        paddingBottom: 20,
        display: 'table-cell',
        borderBottom: `1px dotted ${NAVY_BLUE_MED}`,
        cursor: 'pointer',
        color: NAVY_BLUE_MED,
        fontFamily: 'Mate, serif',
      }}
    >
      <HoverLink
        cls="details-button"
        onClickHandler={() => {}}
        openInNewTab={false}
        href=""
        linkText={accordionIsOpen ? 'CLOSE' : 'DETAILS'}
        offColor={NAVY_BLUE_MED}
        overColor={NAVY_BLUE_LIGHT}
      />
    </div>
  )
}

export default DetailsAccordionButton