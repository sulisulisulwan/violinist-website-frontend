import * as React from 'react'
import { GlobalAppState } from '../Layout'
const { useContext } = React

const DarkModeToggler = () => {

  const { setIsDarkMode, isDarkMode } = useContext(GlobalAppState).darkModeStateManagement
  // const appDiv = document.getElementById('app')
  // const backgroundColor = isDarkMode ? DARK_MODE_BACKGROUND_COLOR : 'white'
  // appDiv.style.backgroundColor = backgroundColor

  return (
    <div className='dm-toggler-wrapper'>
      <div className='dm-toggler-title'>DARK MODE</div>
      <div 
        className={`dm-toggler-bg${isDarkMode ? ' is-dm' : ' not-dm'}`}
        onClick={() => { setIsDarkMode(!isDarkMode) }}
      >
        <div className={`dm-toggler-btn ${isDarkMode ? 'dm-toggler-btn-isdm' : 'dm-toggler-btn-notdm'}`}/>
      </div>
    </div>
  )
}

export default DarkModeToggler