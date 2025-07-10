
import * as React from 'react'
const { useContext } = React

import { GlobalAppState } from '../../../Layout'
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../../../sharedStyles/colors'
import HoverLink from '../../../sharedComponents/HoverLink'


const ShopHomeListItem = () => {
  
  const { windowWidth, darkModeStateManagement } = useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

  const isReverseFlexWrap = windowWidth < 1280

  const featuredItem = {
    img: './images/le-tombeau-cover.jpg',
    name: 'MAURICE RAVEL: Le tombeau de Couperin, transcription for violin and piano',
    description: 'A challenging transcription of a work by one of my all time favorite composers Maurice Ravel' 
  }

  return (
    <>
      <h2 className='section-header'>SHOP</h2>
      <div style={{
        display: 'flex',
        maxWidth: '80%',
        flexWrap: isReverseFlexWrap ? 'wrap-reverse' : 'nowrap'
      }}>
        <div style={{
          paddingTop: isReverseFlexWrap ? 20 : 0,
          textAlign: 'center',
          justifyContent: 'center',
          width: '100%'
        }}>
          <img style={{
            maxWidth: 140
          }}
            src={featuredItem.img}
          />
        </div>
        <div style={{
          paddingLeft: isReverseFlexWrap ? 0 : 20,
        }}>
          <span style={{
            color: isDarkMode ? 'silver' : NAVY_BLUE_MED,
            fontSize: 20,
            fontFamily: 'Mate, serif',
          }}>
            {featuredItem.name}
          </span>
          <br/>
          <br/>
          <span>
            {featuredItem.description}
          </span>
        </div>
      </div>
      <div 
        className="more"
        style={{
          paddingTop: 15
        }}
      >
        <HoverLink 
          cls="more-button"
          openInNewTab={false}
          onClickHandler={() => {}}
          href={'shop'} 
          linkText={'MORE'} 
          overColor={NAVY_BLUE_LIGHT} 
          offColor={'silver'}
        />
      </div>
    </>
  )
}

export default ShopHomeListItem

