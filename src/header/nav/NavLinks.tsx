import * as React from 'react'
import HoverLink from '../../sharedComponents/HoverLink'
import { NAVY_BLUE_LIGHT } from '../../sharedStyles/colors'
import { navLinkDataIF } from './nav-links'

interface topNavBarPropsIF {
  links: navLinkDataIF[]
  isDarkMode: boolean
}

const TopNavBar = ({ links, isDarkMode }: topNavBarPropsIF) => {

  return (
    <nav>
      <ul className="nav-links">
        { links.map((link: navLinkDataIF, i) => (
        <li key={link.href + i} style={{ fontSize: 15 }}>
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