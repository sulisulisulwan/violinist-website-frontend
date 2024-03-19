import * as React from 'react'
const { useContext } = React
import NavLinks from './nav/NavLinks'
import links from './nav/nav-links'
import HamburgerWrapper from './nav/HamburgerWrapper'
import NavModal from './nav/NavModal'
import { GlobalAppState } from '../Layout'
import { Link } from 'react-router-dom'

const Header = () => {

  const [ hamburgerOpen, setHamburgerOpen ] = React.useState(false)
  
  const { globalSidePadding, navBarIsWide, darkModeStateManagement } = useContext(GlobalAppState)

  const { isDarkMode } = darkModeStateManagement

  if (navBarIsWide && hamburgerOpen)  setHamburgerOpen(false)

  const styleTopBanner = {
    // paddingTop: navBarIsWide ? 30 : 5,
    paddingTop: navBarIsWide ? 20 : 20,
    // paddingBottom: navBarIsWide ? 0 : 5,
    paddingBottom: navBarIsWide ? 15 : 15,
    display: 'flex',
    alignItems: 'center',
    top: 0,
    position: 'sticky',
    paddingLeft: globalSidePadding,
    paddingRight: globalSidePadding,
    minHeight: '70px',
    backgroundColor: isDarkMode ? 'rgb(15, 14, 32)' : 'white',
    color: isDarkMode ? 'white' : 'black',
    zIndex: 100,

  }
  
  const styleHeaderName = {
    minWidth: 320,
  }
  
  return (
    <>
      <header 
        className="header-banner" 
        style={styleTopBanner as any}
      >
        <div 
          className="header-name" 
          style={styleHeaderName}
        >
          <Link to="/">
            <span style={{
              fontSize: 25,
              color: isDarkMode ? 'white' : 'black'
            }}>SULIMAN TEKALLI</span>
            <span style={{ 
              color: 'gray',
              fontSize: 25
            }}> VIOLINIST</span>
          </Link>
        </div>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          { navBarIsWide ? <NavLinks isDarkMode={isDarkMode} links={links}/> : <HamburgerWrapper toggle={setHamburgerOpen} toggled={hamburgerOpen}/> }
        </div>
      </header>
      <NavModal toggled={hamburgerOpen} toggleModal={setHamburgerOpen} links={links}/>
    </>
  )
}



export default Header