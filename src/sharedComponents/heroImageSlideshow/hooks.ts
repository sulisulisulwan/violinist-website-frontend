import { useEffect, useRef, useState } from "react"

export const useHeroWrapperSizer = () => {
  const [ wrapperHeight, setWrapperHeight ] = useState(null)
  const heroPhotoRef = useRef()
  useEffect(() => {

    if (!heroPhotoRef.current) return
    const resizeObserver = new ResizeObserver(() => {
      setWrapperHeight((heroPhotoRef.current as any).offsetHeight)
    })
    resizeObserver.observe(heroPhotoRef.current)
    return () => resizeObserver.disconnect()
  })

  return { heroPhotoRef, wrapperHeight}
}

export const useImageSlider = (imageSrcArray: string[]) => {
  const [imgArrayIndex, setImgArrayIndex]= useState(0)
  const [ afterFirstTransition, setAfterFirstTransition ]= useState(false)
  
  useEffect(() => { 
    const update = () => {
      if (!afterFirstTransition) setAfterFirstTransition(true)
      setImgArrayIndex((prevIndex: number) => prevIndex === imageSrcArray.length - 1 ? 0 : prevIndex + 1)
    }
    const interval = setInterval(update, 10000)
    return () => clearInterval(interval)
  }, [])

  return { afterFirstTransition, imgArrayIndex}
}
