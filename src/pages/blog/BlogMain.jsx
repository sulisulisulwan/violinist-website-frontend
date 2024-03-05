import * as React from 'react'
import MainWrapper from '../../sharedComponents/MainWrapper'
import HeroImageSlideshow from '../../sharedComponents/heroImageSlideshow/HeroImageSlideshow'
import { heroPhotos1 } from '../../hero-photos'
import { getDisplayDate } from '../../utils/date'
import axios from 'axios'
import config from '../../../config'
const { useState, useEffect } = React

const useFetchBlog = () => {

  const [ blogData, setBlogData ] = useState(null)

  useEffect(() => {
    const getBlogData = async () => {
      const fetchedBlogData = await axios.get(config.BACKEND_API_BASE_URL + '/blog')
      setBlogData(fetchedBlogData.data)
    }
    getBlogData()
  }, [])

  return blogData
}

const BlogMain = () => {

  const blogData = useFetchBlog()

  return (
    <MainWrapper>
      <section className="hero-img">
        <HeroImageSlideshow imageSrcArray={heroPhotos1}/>
      </section>
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