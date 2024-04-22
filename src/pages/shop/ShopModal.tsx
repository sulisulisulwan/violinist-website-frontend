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
    <div className="shop-modal">
      { productData === null ? null : 
        <>
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
          <div className="product-image-and-description-wrapper">
            <div className="product-image-and-description">
              <div className='product-image-wrapper'>
                <img src={productData.img}/>
              </div>
              <div className="product-description-wrapper">
                <span>{productData.name}</span>
                <br/><br/>
                <span>{productData.description}</span>
                <br/>
              </div>
            </div>
          </div>
          <div className="product-price">
            ${productData.price}
          </div>
          <button className="product-buy-button"
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
        </>
      }
    </div>
  )
}

export default ShopModal