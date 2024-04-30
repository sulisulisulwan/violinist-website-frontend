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
      className="modal-background"
      ref={fadeRef}
      style={{
        display: cssFadeAnimationProps.displaySetting,
        animation: cssFadeAnimationProps.animationSetting,
      }}
    >
      <div 
        className="modal-inner-window"
        ref={outsideAlerterRef} 
      >
        {childModal}
      </div>
    </div>
  )

  return ReactDom.createPortal(wrapperModal, document.getElementById('portal'))
}

export default ModalWrapper