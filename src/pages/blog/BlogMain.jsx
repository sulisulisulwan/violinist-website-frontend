import * as React from 'react'
import MainWrapper from '../../sharedComponents/MainWrapper'
import HeroImageSlideshow from '../../sharedComponents/HeroImageSlideshow'
import { heroPhotos1 } from '../../hero-photos'
import { GlobalAppState } from '../../Layout'
import { getDisplayDate } from '../../utils/date'
const { useContext } = React

const BlogMain = () => {

  const { fetchedData } = useContext(GlobalAppState)

  return (
    <MainWrapper>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos1}/>
      </section>
      <section id="blog" className="blog">
        <h1>BLOG</h1>
        {
          !fetchedData.blog ? null :
          fetchedData.blog.results.map((post, i) => {
            
            return (
              <React.Fragment key={i}>
                <span style={{
                  color: 'gray',
                  fontSize: 15
                }}>{getDisplayDate(post.dateCreated)}</span>
                {
                  post.components.map((component, j) => {
                    if (component.type === 'p') {
                      return <p style={{ }} key={component.type + j}>{component.content}</p>
                    }
                  })

                }
              </React.Fragment>
            )
          })
        }
      </section>
    </MainWrapper>
  )
}

export default BlogMain