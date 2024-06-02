import * as React from 'react'
import { NAVY_BLUE_LIGHT } from '../../../sharedStyles/colors'
import HoverLink from '../../../sharedComponents/HoverLink'
import { ParsedHTMLComponent } from 'suli-violin-website-types/src'
import { useFetchApiData } from '../../../hooks/useFetcher'
import { GlobalAppState } from '../../../Layout'
import UILoading from '../../../sharedComponents/UILoading'
// import config from '../../../config/config'

export const BioHomeListItem = () => {

  const { config, darkModeStateManagement } = React.useContext(GlobalAppState)
  const shortFormBioData = useFetchApiData('shortBio', config)

  return (
    <>
      <h2
        style={{ fontFamily: 'Montserrat' }}
      >BIOGRAPHY</h2>
      <div>
        { 
          shortFormBioData ? 
            shortFormBioData.components.map((component: ParsedHTMLComponent, index: number) => 
              <p key={component.content + index}>{component.content}</p>) 
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