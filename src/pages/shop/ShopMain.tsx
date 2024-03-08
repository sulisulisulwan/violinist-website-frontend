import * as React from 'react'
const { useContext, useState } = React
import MainWrapper from '../../sharedComponents/MainWrapper'
import { heroPhotos1 } from '../../hero-photos'
import { GlobalAppState } from '../../Layout'
import ThreeSquareGridGroup from '../../sharedComponents/threeSquareGrid/ThreeSquareGridGroup'
import ModalWrapper from '../../sharedComponents/modals/ModalWrapper'
import ProductDetail from './ProductDetail'
import ShopModal from './ShopModal'
import { useGetProductDataGroups } from './hooks'


const ShopMain = () => {

  const { windowWidth } = useContext(GlobalAppState)
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ modalProductId, setModalProductId ] = useState(null)

  const isReverseFlexWrap = windowWidth < 1280
  const { productGroups, fetchedProductData } = useGetProductDataGroups()

  return (
    <>
      <MainWrapper heroPhotos={heroPhotos1}>
        <section  id="shop" className="shop">
          <h1>SHOP</h1>
          {
            productGroups.map((groupOfThree, index) => {
              const productComponents = groupOfThree.map((product, idx) => {
                if (!product) return null

                return <ProductDetail
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
        </section>
      </MainWrapper>
      <ModalWrapper 
        modalName='product' 
        isOpen={modalIsOpen} 
        setModalClosed={() => setModalIsOpen(false)}
      >
        <ShopModal
          setModalClosed={() => setModalIsOpen(false)}
          productData={modalProductId ? fetchedProductData.find((product) => product.id === modalProductId) : null}
          isReverseFlexWrap={isReverseFlexWrap}
        />
      </ModalWrapper>
    </>
  )
}

export default ShopMain