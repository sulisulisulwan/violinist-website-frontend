import * as React from 'react'
const { useState, useContext } = React
import ProductIcon from './ProductIcon'
import ThreeSquareGridGroup from '../../sharedComponents/threeSquareGrid/ThreeSquareGridGroup'
import ModalWrapper from '../../sharedComponents/modals/ModalWrapper'
import ShopModal from './ShopModal'
import Cart from './Cart'
import { useGetProductDataGroups } from './hooks'
import { GlobalAppState } from '../../Layout'

const ShopItemsDisplay = () => {


  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ modalProductId, setModalProductId ] = useState(null)
  const { productGroups, fetchedProductData } = useGetProductDataGroups()
  const { windowWidth } = useContext(GlobalAppState)


  const isReverseFlexWrap = windowWidth < 1280

  return (
    <div className="shop-items-display">
      <h2>Click for details</h2>
      {
        productGroups.map((groupOfThree, index) => {
          const productComponents = groupOfThree.map((product, idx) => {
            if (!product) return null
  
            return <ProductIcon
              productData={product}
              isReverseFlexWrap={isReverseFlexWrap}
              setModalProductId={setModalProductId}
              setModalIsOpen={setModalIsOpen}
            />
          })
  
          return (
            <ThreeSquareGridGroup
              listItemComponents={productComponents}
            />
          )
        })
      }
      <Cart fetchedProductData={fetchedProductData}/>
      <ModalWrapper 
        modalName='product' 
        isOpen={modalIsOpen} 
        setModalClosed={() => setModalIsOpen(false)}
      >
        <ShopModal
          setModalClosed={() => setModalIsOpen(false)}
          productData={modalProductId ? fetchedProductData.find((product) => product.id === modalProductId) : null}
          windowWidth={windowWidth}
        />
      </ModalWrapper>
    </div>
  )
}

export default ShopItemsDisplay