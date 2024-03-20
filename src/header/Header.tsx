import * as React from 'react'
const { useContext } = React
import NavLinks from './nav/NavLinks'
import links from './nav/nav-links'
import HamburgerWrapper from './nav/HamburgerWrapper'
import NavModal from './nav/NavModal'
import { GlobalAppState } from '../Layout'
import { Link } from 'react-router-dom'

const Header = () => {

  const { windowWidth, globalSidePadding, navBarIsWide, darkModeStateManagement } = useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

  return (
    <header 
      className="header-banner" 
      style={{
        backgroundColor: isDarkMode ? 'rgb(15, 14, 32)' : 'white',
        color: isDarkMode ? 'white' : 'black',
        paddingTop: navBarIsWide ? 20 : 20,
        paddingBottom: navBarIsWide ? 15 : 15,
        paddingRight: globalSidePadding,
        paddingLeft: globalSidePadding,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        minHeight: '70px',
        zIndex: 100,
      }}
    >
      <HeaderNameLogo windowWidth={windowWidth} isDarkMode={isDarkMode} />
      <NavBar navBarIsWide={navBarIsWide} isDarkMode={isDarkMode}/>
    </header>
  )
}

const NavBar = ({ navBarIsWide, isDarkMode }: any) => {

  const [ hamburgerOpen, setHamburgerOpen ] = React.useState(false)
  if (navBarIsWide && hamburgerOpen)  setHamburgerOpen(false)

  return (
    <div 
      className='navbar-wrapper'
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      { navBarIsWide ? 
        <NavLinks isDarkMode={isDarkMode} links={links}/> : 
        <HamburgerWrapper toggle={setHamburgerOpen} toggled={hamburgerOpen}/> 
      }
        <NavModal toggled={hamburgerOpen} toggleModal={setHamburgerOpen} links={links}/>
    </div>
  )
}

const HeaderNameLogo = ({ isDarkMode, windowWidth }: any) => {
  
  const smallDevice = 375 <= windowWidth && windowWidth < 400 
  const verySmallDevice = windowWidth < 375 
  const teenyTinyDevice = windowWidth <= 280 

  const minWidth_galaxyFold = 200
  const minWidth_iPhone45 = 240
  const minWidth_iPhone678 = 284
  const minWidth_iPadsDesktopEtc = 320


  const fontSize_galaxyFold = 15
  const fontSize_iPhone45 = 19
  const fontSize_iPhone678 = 22
  const fontSize_iPadsDesktopEtc = 25

  return (
    <div 
      className="header-name-logo"
      style={{
        minWidth: teenyTinyDevice ? minWidth_galaxyFold
        : verySmallDevice ? minWidth_iPhone45 
        : smallDevice ? minWidth_iPhone678 
        : minWidth_iPadsDesktopEtc
      }}
    >
      <Link to="/">
        <span style={{
          color: isDarkMode ? 'white' : 'black',
          fontSize: teenyTinyDevice ? fontSize_galaxyFold
          : verySmallDevice ? fontSize_iPhone45 
          : smallDevice ? fontSize_iPhone678 
          : fontSize_iPadsDesktopEtc,
        }}>SULIMAN TEKALLI</span>
        <span style={{ 
          color: 'gray',
          fontSize: teenyTinyDevice ? fontSize_galaxyFold
          : verySmallDevice ? fontSize_iPhone45 
          : smallDevice ? fontSize_iPhone678 
          : fontSize_iPadsDesktopEtc,
        }}> VIOLINIST</span>
      </Link>
    </div>
  )
}


export default Header