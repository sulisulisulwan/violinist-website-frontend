import * as React from 'react'
import MainWrapper from '../../sharedComponents/MainWrapper'
import { heroPhotos1 } from '../../hero-photos'
import { getDisplayDate } from '../../utils/date'
import { useFetchApiData } from '../../hooks/useFetcher'
import { GlobalAppState } from '../../Layout'
import UILoading from '../../sharedComponents/UILoading'
import FadeInParagraph from '../../sharedComponents/FadeInParagraph'
import parser from '../../utils/parser'

const BlogMain = () => {
  parser

  const { config, darkModeStateManagement } = React.useContext(GlobalAppState)
  const blogData = useFetchApiData('blog', config)

  return (
    <MainWrapper heroPhotos={heroPhotos1}>
      <section id="blog" className="blog">
        <h1>BLOG</h1>
        {
          !blogData ? <UILoading isDarkMode={darkModeStateManagement.isDarkMode} isCurved repeat={3} height={200}/> :
          blogData.results.map((post, i) => {
            const components = parser.parseToReactElements(React, post.components)
            return (
              <React.Fragment key={i}>
                <span style={{
                  color: 'gray',
                  fontSize: 15
                }}>{getDisplayDate(post.dateCreated)}</span>
                {
                  components.map((component, j) => component)

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