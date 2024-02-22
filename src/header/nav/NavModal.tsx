import * as React from 'react'
const { useRef } = React
import * as ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { navLinkDataIF } from './nav-links'

interface navModalPropsIF {
  toggled: boolean
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>
  links: navLinkDataIF[]
}

const NavModal = ({ toggled, toggleModal, links }: navModalPropsIF) => {


  const hadOpenedHamburger = useRef(false)

  if (toggled) hadOpenedHamburger.current = true

  let computedModalWrapperStyle: React.CSSProperties  = {
    backgroundColor: 'rgb(0,0,0)',
    color: 'white',
    top: 80,
    left: 0,
    width: '0%',
    height: '0%',
    opacity: 0,
    position: 'fixed',
    zIndex: -1000
  }

  if (hadOpenedHamburger.current) {

    computedModalWrapperStyle = toggled ? {
        ...computedModalWrapperStyle,
        opacity: .8,
        height: '100%',
        width: '100%',
        animation: 'fadeInGrow .15s linear forwards',
        WebkitAnimation: 'fadeInGrow .15s linear forwards',
        zIndex: 1000
      } : {
        ...computedModalWrapperStyle,
        opacity: 0,
        height: '0%',
        width: '0%',
        animation: 'fadeOutShrink .15s linear forwards',
        WebkitAnimation: 'fadeOutShrink .15s linear forwards',
        zIndex: -1000
      }
  }


  return ReactDOM.createPortal(
    <div 
      style={computedModalWrapperStyle}
    >
      <nav className="nav-modal" style={{ textAlign: 'center' }}>
        <div style={{ opacity: 1 }}>
          <ul style={{
            color: 'white',
            fontSize: '30px',
            listStyleType:'none',
            marginTop: '100px',
          }}>
            { links.map((link, i) => { 
                return (
                  <li 
                    key={link.href + i} 
                    style={{ paddingTop: '10px' }}>
                      <Link 
                        style={{color: 'white'}}
                        to={link.href}
                        onClick={(e) => { toggleModal(false)}}
                      >{link.label}</Link>
                  </li>
                )
              }) 
            }
          </ul>
        </div>
      </nav>
    </div>, document.getElementById('portal')
  )
}


export default NavModal