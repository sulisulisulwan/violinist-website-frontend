import * as React from 'react'
import { GlobalAppState } from '../../Layout'
import { useGetProductDataGroups } from './hooks'
const { useContext } = React

const Checkout = () => {

  const { cartStateManagement } = useContext(GlobalAppState)
  const { cart } = cartStateManagement
  const { fetchedProductData } = useGetProductDataGroups()

  if (!fetchedProductData.length) return null

  const cartDisplayData: any = {
    itemized: [],
    total: 0
  }
  const productIdsInCart = Object.keys(cart)

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


  return (
    <div>
      <h3>CHECKOUT</h3>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',

      }}>
        <div style={{width: '50%'}}>
          {
            cartDisplayData.itemized.map((productItem: any) => {
              return (
                <div style={{ display: 'grid', gridTemplateColumns: '70% 20% 10%'  }}>
                  <div>{productItem.name}</div>
                  <div>{cart[productItem.id]}x (${productItem.price})</div>
                  <div>${productItem.subtotal}</div>
                </div>
              )
            })
          }
          <div style={{ display: 'grid', gridTemplateColumns: '70% 20% 10%', borderTop: '1px dotted black'  }}>
            <div>TOTAL</div>
            <div></div>
            <div>${cartDisplayData.total}</div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout