import * as React from 'react'
const { useContext } = React
import HomeListItemsWrapper from './HomeListItemsWrapper'
import { GlobalAppState } from '../../Layout'

interface homeGroupPropsIF {
  listItemComponents: React.ReactNode[]
}

const HomeGroup = ({ listItemComponents }: homeGroupPropsIF) => {

  
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
        padding: 0,
      }}
    >
      {
        listItemComponents.map((listItem, i) => {
          return (
            <HomeListItemsWrapper
              key={i} 
              position={i}
            >
              {listItem}
            </HomeListItemsWrapper>
          )
        })
      }
    </ul>
  </> 
  )
}


export default HomeGroup