import * as React from 'react'
import { PhotoDataAPI } from 'suli-violin-website-types/src'
const { useState } = React

interface pictureModalPropsIF {
  initIndex: number
  picDataArray: PhotoDataAPI[]
  setModalClosed: React.Dispatch<React.SetStateAction<boolean>>
}

const PictureModal = ({ initIndex, picDataArray, setModalClosed }: pictureModalPropsIF) => {

  const [ picIndex, setPicIndex ] = useState(initIndex)

  const next = () => {
    let nextIndex = picIndex + 1
    if (nextIndex === picDataArray.length) {
      nextIndex = 0
    }
    setPicIndex(nextIndex)
  }

  const prev = () => {
    let prevIndex = picIndex - 1
    if (prevIndex < 0) {
      prevIndex = picDataArray.length - 1
    }
    setPicIndex(prevIndex)
  }

  let currPic = picDataArray[picIndex]

  return (
    <div style={{
      borderRadius: .5,
      border: 'white solid 2px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className="image-carousel"
        style={{
          display: 'relative'
        }}
      >
        <img 
          style={{
            position: 'relative',
            maxWidth: '50vw',
            maxHeight: '90vh',
            padding: .5,
          }}
          src={`http://localhost:1337/v1/media/photos?id=${currPic.id}&isCropped=true`}
        />
        <HoverCarouselIcon
          onClickHandler={prev}
          cls={"prev-picture-carousel-icon"}
          top={'45%'}
          left={10}
          right={''}
          bottom={''}
          imgSrc={'/images/carousel-icons/carousel-prev-arrow.png'}
          width={50}
          growth={10}
          />
        <HoverCarouselIcon
          onClickHandler={next}
          cls={"next-picture-carousel-icon"}
          top={'45%'}
          left={''}
          right={10}
          bottom={''}
          imgSrc={'/images/carousel-icons/carousel-next-arrow.png'}
          width={50}
          growth={10}
        />
        <div style={{
            fontSize: 11,
            position: 'absolute',
            left: 0
          }}>
            Photo Credit: {currPic.photoCred}
        </div>
        <HoverCarouselIcon
          onClickHandler={() => setModalClosed(false)}
          cls={"close-button"}
          right={0}
          bottom={-25}
          top={''}
          left={''}
          width={20}
          growth={2}
          imgSrc={'/images/carousel-icons/close-button.png'}
        />
      </div>
    </div>
  )
}

interface hoverCarouselIconPropsIF {
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

const HoverCarouselIcon = ({ 
  cls, 
  imgSrc, 
  onClickHandler, 
  top = '', 
  left = '', 
  right = '', 
  bottom = '', 
  width, 
  growth 
}: hoverCarouselIconPropsIF) => {

  const [ isHovering, setIsHovering ] = useState(false)

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

export default PictureModal