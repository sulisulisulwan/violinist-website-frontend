import * as React from 'react'
const { useContext } = React
import { GlobalAppState } from '../../Layout'
import ThreeSquareGridListItemWrapper from './ThreeSquareGridListItemWrapper'

interface threeSquareGridGroupPropsIF {
  listItemComponents: React.ReactNode[]
}

const ThreeSquareGridGroup = ({ listItemComponents }: threeSquareGridGroupPropsIF) => {

  
  const { windowWidth } = useContext(GlobalAppState)

  const isFlexWrap = windowWidth < 600

  return (
  <>
    <ul  
      className="sections-group-1"
      style={{
        display: 'flex',
        flexDirection: isFlexWrap ? 'column' :  'row',
        listStyleType: 'none',
        alignItems: isFlexWrap ? 'center' : '',
        alignContent: isFlexWrap ? 'center' : '',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      {
        listItemComponents.map((listItem, i) => {
          return (
            <ThreeSquareGridListItemWrapper
              key={i} 
              position={i}
            >
              {listItem}
            </ThreeSquareGridListItemWrapper>
          )
        })
      }
    </ul>
  </> 
  )
}


export default ThreeSquareGridGroup