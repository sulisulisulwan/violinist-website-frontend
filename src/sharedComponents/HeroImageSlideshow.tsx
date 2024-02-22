import * as React from 'react'
const { useState, useEffect } = React

interface heroImageSlideshowPropsIF {
  imageSrcArray: string[]
}

const HeroImageSlideshow = ({ imageSrcArray }: heroImageSlideshowPropsIF) => {

  const [imgArrayIndex, setImgArrayIndex]= useState(0)
  
  useEffect(() => { 
    // set up a setinterval here??
  }, [imgArrayIndex])

  return (
    <div>
      <img 
        className="hero-slideshow-fade-out"
        src={imageSrcArray[imgArrayIndex]}
        style={{
          maxWidth: '100%',

        }}
      />
    </div>
  )
}

export default HeroImageSlideshow