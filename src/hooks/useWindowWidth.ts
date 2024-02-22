import { useEffect, useState } from "react"

export const useWindowWidth = () => {

  const [windowWidth, setWindowWidth] = useState(window.outerWidth)
  useEffect(() => {
    const resize = (e: Event) => {
      setWindowWidth(window.outerWidth)
    }
    window.onresize = resize
  }, [])

  return windowWidth
}