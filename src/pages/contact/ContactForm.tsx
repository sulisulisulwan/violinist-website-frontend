import * as React from 'react'
import * as ReactDom from 'react-dom'
import axios from 'axios'
import { GlobalAppState } from '../../Layout'
import { Config } from '../../config/config'
import LoaderIcon from './LoaderIcon'

const { useState, useContext } = React

const useSubmitEmail = (config: Config, setModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [ emailSentIsError, setEmailSentIsError ] = useState(false)
  const [ isWaitingForServerResponse, setIsWaitingForServerResponse ] = useState(false)

  const submitFormHandler = async (e: any) => {
    e.preventDefault()

    try {
      const [ firstName, lastName, email, message] = e.target
  
      if (!config || !config.isLoaded) return // TODO: add fallback ui informing client
      const url = config.getField('BACKEND_API_BASE_URL') + '/contact'
      const body = {
        data: {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          message: message.value
        }
      }

      setIsWaitingForServerResponse(true)

      const resp = await axios.post(url, body)
      if (resp.data.error.isError) {
        throw new Error()
      }

      setEmailSentIsError(false)
    } catch(e) {
      setEmailSentIsError(true)
    }
    setIsWaitingForServerResponse(false)
    
    setModalOpen(true)
  }

  return { emailSentIsError, isWaitingForServerResponse, submitFormHandler }
}


const ContactForm = ({ windowWidth }: any) => {

  const { darkModeStateManagement, config } = useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement
  const [ modalOpen, setModalOpen ] = useState(false)
  const { emailSentIsError, isWaitingForServerResponse, submitFormHandler } = useSubmitEmail(config, setModalOpen)

  const errorMessage = (
    <div className="email-success-error-msg">
      <h3>There was a an error sending your email.</h3>
      <p>Please try again soon!</p>
    </div>
  )
  const successMessage = (
    <div className="email-success-error-msg">
      <h3>Thank you for contacting me!</h3>
      <p>Please check your email for confirmation that your message had been sent.</p>
    </div>
  )
  return (
    <>
      <form className="contact-form" onSubmit={(e) => submitFormHandler(e)}>
        <div>
          Full Name <span className="text-required">(required)</span>
        </div>
        <div className="contact-form-full-name">
          <label className="contact-form-firstname-label">
            <div>First Name <span className="text-required">(required)</span></div>
            <input className="contact-form-text-input" required={true}></input>
          </label>
          <label className="contact-form-lastname-label">
            <div>Last Name <span className="text-required">(required)</span></div>
            <input className="contact-form-text-input" required={true}></input>
          </label>
        </div>
        <label className="contact-form-email-label">
          <div>Email Address <span className="text-required">(required)</span></div>
          <input className="contact-form-text-input" required={true}></input>
        </label>
        <label className="contact-form-message-label">
          <div>Message <span className="text-required">(required)</span></div>
          <textarea className="contact-form-message-textarea" required={true} placeholder='Enter your message here...'></textarea>
        </label>
        <div style={{
          textAlign: windowWidth <= 800 ? 'center' : ''
        } as React.CSSProperties }>
          <input 
            className={`contact-form-submit-btn contact-form-submit-btn-${ isDarkMode ? 'isdm' : 'notdm' }`} 
            type="submit" 
            value="SEND YOUR MESSAGE"
          />
          {isWaitingForServerResponse ? <span style={{ marginLeft: 20 }}></span> : null }
        </div>
      </form>
      <WaitingForServerResponseModalWrapper isOpen={isWaitingForServerResponse}>
        <div className="waiting-for-server-modal-inner-window-background">
            <LoaderIcon/>
        </div>
      </WaitingForServerResponseModalWrapper>
      <EmailConfirmationModalWrapper isOpen={modalOpen} setModalClosed={ () => setModalOpen(false)}>
        <div className="email-confirmation-modal-inner-window-background">
          <div className="confirmation-message">
            { emailSentIsError ? errorMessage : successMessage }
          </div>
          <div className="back-btn-wrapper">
            <button className="back-btn" onClick={() => { setModalOpen(false) }}>BACK</button>
          </div>
        </div>
      </EmailConfirmationModalWrapper>
    </>
  )
}

const WaitingForServerResponseModalWrapper = ({ isOpen, children }: any) => {
  if (!isOpen) return null

  const modal = (
    <div id="waiting-for-server-modal-wrapper" className="waiting-for-server-modal-wrapper">
      <div className="waiting-for-server-modal-inner-window">
        {children}
      </div>
    </div>
  )

  return ReactDom.createPortal(modal, document.getElementById('portal'))
}

const EmailConfirmationModalWrapper = ({ isOpen, children }: any) => {
  
  if (!isOpen) return null

  const modal = (
    <div id="email-confirmation-modal-wrapper" className="email-confirmation-modal-wrapper">
      <div className="email-confirmation-modal-inner-window">
        {children}
      </div>
    </div>
  )

  return ReactDom.createPortal(modal, document.getElementById('portal'))
}


export default ContactForm