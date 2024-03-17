import * as React from 'react'
import { NAVY_BLUE_MED } from '../../sharedStyles/colors'
import HoverPopIcon from '../../sharedComponents/HoverPopIcon'
import { GlobalAppState } from '../../Layout'

interface shopModalPropsIF {
  productData: any
  windowWidth: number
  setModalClosed: React.Dispatch<React.SetStateAction<boolean>>
}

const ShopModal = ({ productData, windowWidth, setModalClosed }: shopModalPropsIF) => {

  const { cart, setCart } = React.useContext(GlobalAppState).cartStateManagement
  const isReverseFlexWrap = windowWidth < 560

  return (
    <div style={{
      border: 'lightgray solid 2px',
      width: isReverseFlexWrap ? 360 : 530,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 50,
      paddingBottom: 50,
      minWidth: 300,
      alignItems: 'center',
    }}>
      <HoverPopIcon
        onClickHandler={() => setModalClosed(false)}
        cls={"close-button"}
        right={0}
        bottom={-25}
        top={''}
        left={''}
        width={20}
        growth={2}
        imgSrc={'/images/carousel-icons/close-button.png'}
      />
      <div style={{
        textAlign: isReverseFlexWrap ? 'center' : 'left', 
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div className="product-image-and-description"
          style={{
            display: 'flex',
            maxWidth: '80%',
            cursor: 'pointer',
            flexWrap: isReverseFlexWrap ? 'wrap-reverse' : 'nowrap',
          }}
          onClick={() => {}}
        >
          <div style={{
            paddingTop: isReverseFlexWrap ? 20 : 0,
            textAlign: 'center',
            justifyContent: 'center',
            width: '100%'
          }}>
            <img style={{
              maxWidth: 140
            }}
              src={productData.img}
            />
          </div>
          <div style={{
            paddingLeft: isReverseFlexWrap ? 0 : 20,
          }}>
            <span style={{
              color: NAVY_BLUE_MED,
              fontSize: 20,
              fontFamily: 'Mate, serif',
            }}>
              {productData.name}
            </span>
            <br/>
            <br/>
            <span>
              {productData.description}
            </span>
            <br/>
          </div>
        </div>
      </div>
      <div className="product-price" 
        style={{ 
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 900
        }}>
        ${productData.price}
      </div>
      <button
        style={{
          marginTop: '20px',
          width: '50%',
          color: 'white',
          backgroundColor: NAVY_BLUE_MED,
          fontSize: '15px',
          fontFamily: 'Gill Sans, sans-serif',
          padding: '10px',
          border: 'none',
          cursor: 'pointer'
        }}
        value={'BUY'}
        onClick={() => { 

          let newCount = cart[productData.id] || 0
          newCount++
          setCart({
            ...cart,
            [productData.id]: newCount
          })
          setModalClosed(false)
        }}
      >
        ADD TO CART
      </button>
    </div>
  )
}

export default ShopModal