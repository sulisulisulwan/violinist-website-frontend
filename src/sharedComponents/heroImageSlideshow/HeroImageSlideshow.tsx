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
    <div style={{ 
      maxWidth: 1920,
    }}>
      <ul style={{ 
        listStyleType: 'none', 
        listStylePosition: 'outside',
        padding: 0, 
        position: 'relative',
        paddingBottom: 20,
        margin: 0,
        height: wrapperHeight ? wrapperHeight : 0
      }}>
        { 
          imageSrcArray.map((imgSrc, index) => {

            const prevIdx = imgArrayIndex - 1 < 0 ? imageSrcArray.length - 1 : imgArrayIndex - 1
            return (
              <li 
                key={imgSrc + index}
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                  <img 
                    ref={index === 0 ? heroPhotoRef : null}
                    className="hero-slideshow-fade-out"
                    src={imgSrc}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      margin: 0,
                      padding: 0,
                      border: isDarkMode ? '.2px solid darkgray' : '',
                      zIndex: index === imgArrayIndex ? 5 : index === prevIdx ? 4 : 0,
                      animation: index === imgArrayIndex && afterFirstTransition ? 'fadeIn 1s linear' : ''
                    }}
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