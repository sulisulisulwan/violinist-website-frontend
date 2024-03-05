import * as React from 'react'
import HeroImageSlideshow from '../../sharedComponents/heroImageSlideshow/HeroImageSlideshow'
import HomeGroup from './HomeGroup'
import BioHomeListItem from './homeListItems/BioHomeListItem'
import CalendarHomeListItem from './homeListItems/CalendarHomeListItem'
import MediaHomeListItem from './homeListItems/MediaHomeListItem'
import BlogHomeListItem from './homeListItems/BlogHomeListItem'
import ShopHomeListItem from './homeListItems/ShopHomeListItem'
import SocialsHomeListItem from './homeListItems/SocialHomeListItem'
import { heroPhotos1, heroPhotos2 } from '../../hero-photos'
import MainWrapper from '../../sharedComponents/MainWrapper'

const HomeMain = () => {

  return (
    <MainWrapper>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos1}/>
      </section>
      <section className="home-group-1">
        <HomeGroup
          listItemComponents={[
            <BioHomeListItem/>,
            <CalendarHomeListItem/>,
            <MediaHomeListItem/>
          ]}
        />
      </section>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos2}/>
      </section>
      <section className="home-group-2">
        <HomeGroup
          listItemComponents={[
            <BlogHomeListItem/>,
            <ShopHomeListItem/>,
            <SocialsHomeListItem/>,
          ]}
        />
      </section>
    </MainWrapper>
  )
}

export default HomeMain