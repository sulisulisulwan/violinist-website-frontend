import * as ReactDom from 'react-dom'
import * as React from 'react'
import { useOutsideAlerter, useTypeEscapeToClose } from './hooks'

interface modalWrapperIF {
  modalName: string
  isOpen: boolean
  setModalClosed: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

const ModalWrapper = ({ modalName, isOpen, setModalClosed, children }: modalWrapperIF) => {
  
  const wrapperRef = useOutsideAlerter(setModalClosed);
  useTypeEscapeToClose(setModalClosed)
  
  if (!isOpen) return null


  const modal = (
    <div 
      id={`${modalName}-modal-wrapper`}
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

export default ModalWrapper