import * as React from 'react'
const { useContext } = React
import NavLinks from './nav/NavLinks'
import links from './nav/nav-links'
import HamburgerWrapper from './nav/HamburgerWrapper'
import NavModal from './nav/NavModal'
import { GlobalAppState } from '../Layout'
import { Link } from 'react-router-dom'
import { DARK_MODE_BACKGROUND_COLOR } from '../sharedStyles/colors'

const Header = () => {

  const { navBarIsWide, darkModeStateManagement } = useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

  return (
    <header 
      className={`header-banner global-side-padding`} 
      style={{
        backgroundColor: isDarkMode ? DARK_MODE_BACKGROUND_COLOR : 'white',
        color: isDarkMode ? 'white' : 'black',
      }}
    >
      <HeaderNameLogo isDarkMode={isDarkMode} />
      <NavBar navBarIsWide={navBarIsWide} isDarkMode={isDarkMode}/>
    </header>
  )
}

const NavBar = ({ navBarIsWide, isDarkMode }: any) => {

  const [ hamburgerOpen, setHamburgerOpen ] = React.useState(false)
  if (navBarIsWide && hamburgerOpen)  setHamburgerOpen(false)

  return (
    <div className='navbar-wrapper'>
      { navBarIsWide ? 
        <NavLinks isDarkMode={isDarkMode} links={links}/> : 
        <HamburgerWrapper toggle={setHamburgerOpen} toggled={hamburgerOpen}/> 
      }
        <NavModal toggled={hamburgerOpen} toggleModal={setHamburgerOpen} links={links}/>
    </div>
  )
}

const HeaderNameLogo = ({ isDarkMode }: any) => {
  return (
    <div className="header-name-logo">
      <Link to="/">
        <span style={{
          color: isDarkMode ? 'white' : 'black',
        }}>SULIMAN TEKALLI</span>
        <span style={{ 
          color: 'gray',
        }}> VIOLINIST</span>
      </Link>
    </div>
  )
}


export default Header