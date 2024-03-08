import * as React from 'react'
import { Sling as Hamburger } from 'hamburger-react'
import { GlobalAppState } from '../../Layout'

interface hamburgerWrapperPropsIF {
  toggle: React.Dispatch<React.SetStateAction<boolean>>
  toggled: boolean
}

const HamburgerWrapper = ({ toggle, toggled }: hamburgerWrapperPropsIF) => {

  const { darkModeStateManagement } = React.useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

  const styleHamburgerWrapper = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    alignItems: 'center',
    zIndex: 9000
  }  

  return (
    <div className="hamburger-wrapper" style={styleHamburgerWrapper as any}>
      <Hamburger 
        toggled={toggled} 
        toggle={toggle}
        size={20}
        direction="right"
        duration={0.8}
        distance="lg"
        color={ isDarkMode ? 'white' : 'black' }
        easing="ease-in"
      /> 
    </div>
  )
}

export default HamburgerWrapper