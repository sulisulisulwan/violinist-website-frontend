import * as React from 'react'
import { NAVY_BLUE_MED } from '../../sharedStyles/colors';


const ProductDetail = ({ productData, isReverseFlexWrap, setModalProductId, setModalIsOpen }: any) => {

  return (
    <div 
      style={{
        display: 'flex',
        maxWidth: '80%',
        flexWrap: isReverseFlexWrap ? 'wrap-reverse' : 'nowrap',
      }}
      onClick={() => { setModalProductId(productData.id); setModalIsOpen(true) }}
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
      </div>
    </div>
  )
}

export default ProductDetail