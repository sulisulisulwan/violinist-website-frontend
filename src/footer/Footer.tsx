import * as React from 'react'
const { useContext } = React
import { DARK_MODE_BACKGROUND_COLOR, NAVY_BLUE_MED } from '../sharedStyles/colors'
import getSocialIcons from '../socialIcons'
import { GlobalAppState } from '../Layout'
import DarkModeToggler from '../sharedComponents/DarkModeToggler'

const Footer = () => {
  

  const { darkModeStateManagement, audioPlayerIsMobileMode } = useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

  return (
    <footer>
      <div 
        className="footer-body global-side-padding"
        style={{ background: isDarkMode ? DARK_MODE_BACKGROUND_COLOR : NAVY_BLUE_MED }}
      >
        <div className="footer-content-wrapper footer-content-wrapper-media-query">
          <FooterNameLogo/>
          <div className="footer-lower-container footer-lower-container-media-query">
            <FooterSocialIcons/>
            <DarkModeToggler/>
          </div>
        </div>
      </div>
    </footer>
  )
}


const FooterNameLogo = ({ isIPadDesktop, isGalaxyFold }: any) => {
  return (
    <div className='footer-name-logo'>
      <span className='footer-name-logo-name'>SULIMAN TEKALLI</span>
      <span className='footer-name-logo-medium'>VIOLINIST</span>
    </div>
  )
}

const FooterSocialIcons = () => {
  const socialIcons = getSocialIcons('white')

  return (
    <div className='footer-social-icons'>
      { socialIcons.map((iconData, i) => {
        return (
          <a 
            target="_blank"
            key={iconData.label + i}
            className='footer-social-icon-link'
            href={iconData.href}
          >
            <img width={20} src={iconData.src}/>
          </a>
        )
      }) }
      
    </div>
  )
}


export default Footer