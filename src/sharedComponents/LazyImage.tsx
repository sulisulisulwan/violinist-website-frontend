import * as React from 'react'
const { useState, useEffect } = React

const LazyImage = ({ src, alt, onClickHandler = () => {}, addedStyle }: any) => {

  const [ imageLoaded, setImageLoaded ] = useState(false)

  const spinnerStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'clip',
    overflowClipMargin: 'content-box'
  }

  const loadedImgStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    minHeight: '100%',
    aspectRatio: '2 / 1.4',
    objectFit: 'cover',
    overflow: 'clip',
    overflowClipMargin: 'content-box',
    animation: 'fadeIn 2s linear',
    ...addedStyle,
  }

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageLoaded(true)
    }
    img.src = src
  })

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        {
          !imageLoaded && <img src="./images/spinner.gif" style={spinnerStyle} alt="spinner"/>
          // !imageLoaded && null
        }
        {
          imageLoaded && <img onClick={onClickHandler} style={loadedImgStyle} src={src} alt={alt}/>
        }
      </div>
    </>
  )
}

export default LazyImage