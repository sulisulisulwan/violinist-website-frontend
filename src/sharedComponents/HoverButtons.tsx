import * as React from 'react'

interface hoverButtonPropsIF {
  imgSrc: string
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>
}

const HoverButton = ({ imgSrc, onClickHandler }: hoverButtonPropsIF) => {

  return (
    <button style={{ border: 0, background: 0 }}  onClick={ onClickHandler }>
      <img style={{ maxWidth: 12 }}  src={imgSrc}/>
    </button>
  )
}

export default HoverButton