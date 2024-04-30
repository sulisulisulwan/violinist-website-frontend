import * as React from 'react'
import { useHeroWrapperSizer, useImageSlider } from './hooks'
import { GlobalAppState } from '../../Layout'

interface heroImageSlideshowPropsIF {
  imageSrcArray: string[]
}

const HeroImageSlideshow = ({ imageSrcArray }: heroImageSlideshowPropsIF) => {

  const { heroPhotoRef, wrapperHeight } = useHeroWrapperSizer()
  const { imgArrayIndex, afterFirstTransition } = useImageSlider(imageSrcArray)
  const { darkModeStateManagement } = React.useContext(GlobalAppState)
  const { isDarkMode } = darkModeStateManagement
  
  return (
    <div className="hero-image-slideshow-wrapper">
      <ul 
        className="hero-image-slideshow-ul"
        style={{ 
          height: wrapperHeight ? wrapperHeight : 0
        }}
      >
        { 
          imageSrcArray.map((imgSrc, index) => {
            const baseImgClass = 'hero-image-slideshow-img'
            const prevIdx = imgArrayIndex - 1 < 0 ? imageSrcArray.length - 1 : imgArrayIndex - 1
            return (
              <li className="hero-image-slideshow-li" key={imgSrc + index}>
                <img 
                  ref={index === 0 ? heroPhotoRef : null}
                  className={`${baseImgClass} ${baseImgClass}-${index === imgArrayIndex ? 'first' : index === prevIdx ? 'visible' : 'hidden' }${index === imgArrayIndex && afterFirstTransition ? ' ' + baseImgClass + '-animate' : ''} ${ isDarkMode ? baseImgClass + '-isdm' : ''}`}
                  src={imgSrc}
                />
              </li>
            )
          }
          ) 
        }
      </ul>
    </div>
  )
}

export default HeroImageSlideshow