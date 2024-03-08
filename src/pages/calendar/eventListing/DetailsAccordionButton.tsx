import * as React from 'react'
import HoverLink from "../../../sharedComponents/HoverLink"
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../../../sharedStyles/colors'
import { GlobalAppState } from '../../../Layout'

interface detailsAccordionButtonPropsIF {
  accordionIsOpen: boolean
}

const DetailsAccordionButton = ({ accordionIsOpen }: detailsAccordionButtonPropsIF) => {

  const { darkModeStateManagement } = React.useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

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
        borderBottom: `1px dotted ${isDarkMode ? 'white' : NAVY_BLUE_MED}`,
        cursor: 'pointer',
        color: isDarkMode ? 'white' : NAVY_BLUE_MED,
        fontFamily: 'Mate, serif',
      }}
    >
      <HoverLink
        cls="details-button"
        onClickHandler={() => {}}
        openInNewTab={false}
        href=""
        linkText={accordionIsOpen ? 'CLOSE' : 'DETAILS'}
        offColor={isDarkMode ? 'white' : NAVY_BLUE_MED}
        overColor={NAVY_BLUE_LIGHT}
      />
    </div>
  )
}

export default DetailsAccordionButton