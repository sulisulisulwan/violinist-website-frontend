import * as ReactDom from 'react-dom'
import * as React from 'react'
import { useComponentFadeAnimator, useOutsideAlerter, useTypeEscapeToClose } from '../../hooks'
import modalFactory from './modalFactory'

interface modalWrapperIF {
  modalName: string
  isOpen: boolean
  setModalClosed: React.Dispatch<React.SetStateAction<boolean>>
  childModalContext: { type: string, props: Record<string, any>}
}

const ModalWrapper = ({ modalName, isOpen, setModalClosed, childModalContext }: modalWrapperIF) => {

  const { type, props } = childModalContext
  
  useTypeEscapeToClose(setModalClosed)
  const outsideAlerterRef = useOutsideAlerter(setModalClosed);
  const { fadeRef, cssFadeAnimationProps } = useComponentFadeAnimator(isOpen, .5)
  
  const childModal = modalFactory(type, Object.assign(props, { cssFadeAnimation: cssFadeAnimationProps }))
  const wrapperModal = (
    <div 
      id={`${modalName}-modal-wrapper`}
      className={'modal-background'}
      ref={fadeRef}
      style={{
        display: cssFadeAnimationProps.displaySetting,
        animation: cssFadeAnimationProps.animationSetting,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255, .7)',
        zIndex: 900,

      }}
    >
      <div 
        ref={outsideAlerterRef}
        className={'modal-inner-window'}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#FFF',
          zIndex: 1000,
        }}
      >
        {childModal}
      </div>
    </div>
  )

  return ReactDom.createPortal(wrapperModal, document.getElementById('portal'))
}

export default ModalWrapper