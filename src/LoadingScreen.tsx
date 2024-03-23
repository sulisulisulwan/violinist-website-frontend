import * as React from 'react'

import * as ReactDom from 'react-dom'
import { DARK_MODE_BACKGROUND_COLOR } from './sharedStyles/colors'

const LoadingScreen = ({ isLoading, prioritizeZIndex }: any) => {

  const loadingScreen = (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        zIndex: prioritizeZIndex ? 40000 : -20000,
        backgroundColor: localStorage.getItem('darkMode') === 'true' ? DARK_MODE_BACKGROUND_COLOR : 'white',
        transition: 'opacity 2s ease-in-out',
        opacity: isLoading ? 1 : 0
      }}
    >LOADING</div>
  )
  return ReactDom.createPortal(loadingScreen, document.getElementById('loading-screen'))
}

export default LoadingScreen