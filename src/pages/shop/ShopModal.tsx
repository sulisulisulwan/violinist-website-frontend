import * as React from 'react'
import { NAVY_BLUE_MED } from '../../sharedStyles/colors'
import ProductDetail from './ProductDetail'
import HoverPopIcon from '../../sharedComponents/HoverPopIcon'

interface shopModalPropsIF {
  productData: any
  isReverseFlexWrap: boolean
  setModalClosed: React.Dispatch<React.SetStateAction<boolean>>
}

const ShopModal = ({ productData, isReverseFlexWrap, setModalClosed }: shopModalPropsIF) => {

  return (
    <div style={{
      border: 'lightgray solid 2px',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 50,
      paddingBottom: 50,
      minWidth: 300
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
      <ProductDetail
        productData={productData}
        isReverseFlexWrap={isReverseFlexWrap}
        setModalProductId={productData.id}
        setModalIsOpen={() => {}}
      />
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
        onClick={() => { console.log('TAKE TO THIRD PARTY PAYPAL CLIENT') }}
      >
        BUY
      </button>
    </div>
  )
}

export default ShopModal