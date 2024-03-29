import * as React from 'react'
import { PhotoDataAPI } from 'suli-violin-website-types/src'
import HoverPopIcon from '../HoverPopIcon'
import { GlobalAppState } from '../../Layout'
const { useContext } = React

interface pictureModalPropsIF {
  currPicIndex: number
  setPicIndex: React.Dispatch<React.SetStateAction<number>>
  picDataArray: PhotoDataAPI[]
  setModalClosed: React.Dispatch<React.SetStateAction<boolean>>
  cssFadeAnimation: any
}

const PictureModal = ({ currPicIndex, setPicIndex, picDataArray, setModalClosed, cssFadeAnimation }: pictureModalPropsIF) => {
  
  const { config } = useContext(GlobalAppState)
  
  if (currPicIndex === null) return null
  
  const next = () => {
    let nextIndex = currPicIndex + 1
    if (nextIndex === picDataArray.length) {
      nextIndex = 0
    }
    setPicIndex(nextIndex)
  }

  const prev = () => {
    let prevIndex = currPicIndex - 1
    if (prevIndex < 0) {
      prevIndex = picDataArray.length - 1
    }
    setPicIndex(prevIndex)
  }

  let currPic = picDataArray[currPicIndex]

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
          src={`${config.getField('BACKEND_API_BASE_URL')}/photos?id=${currPic.id}&isCropped=true`}
        />
        <HoverPopIcon
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
        <HoverPopIcon
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
        <HoverPopIcon
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

export default PictureModal