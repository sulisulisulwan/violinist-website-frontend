import * as React from 'react'
import HoverLink from '../../../sharedComponents/HoverLink'
import { NAVY_BLUE_LIGHT } from '../../../sharedStyles/colors'
import { getDisplayDate } from '../../../utils/date'
import { ParsedHTMLComponent } from 'suli-violin-website-types/src'
import axios from 'axios'
import config from '../../../../config'
const { useState, useEffect } = React

const useFetchBlogData = () => {
  const [ blogData, setBlogData ] = useState(null)
  useEffect(() => {
    const getBlogData = async () => {
      const fetchedBlogData = await axios.get(`${config.BACKEND_API_BASE_URL}/blog`)
      setBlogData (fetchedBlogData.data)
    }
    getBlogData()
  }, [])

  return blogData
}
const BlogHomeListItem = () => {

  const blogData = useFetchBlogData()
  const blogPreview = blogData?.results[0] || null

  return (
    <>
      <h2>BLOG</h2>
      <div></div>
      <div>
        { blogPreview ?
          <>
            <div>
              { getDisplayDate(blogPreview.dateCreated) }
            </div>
            <div>
              {blogPreview.components.map((component: ParsedHTMLComponent, i: number) => { return <p key={i}>{component.content}</p>})} 
            </div>
          </>
          : '...Loading'
        }

      </div>
      <div 
        className="more"
        style={{
          paddingTop: 15
        }}
      >
        <HoverLink 
          cls="more-button"
          onClickHandler={() => {}}
          openInNewTab={false}
          href={'blog'} 
          linkText={'MORE'} 
          overColor={NAVY_BLUE_LIGHT} 
          offColor={'silver'}
        />
      </div>
    </>
  )
}

export default BlogHomeListItem