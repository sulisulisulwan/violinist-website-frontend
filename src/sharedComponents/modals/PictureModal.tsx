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
    <div className="photos-modal">
      <div className="photos-carousel">
        <img 
          className="photos-carousel-img"
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
        <div className='photos-carousel-img-credit'>
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