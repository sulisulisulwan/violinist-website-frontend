import * as React from 'react'

interface hoverPopIconPropsIF {
  imgSrc: string
  cls: string
  onClickHandler: React.MouseEventHandler<HTMLDivElement>
  top: string | number
  left: string | number
  right: string | number
  bottom: string | number
  width: number
  growth: number
}

const HoverPopIcon = ({ 
  cls, 
  imgSrc, 
  onClickHandler, 
  top = '', 
  left = '', 
  right = '', 
  bottom = '', 
  width, 
  growth 
}: hoverPopIconPropsIF) => {

  const [ isHovering, setIsHovering ] = React.useState(false)

  return (
    <div 
      className={cls} 
      onMouseEnter={() => { setIsHovering(true) }}
      onMouseLeave={() => { setIsHovering(false) }}
      style={{
        position: 'absolute',
        cursor: 'pointer',
        borderRadius: 100,
        top: isHovering && top ? '44%' : top,
        bottom,
        right,
        left
      }}
      onClick={onClickHandler}
    >
      <img
        src={imgSrc}
        width={isHovering ? width + growth : width}
      />
    </div>
  )
}

export default HoverPopIcon