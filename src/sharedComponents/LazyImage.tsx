import * as React from 'react'
const { useState, useEffect } = React

const LazyImage = ({ src, alt, onClickHandler }: any) => {

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
    overflow: 'clip',
    overflowClipMargin: 'content-box',
    animation: 'fadeIn 2s linear'
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
      {
        !imageLoaded && <img src="./images/spinner.gif" style={spinnerStyle} alt="spinner"/>
        // !imageLoaded && null
      }
      {
        imageLoaded && <img onClick={onClickHandler} style={loadedImgStyle} src={src} alt={alt}/>
      }
    </>
  )
}

export default LazyImage