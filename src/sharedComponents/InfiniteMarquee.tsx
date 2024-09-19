import * as React from 'react'
import { GlobalAppState } from '../Layout'

interface infiniteMarqueePropsIF {
  text: string
  fontSize: number | string
  color: string
  scrollCycleDuration: number | string
}

const InfiniteMarquee = ({ text, fontSize, color, scrollCycleDuration }: infiniteMarqueePropsIF) => {

  const globalAppState = React.useContext(GlobalAppState)
  const { isDarkMode } = globalAppState.darkModeStateManagement
  console.log(isDarkMode)
  const fromBottom = 4
  return (
    <div>
      <div className={'marquee-left-border side-padding-div ' + (isDarkMode ? 'is' : 'not') + '-dm-side-padding-div'} ></div>
      <p style={{
        margin: 0,
        padding: 0,
        bottom: fromBottom,
        right: 100,
        verticalAlign: 'bottom',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        position: 'absolute',
      }}>
        <span style={{ 
          fontSize, color, 

          zIndex: 5,
          // .marquee span
          display: 'inline-block',
          paddingLeft: '100%',
          animation: `marquee ${scrollCycleDuration}s linear infinite`

        }}>{text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </p>
      <p style={{

        // .marquee
        // margin: '0 auto',

        margin: 0,
        padding: 0,
        bottom: fromBottom,
        right: 100,
        verticalAlign: 'bottom',


        whiteSpace: 'nowrap',
        overflow: 'hidden',
        position: 'absolute',

      }}>
        <span style={{ 
          fontSize, color, 

          zIndex: 5,
          // .marquee span
          display: 'inline-block',
          paddingLeft: '100%',
          animation: `marquee ${scrollCycleDuration}s linear infinite`

        }}>{text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </p>
      <p style={{ 

        // .marquee
        // margin: '0 auto',

        margin: 0,
        padding: 0,
        bottom: fromBottom,
        right: 100,
        verticalAlign: 'bottom',

        


        whiteSpace: 'nowrap',
        overflow: 'hidden',
        position: 'absolute',
        
      }}>
        <span style={{ 
          fontSize, color, 

          zIndex: 5,
          // .marquee span
          display: 'inline-block',
          paddingLeft: '100%',
          animation: `marquee ${scrollCycleDuration}s linear infinite`,

          // .marquee span 2
          animationDelay: `${(Number(scrollCycleDuration) / 2).toString()}s`
        }}>{text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </p>
    </div>
  )
}

export default InfiniteMarquee