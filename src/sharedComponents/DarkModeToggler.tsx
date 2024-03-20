import * as React from 'react'
import { GlobalAppState } from '../Layout'
import { NAVY_BLUE_LIGHT, NAVY_BLUE_MED } from '../sharedStyles/colors'
const { useContext } = React


const DarkModeToggler = () => {

  const { setIsDarkMode, isDarkMode } = useContext(GlobalAppState).darkModeStateManagement

  return (
    <div 
      className='darkmode-toggler-wrapper'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        verticalAlign: 'center',
      }}
    >
      <div 
        className='darkmode-toggler-title'
        style={{ 
          fontSize: 10, 
          color: 'white' 
        }}>DARK MODE
      </div>
      <div 
        className='darkmode-toggler-control-background'
        style={{ 
          minHeight: 20, maxHeight: 20,
          minWidth: 40, maxWidth: 40,
          borderRadius: 20,
          border: '1px solid black',
          backgroundColor: isDarkMode ? NAVY_BLUE_MED : 'silver',
          position: 'relative'
        }}
        onClick={() => { setIsDarkMode(!isDarkMode)}}
      >
        <div 
          className='darkmode-toggler-control-button' 
          style={{
            backgroundColor: 'white',
            border: '1px solid black',
            minHeight: 15, maxHeight: 15,
            minWidth: 15, maxWidth: 15,
            position: 'absolute',
            top: 2,
            left: isDarkMode ? 22 : 2,
            borderRadius: '50%',
            transition: 'left .1s'
          }}
        />
      </div>
    </div>
  )
}

export default DarkModeToggler