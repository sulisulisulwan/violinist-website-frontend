import * as React from 'react'
const { useState } = React
import { Link }from 'react-router-dom'

interface hoverLinkPropsIF {
  href: string
  linkText: string
  overColor: string
  offColor: string
  onClickHandler: React.MouseEventHandler<HTMLAnchorElement>
  openInNewTab: boolean
  cls: string
}

const HoverLink = ({ 
  href, 
  linkText, 
  overColor, 
  offColor, 
  onClickHandler, 
  openInNewTab, 
  cls 
}: hoverLinkPropsIF) => {

  const [isHover, setIsHover] = useState(false)

  return (
    <div
    >
      <Link
        className={cls || ''}
        onClick={onClickHandler}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          marginTop: 20,
          padding: 0,
          color: isHover ? overColor : offColor,
          fontWeight: 900,
          background: 0,
          border: 0,
          cursor: 'pointer'
        }}
        to={href}
        target={openInNewTab ? '_blank' : ''}
      >{linkText}</Link>
    </div>
  )
}

export default HoverLink