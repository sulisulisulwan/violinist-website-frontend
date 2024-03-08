import * as React from 'react'
import HoverLink from '../../sharedComponents/HoverLink'
import { NAVY_BLUE_LIGHT } from '../../sharedStyles/colors'
import { navLinkDataIF } from './nav-links'

interface topNavBarPropsIF {
  links: navLinkDataIF[]
  isDarkMode: boolean
}

const TopNavBar = ({ links, isDarkMode }: topNavBarPropsIF) => {

  const styleTopNavUl: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    listStyleType: 'none',
    fontFamily: 'Poppins',
    marginTop: 8, // to accomodate the audio component above.  Remove to center
    
  }

  const linkStyle: React.CSSProperties = {
    fontSize: 15
  }

  return (
    <nav className="top-nav">
      <ul style={styleTopNavUl}>
        { links.map((link: navLinkDataIF, i) => (
        
        <li key={link.href + i} style={linkStyle}>
          <HoverLink 
            cls="nav-link-button"
            openInNewTab={false}
            onClickHandler={() => {}}
            href={link.href} 
            linkText={link.label} 
            overColor={NAVY_BLUE_LIGHT} 
            offColor={isDarkMode ? 'white' : 'black'}
          />
        </li>
        
        )) }
      </ul>
    </nav>
  )
}

export default TopNavBar