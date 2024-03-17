import * as React from 'react'
import { NAVY_BLUE_MED } from '../../sharedStyles/colors';
import LazyImage from '../../sharedComponents/LazyImage';


const ProductIcon = ({ productData, isReverseFlexWrap, setModalProductId, setModalIsOpen }: any) => {

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div 
          style={{
            display: 'flex',
            maxWidth: '80%',
            cursor: 'pointer',
            textAlign: 'left',
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
            <LazyImage
              src={productData.img}
              alt={productData.name}
              addedStyle={{ maxWidth: 140 }}
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
          </div>
        </div>
      </div>
      <div style={{ 
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 900,
        paddingTop: 10
      }}>
        ${productData.price}
      </div>
    </div>
  )
}

export default ProductIcon