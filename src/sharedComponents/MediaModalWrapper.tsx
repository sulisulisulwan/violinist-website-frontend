import * as ReactDom from 'react-dom'
import * as React from 'react'

const { useEffect, useRef } = React

const useOutsideAlerter = (ref: React.RefObject<HTMLElement>, clickHandler: Function) => {
  useEffect(() => {
    const handleClickOutside = (e: Event) => { if (ref.current && !ref.current.contains(e.target as HTMLElement)) clickHandler() }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);
}

const useTypeEscapeToClose = (closeHandler: Function) => {
  
  useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => { if (e.key === 'Escape') closeHandler() }
    document.addEventListener('keydown', keydownListener)
    return () => document.removeEventListener('keydown', keydownListener)
  }, [])
}


interface mediaModalWrapperIF {
  isOpen: boolean
  setModalClosed: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

const MediaModalWrapper = ({ isOpen, setModalClosed, children }: mediaModalWrapperIF) => {
  
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setModalClosed);
  useTypeEscapeToClose(setModalClosed)
  
  if (!isOpen) return null


  const modal = (
    <div 
      id="media-modal-wrapper" 
      className={'modal-background'}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255, .7)',
        zIndex: 900,
        animation: 'fadeIn 1s'
      }}
    >
      <div 
        ref={wrapperRef}
        className={'modal-inner-window'}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#FFF',
          zIndex: 1000,
          animation: 'fadeIn 1s'
        }}
      >
        {children}
      </div>
    </div>
  )

  return ReactDom.createPortal(modal, document.getElementById('portal'))
}

export default MediaModalWrapper