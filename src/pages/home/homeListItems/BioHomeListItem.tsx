import * as React from 'react'
import { NAVY_BLUE_LIGHT } from '../../../sharedStyles/colors'
import HoverLink from '../../../sharedComponents/HoverLink'
import { ParsedHTMLComponent } from 'suli-violin-website-types/src'
import { useFetchApiData } from '../../../hooks/useFetcher'
import { GlobalAppState } from '../../../Layout'
import UILoading from '../../../sharedComponents/UILoading'
import parser from '../../../utils/parser'
// import config from '../../../config/config'

export const BioHomeListItem = () => {

  const { config, darkModeStateManagement } = React.useContext(GlobalAppState)
  const shortFormBioData = useFetchApiData('shortBio', config)

  let components = null
  if (shortFormBioData?.components) {
    components = parser.parseToReactElements(React, shortFormBioData.components)
  }

  return (
    <>
      <h2>BIOGRAPHY</h2>
      <div>
        { 
          components ? 
            components.map((component: ParsedHTMLComponent, index: number) => 
              component) 
          : <UILoading isCurved isDarkMode={darkModeStateManagement.isDarkMode} height={300}/>
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