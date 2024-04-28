import { useEffect, useRef, useState } from "react"


export const useFadeInSection = () => {
  const [isVisible, setIsVisible] = useState(true)
  const domRef = useRef()
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting))
    })
      observer.observe(domRef.current)
    return () => {
      if (domRef.current) observer.unobserve(domRef.current)
    }
  }, [domRef.current])

  return { fadeInSectionClassName: isVisible ? 'fade-in-section is-visible' : 'fade-in-section', domRef }
}