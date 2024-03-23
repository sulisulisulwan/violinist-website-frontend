import * as React from 'react'
const { useState, useContext } = React
import { DARK_MODE_BACKGROUND_COLOR, NAVY_BLUE_MED } from '../../sharedStyles/colors'
import { GlobalAppState } from '../../Layout'

const Cart = ({ fetchedProductData }: any) => {

  if (!fetchedProductData.length) return null
  const { darkModeStateManagement, cartStateManagement, windowWidth } = useContext(GlobalAppState)
  const { cart, setCart } = cartStateManagement
  const { isDarkMode } = darkModeStateManagement
  const [ isMinimized, setIsMinimized ] = useState(false)
  const productIdsInCart = Object.keys(cart)

  const cartDisplayData: any = {
    itemized: [],
    total: 0
  }

  productIdsInCart.forEach(id => {
    const productInfo = fetchedProductData.find((i: any) => i.id === Number(id))
    const subTotalForProduct = productInfo.price * cart[id]
    const productItem = {
      id: productInfo.id,
      name: productInfo.name,
      price: productInfo.price,
      subtotal: subTotalForProduct
    }
    cartDisplayData.itemized.push(productItem)
    cartDisplayData.total += subTotalForProduct
  })

  if (isMinimized) {
    return <div style={{
      width: 50,
      borderRadius: '0px 0px 0px 10px',
      border: `1px solid ${isDarkMode ? 'dimgray' : 'gray'}`,
      zIndex: 400,
      position: 'fixed',
      top: windowWidth > 1080 ? 100 : 80,
      right: 0,
      padding: 10,
      opacity: .8,
      backgroundColor: isDarkMode ? DARK_MODE_BACKGROUND_COLOR : 'white'
    }}>
      <img 
        style={{ cursor: 'pointer' }} 
        onClick={() => setIsMinimized(false)}
        src={`images/cart-${isDarkMode ? 'white' : 'blue'}.png`}
      />
    </div>
  }

  const buttonOnHoverStyle = {
    color: isDarkMode ? 'white' : 'black',
    background: 'rgba(255, 255, 255, 0.3)',
    border: '0px solid black',
    height: 25,
    width: 25,
    borderRadius: 100 
  }

  const buttonOnClickHoldStyle = {
    color: isDarkMode ? 'black' : 'white',
    background: 'white',
    border: '0px solid black',
    height: 25,
    width: 25,
    borderRadius: 100 
  }
  const buttonNotOnHoverStyle = {
    height: 25,
    width: 25,
    color: isDarkMode ? 'white' : 'black',
    background: 'none',
    border: 'none'
  }

  return (
    <div style={{ 
      backgroundColor: isDarkMode ? DARK_MODE_BACKGROUND_COLOR : 'white',
      border: `1px solid ${isDarkMode ? 'dimgray' : 'gray'}`,
      borderRadius: '0px 0px 0px 10px',
      width: 300,
      position: 'fixed',
      top: 80,
      right: 0,
      opacity: .8,
      zIndex: 400,
    }}>
      <div style={{
        padding: 10, 
        borderBottom: `1px solid ${isDarkMode ? 'dimgray' : 'gray'}`,
        display: 'flex', 
        justifyContent: 'space-between' 
      }}>
        <div>CART</div>
        <div 
          onClick={() => setIsMinimized(true)}
          style={{ fontSize: 20, cursor: 'pointer' }}
        >-</div>
      </div>
      <div style={{ padding: 10 }}>
        { 
          cartDisplayData.itemized.map((productItem: any, index: number) => {
            return  (
              <div 
                key={productItem.name + index}
                style={{ 
                  display: 'grid', 
                  marginBottom: 10, 
                  paddingBottom: 5, 
                  gridTemplateColumns: '225px 30px 30px', 
                  borderBottom: '1px dotted gray'
                }}
              >
                <div>
                  <div>{productItem.name}</div>
                  <div>${productItem.price}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                  <span style={{ textAlign: 'center' }}>
                    <HoverButtonWithText 
                      textOrImage={'+'} 
                      onClickHandler={() => { 
                        setCart((pS: any) => ({ ...pS, [productItem.id]: pS[productItem.id] + 1 })) 
                      }}
                      stylesOnHover={buttonOnHoverStyle} 
                      stylesNotHover={buttonNotOnHoverStyle}
                      stylesOnClickHold={buttonOnClickHoldStyle}
                      />
                  </span>
                  <span style={{ textAlign: 'center' }}>{cart[productItem.id]}</span>
                  <span style={{ textAlign: 'center' }}>
                    <HoverButtonWithText 
                      textOrImage={'-'} 
                      onClickHandler={() => { 
                        setCart((pS: any) => ({ ...pS, [productItem.id]: pS[productItem.id] - 1 || 1 })) 
                      }}
                      stylesOnHover={buttonOnHoverStyle} 
                      stylesNotHover={buttonNotOnHoverStyle}
                      stylesOnClickHold={buttonOnClickHoldStyle}
                    />
                  </span>
                </div>
                <div style={{ paddingTop: 20 }}>
                  <HoverButtonWithText
                    textOrImage={<img style={{ height: 20 }} src={`images/cart-delete-${isDarkMode ? 'white' : 'blue'}.png`}/>}
                    stylesOnHover={{ opacity: 1, background: 'none', border: '0px solid black', }} 
                    stylesNotHover={{ opacity: .3,  background: 'none', border: '0px solid black',  }}
                    stylesOnClickHold={{ opacity: 1, background: 'none', border: '0px solid black' }}
                    onClickHandler={() => { setCart((pS: any) => { const copy = { ...pS}; delete copy[productItem.id]; return copy })}}
                  />
                </div>
              </div>
            )
          }) 
        }
      </div>
      
      <div className="total-and-checkout" 
        style={{ 
          padding: 10,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div>TOTAL: ${cartDisplayData.total}</div>
        <HoverButtonWithText
          textOrImage={<a href="/shop/checkout">CHECKOUT</a>}
          disabled={!cartDisplayData.itemized.length}
          stylesOnHover={{
            color: isDarkMode ? 'black' : 'white',
            background: isDarkMode ? 'white' : NAVY_BLUE_MED,
            border: '0px solid black',
            borderRadius: 100 
          }} 
          stylesNotHover={{
            color: isDarkMode ? 'white' : 'black',
            background: isDarkMode ? 'none' : 'none' ,
            border: 'none'
          }}
          stylesOnClickHold={{
            color: isDarkMode ? 'black' : 'white',
            background: isDarkMode ? 'white' : NAVY_BLUE_MED,
            border: '0px solid black',
            borderRadius: 100 
          }} 
          stylesDisabled={{
            color: isDarkMode ? 'white' : 'black',
            background: isDarkMode ? 'none' : 'none' ,
            border: 'none',
            opacity: .5
          }}
        />
      </div>
    </div>
  )
}



const HoverButtonWithText = ({ 
  textOrImage, 
  disabled = false,
  stylesDisabled = {},
  stylesOnHover = {}, 
  stylesNotHover = {}, 
  stylesOnClickHold = {},
  onClickHandler = () => {}
}: any) => {

  const [ isHovering, setIsHovering ] = useState(false)
  const [ mouseDown, setMouseDown ] = useState(false)

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onClick={onClickHandler}
      style={ disabled ? stylesDisabled : mouseDown ? stylesOnClickHold : isHovering ? stylesOnHover : stylesNotHover }
    >{textOrImage}</button>
  )
}

export default Cart