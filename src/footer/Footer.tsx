import * as React from 'react'
const { useContext } = React
import { NAVY_BLUE_MED } from '../sharedStyles/colors'
import getSocialIcons from '../socialIcons'
import { GlobalAppState } from '../Layout'
import DarkModeToggler from '../sharedComponents/DarkModeToggler'

const Footer = () => {
  

  const { 
    globalSidePadding, 
    darkModeStateManagement, 
    audioPlayerIsMobileMode, 
    deviceWidths
  } = useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement
  const { isGalaxyFold, isIPadDesktop } = deviceWidths

  return (
    <footer 
      style={{ 
        position: 'fixed',
        bottom: audioPlayerIsMobileMode ? 58 : 0,
        width: '100%',
        zIndex: 100
      }}
    >
      <div 
        className="footer-body"
        style={{
          borderTop: '5px solid gray',
          background: isDarkMode ? 'rgb(15, 14, 32)' : NAVY_BLUE_MED,
          paddingLeft: globalSidePadding,
          paddingRight: globalSidePadding,
        }}
        >
        <div className="footer-content-wrapper"
          style={{
            paddingTop: isIPadDesktop ? 21 
              : isGalaxyFold ? 8 : 10,
            paddingBottom: isIPadDesktop ? 31 
              : isGalaxyFold ? 10 : 20,
            display: 'flex',
            flexDirection: isIPadDesktop ? 'row' : 'column',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          {
            isIPadDesktop ? (
              <>
                <FooterNameLogo/>
                <FooterSocialIcons/>
                <DarkModeToggler/>
              </>
            ) : (
              <>
                <FooterNameLogo isGalaxyFold={isGalaxyFold}/>
                <div style={{ 
                  paddingTop: 10,
                  paddingLeft: isGalaxyFold ? 10 : 40,
                  paddingRight: isGalaxyFold? 10 : 40,
                  display: 'flex', 
                  justifyContent: 'space-between' 
                }}>
                  <FooterSocialIcons/>
                  <DarkModeToggler/>
                </div>
              </>
            )
          } 
        </div>
      </div>
    </footer>
  )
}


const FooterNameLogo = ({ isIPadDesktop, isGalaxyFold }: any) => {
  return (
    <div 
      className='footer-name-logo'
      style={{
        textAlign: isIPadDesktop ? 'left' : 'center',
        fontSize: isGalaxyFold ? 15 : 20,
        fontWeight: 'lightest',
      }}
    >
      <span style={{ color: 'white' }}>SULIMAN TEKALLI</span>
      <span style={{ color: 'lightgray' }}>VIOLINIST</span>
    </div>
  )
}

const FooterSocialIcons = () => {
  const socialIcons = getSocialIcons('white')

  return (
    <div
      className='footer-social-icons'
      style={{
        paddingTop: 10,
        display: 'flex',
        color: 'white'
      }}
    >
      { socialIcons.map((iconData, i) => {
        return (
          <a 
            target="_blank"
            key={iconData.label + i}
            style={{
              paddingRight: 20
            }}
            href={iconData.href}>
              <img width={20} src={iconData.src}/>
          </a>
        )
      }) }
      
    </div>
  )
}


export default Footer