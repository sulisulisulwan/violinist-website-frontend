import * as React from 'react'
import HeroImageSlideshow from '../../sharedComponents/heroImageSlideshow/HeroImageSlideshow'
import BioHomeListItem from './homeListItems/BioHomeListItem'
import CalendarHomeListItem from './homeListItems/CalendarHomeListItem'
import MediaHomeListItem from './homeListItems/MediaHomeListItem'
import BlogHomeListItem from './homeListItems/BlogHomeListItem'
import ShopHomeListItem from './homeListItems/ShopHomeListItem'
import SocialsHomeListItem from './homeListItems/SocialHomeListItem'
import { heroPhotos1, heroPhotos2 } from '../../hero-photos'
import MainWrapper from '../../sharedComponents/MainWrapper'
import ThreeSquareGridGroup from '../../sharedComponents/threeSquareGrid/ThreeSquareGridGroup'
import FadeInSection from '../../sharedComponents/FadeInSection'

const HomeMain = () => {

  return (
    <MainWrapper heroPhotos={heroPhotos1}>
      <section className="home-group-1">
        <ThreeSquareGridGroup
          listItemComponents={[
            <FadeInSection nodes={<BioHomeListItem/>}/>,
            <FadeInSection nodes={<CalendarHomeListItem/>}/>,
            <FadeInSection nodes={<MediaHomeListItem/>}/>,
          ]}
        />
      </section>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos2}/>
      </section>
      <section className="home-group-2">
        <ThreeSquareGridGroup
          listItemComponents={[
            <FadeInSection nodes={<BlogHomeListItem/>}/>,
            <FadeInSection nodes={<ShopHomeListItem/>}/>,
            <FadeInSection nodes={<SocialsHomeListItem/>}/>,
          ]}
        />
      </section>
    </MainWrapper>
  )
}

export default HomeMain