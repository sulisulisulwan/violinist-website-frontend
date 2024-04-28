import * as React from 'react'
import { useFadeInSection } from '../hooks'

const FadeInSection = ({ nodes }: any) => {
  const { domRef, fadeInSectionClassName } = useFadeInSection()
  return <div ref={domRef} className={fadeInSectionClassName}>{nodes}</div>
}


export default FadeInSection
