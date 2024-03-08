import * as React from 'react'
import MainWrapper from '../../sharedComponents/MainWrapper'
import HeroImageSlideshow from '../../sharedComponents/heroImageSlideshow/HeroImageSlideshow'
import { heroPhotos1 } from '../../hero-photos'
import { getDisplayDate } from '../../utils/date'
import { useFetchApiData } from '../../hooks/useFetcher'

const BlogMain = () => {

  const blogData = useFetchApiData('blog')

  return (
    <MainWrapper heroPhotos={heroPhotos1}>
      <section id="blog" className="blog">
        <h1>BLOG</h1>
        {
          !blogData ? '...Loading' :
          blogData.results.map((post, i) => {
            
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