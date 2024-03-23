import { useEffect, useRef, useState } from "react";

export const useComponentFadeAnimator = (isOpen: boolean, fadeDuration: number) => {

  const targetComp = useRef<HTMLDivElement>(null)
  const [ hookState, setHookState ] = useState({
    isFirstLoad: true,
    cssSettings: {
      displaySetting: 'none',
      animationSetting: ''
    }
  })

  const animationEndListener = (e: any) => { 
    setHookState((pS) => ({
      isFirstLoad: pS.isFirstLoad ? false : true,
      cssSettings: {
        displaySetting: isOpen ? '' : 'none',
        animationSetting:''
      }
    }))
  }

  useEffect(() => {

    targetComp?.current?.addEventListener('animationend', animationEndListener)

    setHookState((pS) => ({
      isFirstLoad: pS.isFirstLoad,
      cssSettings: {
        displaySetting: hookState.isFirstLoad && !isOpen ? 'none' : '',
        animationSetting: isOpen ? `fadeIn ${fadeDuration}s` : `fadeOut ${fadeDuration}s`
      }
    }))

    return () => targetComp?.current?.removeEventListener('animationend', animationEndListener)
  }, [isOpen])


  return { 
    fadeRef: targetComp,
    cssFadeAnimationProps: hookState.cssSettings
  }
}