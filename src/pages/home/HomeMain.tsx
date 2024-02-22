import * as React from 'react'
const { useContext } = React
import { GlobalAppState } from '../../Layout'
import HeroImageSlideshow from '../../sharedComponents/HeroImageSlideshow'
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

  const { globalSidePadding, fetchedData } = useContext(GlobalAppState)

  return (
    <MainWrapper>
      <section 
        className="hero-img"
      >
        <HeroImageSlideshow imageSrcArray={heroPhotos1}/>
      </section>
      <section className="home-group-1">
        <HomeGroup
          listItemComponents={[
            <BioHomeListItem fetchedData={fetchedData}/>,
            <CalendarHomeListItem fetchedData={fetchedData}/>,
            <MediaHomeListItem fetchedData={fetchedData}/>
          ]}
        />
      </section>
      <section 
        className="hero-img"
        style={{
          paddingTop: '60px',
        }}
      >
        <HeroImageSlideshow imageSrcArray={heroPhotos2}/>
      </section>
      <section className="home-group-2">
        <HomeGroup
          listItemComponents={[
            <BlogHomeListItem fetchedData={fetchedData}/>,
            <ShopHomeListItem/>,
            <SocialsHomeListItem/>,
          ]}
        />
      </section>
    </MainWrapper>
  )
}

export default HomeMain