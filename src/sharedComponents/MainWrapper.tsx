import * as React from 'react'
const { useContext } = React
import { GlobalAppState } from '../Layout'


interface mainWrapperPropsIF {
  children: React.ReactNode
  paddingBottom?: number
}

const MainWrapper = ({ children, paddingBottom = 30 }: mainWrapperPropsIF) => {

  const { globalSidePadding } = useContext(GlobalAppState)

  return (
    <main style={{
      paddingLeft: globalSidePadding,
      paddingRight: globalSidePadding,
      paddingBottom,
      fontSize: 13,
    }}>
      {children}
    </main>
  )
}

export default MainWrapper