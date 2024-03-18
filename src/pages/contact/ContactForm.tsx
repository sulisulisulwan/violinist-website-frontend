import * as React from 'react'
import * as ReactDom from 'react-dom'
import axios from 'axios'
import { NAVY_BLUE_MED } from '../../sharedStyles/colors'
import { GlobalAppState } from '../../Layout'
const { useState, useContext } = React

const ContactForm = ({ windowWidth }: any) => {

  const { darkModeStateManagement, config } = useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement

  const [ modalOpen, setModalOpen ] = useState(false)
  const [ emailSentIsError, setEmailSentIsError ] = useState(false)

  const submitForm = async (e: any) => {
    e.preventDefault()

    try {
      const [ firstName, lastName, email, message] = e.target
  
      const url = config.getField('BACKEND_API_BASE_URL') + '/contact'
      const body = {
        data: {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          message: message.value
        }
      }

      const resp = await axios.post(url, body)
      if (resp.data.error.isError) {
        throw new Error()
      }

      setEmailSentIsError(false)
    } catch(e) {
      setEmailSentIsError(true)
    }
    
    setModalOpen(true)
  }

  const errorMessage = (
    <div style={{ textAlign: 'center'}}>
      <h3>There was a an error sending your email.</h3>
      <p>Please try again soon!</p>
    </div>
  )
  const successMessage = (
    <div style={{ textAlign: 'center'}}>
      <h3>Thank you for contacting me!</h3>
      <p>Please check your email for confirmation that your message had been sent.</p>
    </div>
  )
  return (
    <>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        fontSize: '14px'
      }} onSubmit={(e) => submitForm(e)}>
        <div>
          Full Name <span className="text-required">(required)</span>
        </div>
        <div className="form-full-name" style={{
          display: 'flex',
          flexDirection: windowWidth <= 600 ? 'column' : 'row',
          justifyContent: 'stretch',
          marginBottom: '20px'
        }}>
          <label style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginRight: '10px',
            marginBottom: windowWidth <= 600 ? 20 : ''
          }}>
            <div>
              First Name <span className="text-required">(required)</span>
            </div>
            <input style={{
              padding: '10px',
              backgroundColor: '#F8F8FF',
              border: 'solid gray 1px'
            }} required={true}></input>
          </label>
          <label style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}>
            <div>
              Last Name <span className="text-required">(required)</span>
            </div>
            <input style={{
              padding: '10px',
              backgroundColor: '#F8F8FF',
              border: 'solid gray 1px'
            }} required={true}></input>
          </label>
        </div>
        <label style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginBottom: '20px'
          }}>

          <div>
            Email Address <span className="text-required">(required)</span>
          </div>
          <input style={{
            padding: '10px',
            backgroundColor: '#F8F8FF',
            border: 'solid gray 1px'
          }} required={true}></input>
        </label>
        <label style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}>
          <div>
            Message <span className="text-required">(required)</span>
          </div>
          <textarea style={{
            height: '150px',
            backgroundColor: '#F8F8FF',
            border: 'solid gray 1px',
            fontFamily: 'Gill Sans, sans-serif',
            fontSize: '15px',
          }} required={true} placeholder='Enter your message here...'></textarea>
        </label>
        <div style={{
          textAlign: windowWidth <= 800 ? 'center' : ''
        } as React.CSSProperties }>
          <input type="submit" style={{
            marginTop: '20px',
            minWidth: '250px',
            width: '50%',
            color: 'white',
            // backgroundColor: '#191970',
            backgroundColor: isDarkMode ? 'gray' : NAVY_BLUE_MED,
            fontSize: '15px',
            fontFamily: 'Gill Sans, sans-serif',
            padding: '10px',
            border: 'none',
            cursor: 'pointer'
          }} value="SEND YOUR MESSAGE"
          />
        </div>
      </form>
      <EmailConfirmationModalWrapper isOpen={modalOpen} setModalClosed={ () => setModalOpen(false)}>
        <div style={{
          background: 'white',
          opacity: 1,
          padding: 20,
          border: ' lightgray solid 1px',
          maxWidth: 400
        }}>
          <div className="confirmation-message">
            { emailSentIsError ? errorMessage : successMessage }
          </div>
          <div className="back-btn"
            style={{
              textAlign: 'center'
            }}
          >
            <button 
              style={{
                marginTop: '20px',
                minWidth: '250px',
                width: '50%',
                color: 'white',
                backgroundColor: '#191970',
                fontSize: '15px',
                fontFamily: 'Gill Sans, sans-serif',
                padding: '10px',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => { setModalOpen(false) }}>BACK</button>
          </div>
        </div>
      </EmailConfirmationModalWrapper>
    </>
  )
}

const EmailConfirmationModalWrapper = ({ isOpen, setModalClosed, children }: any) => {
  
  if (!isOpen) return null

  const modal = (
    <div 
      id="email-confirmation-modal-wrapper" 
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


export default ContactForm