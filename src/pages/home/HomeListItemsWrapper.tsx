import * as React from 'react'
const { useContext } = React
import { GlobalAppState } from '../../Layout'

interface homeListItemsWrapperPropsIF {
  position: number
  children: React.ReactNode
}


const HomeListItemsWrapper = ({ position, children }: homeListItemsWrapperPropsIF) => {

  const { windowWidth } = useContext(GlobalAppState)
  const isFlexWrap = windowWidth < 600

  const sidePadding = getSidePadding(windowWidth, position)


  const baseStyle = {
    // width: isFlexWrap ? '67%' : '33%',
    width: isFlexWrap ? '100%' : '33%',
    paddingBottom: 50
  }

  let computedStyle = baseStyle

  if (!isFlexWrap) {
    computedStyle = {
      ...sidePadding,
      ...baseStyle
    }
  }

  return (
    <li style={computedStyle}>
      { children }
    </li>
  )
  
}

interface paddingsIF {
  0: { paddingRight: number }
  1: { paddingLeft: number }
  2: { paddingLeft: number }
}
interface sidePaddingMapIF {
  1200: paddingsIF
  upTo1200: paddingsIF
  1000: paddingsIF
}

const sidePaddingMap: sidePaddingMapIF = {
  1200: {
    0: { paddingRight: 70 },
    1: { paddingLeft: 35 },
    2: { paddingLeft: 70 },
  },
  upTo1200: {
    0: { paddingRight: 60 },
    1: { paddingLeft: 35 },
    2: { paddingLeft: 60 },
  },
  1000: {
    0: { paddingRight: 50 },
    1: { paddingLeft: 20 },
    2: { paddingLeft: 50 },
  }
}

const getSidePadding = (windowWidth: number, position: number) => {
  let sidePadding: React.CSSProperties

  if (windowWidth >= 1200) {
    sidePadding = sidePaddingMap[1200][position as keyof paddingsIF]
  } else if (windowWidth < 1200 && windowWidth >= 1000) {
    sidePadding = sidePaddingMap['upTo1200'][position  as keyof paddingsIF]
  } else {
    sidePadding = sidePaddingMap[1000][position as keyof paddingsIF]
  }

  return sidePadding
}

export default HomeListItemsWrapper