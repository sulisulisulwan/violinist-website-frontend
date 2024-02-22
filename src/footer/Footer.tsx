import * as React from 'react'
const { useContext } = React
import { NAVY_BLUE_MED } from '../sharedStyles/colors'
import getSocialIcons from '../socialIcons'
import { GlobalAppState } from '../Layout'

const Footer = () => {
  
  const { globalSidePadding } = useContext(GlobalAppState)
  const socialIcons = getSocialIcons('white')

  return (
    <footer>
      <div 
        className="footer-body"
        style={{
          borderTop: '5px solid gray',
          background: NAVY_BLUE_MED,
          paddingLeft: globalSidePadding,
          paddingRight: globalSidePadding,
        }}
        >
        <div className="footer-content-wrapper"
          style={{
            paddingTop: 21,
            paddingBottom: 31,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div 
            className='name-logo'
            style={{
              fontSize: 20,
              fontWeight: 'lightest',
            }}
          >
            <span style={{
              color: 'white' 
            }}>SULIMAN TEKALLI</span>
            <span style={{
              color: 'lightgray'
            }}>VIOLINIST</span>
          </div>
          <div
            className='credits'
            style={{
              color: 'white'
            }}
          >
            { socialIcons.map((iconData, i) => {
              return (
                <a 
                  target="_blank"
                  key={iconData.label + i}
                  style={{
                    paddingRight: 20
                  }}
                  href={iconData.href}>
                    <img width={20} src={iconData.src}/>
                </a>
              )
            }) }
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer