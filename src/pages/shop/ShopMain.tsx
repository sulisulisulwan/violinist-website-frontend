import * as React from 'react'
import MainWrapper from '../../sharedComponents/MainWrapper'
import { heroPhotos1 } from '../../hero-photos'
import { Outlet } from 'react-router-dom'

const ShopMain = () => {

  return (
    <>
      <MainWrapper heroPhotos={heroPhotos1}>
        <section  id="shop" className="shop">
          <h1>SHOP</h1>
          <Outlet/>
        </section>
      </MainWrapper>
    </>
  )
}



export default ShopMain