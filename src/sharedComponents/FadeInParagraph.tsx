import * as React from 'react'
import { useFadeInSection } from '../hooks'

const FadeInParagraph = ({ content }: any) => {
  const { domRef, fadeInSectionClassName } = useFadeInSection()
  return <p ref={domRef} className={fadeInSectionClassName}>{content}</p>
}

export default FadeInParagraph
