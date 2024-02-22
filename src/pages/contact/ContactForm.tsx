import * as React from 'react'
import axios from 'axios'
import config from '../../../config'

const ContactForm = () => {

  const submitForm = async (e: any) => {
    e.preventDefault()
    const [ firstName, lastName, email, message] = e.target

    const url = config.BACKEND_API_BASE_URL + '/contact'
    const body = {
      data: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        message: message.value
      }
    }

    const resp = await axios.post(url, body)

    /**
     * Once the form is submitted, we need to send a confirmation email to the email given.  
     * We should let the user know that an email has been submitted and to make sure they have received an email.
     */
  }

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
          flexDirection: 'row',
          justifyContent: 'stretch',
          marginBottom: '20px'
        }}>
          <label style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginRight: '10px'
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
        <input type="submit" style={{
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
        }} value="SEND YOUR MESSAGE"></input>
      </form>
    </>
  )
}

export default ContactForm