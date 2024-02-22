import * as React from 'react'
import { NAVY_BLUE_LIGHT } from '../../../sharedStyles/colors'
import HoverLink from '../../../sharedComponents/HoverLink'
import { FEData, ParsedHTMLComponent } from 'suli-violin-website-types/src'

interface bioHomeListItemPropsIF {
  fetchedData: FEData
}

export const BioHomeListItem = ({ fetchedData }: bioHomeListItemPropsIF) => {

  return (
    <>
      <h2>BIOGRAPHY</h2>
      <div>
        { !fetchedData.bio.shortForm ? null : 
            fetchedData.bio.shortForm.components.map((component: ParsedHTMLComponent, index: number) => 
              <p key={component.content + index}>{component.content}</p>)
        }
      </div>
      <div 
        className="more"
        style={{
          paddingTop:  15
        }}
      >
        <HoverLink 
          cls="more-button"
          onClickHandler={() => {}}
          openInNewTab={false}
          href={'biography'} 
          linkText={'MORE'} 
          overColor={NAVY_BLUE_LIGHT} 
          offColor={'silver'}
        />
      </div>
    </>
  )
}

export default BioHomeListItem