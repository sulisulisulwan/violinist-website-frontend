import * as React from 'react'
import * as ReactDom from 'react-dom'
import { DARK_MODE_BACKGROUND_COLOR } from '../sharedStyles/colors'

interface loadingScreenHook {
  loadingStates: { isLoading: boolean, prioritizeZIndex: boolean }
  openLoadingScreen: Function
  closeLoadingScreen: Function
}

export const useLoadingScreen = (): loadingScreenHook => {

  const [isLoading, setIsLoading] = React.useState(true)
  const [prioritizeZIndex, setPrioritizeZIndex] = React.useState(true)

  React.useEffect(() => {
    let to1 = setTimeout(function () {
      setIsLoading(false)
  
      let to2 = setTimeout(function() {
        setPrioritizeZIndex(false)
        clearTimeout(to1)
        clearTimeout(to2)
      }, 2000)
    }, 3000)
  }, [])


  return {
    loadingStates: { isLoading, prioritizeZIndex },
    openLoadingScreen:
      () => { setIsLoading(true) },
    closeLoadingScreen: 
    () => { setIsLoading(false) },
  }

}  


