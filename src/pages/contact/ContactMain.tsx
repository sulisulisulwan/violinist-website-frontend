import * as React from 'react'
const { useContext } = React
import ContactForm from './ContactForm'
import HeroImageSlideshow from '../../sharedComponents/HeroImageSlideshow'
import MainWrapper from '../../sharedComponents/MainWrapper'
import { heroPhotos1 } from '../../hero-photos'
import { GlobalAppState } from '../../Layout'

const ContactMain = () => {

  const { windowWidth } = useContext(GlobalAppState)

  const isCollapsed = windowWidth <= 800

  const layoutStyle: React.CSSProperties = isCollapsed ? {
    display: 'flex',
    flexDirection: 'column'
  } : {
    display: 'grid',
    gridTemplateColumns: '50% 50%'
  }

  return (
    <MainWrapper>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos1}/>
      </section>
      <section  id="contact" className="contact">
        <h1>CONTACT</h1>
        <div style={layoutStyle}>
          <div>
            <h2>For bookings within the U.S. contact:</h2>
            <ul 
              style={{
                listStyleType: 'none',
                padding: 0
              }}
            >
              <li>General Arts Touring, Inc.</li>
              <li>Tom Gallant</li>
              <li>(917) 645-5383</li>
              <li>info@genartstouring.com</li>
              <li>www.GeneralArtsTouring.com</li>
            </ul>
          </div>
          <div>
            <h3>Get in touch with me personally by filling out the form below or emailing at sulimantekalli@gmail.com</h3>
            <br/>
            <ContactForm windowWidth={windowWidth}/>
          </div>
        </div>
      </section>
    </MainWrapper>
  )
}

export default ContactMain