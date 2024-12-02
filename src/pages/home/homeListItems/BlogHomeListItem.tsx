import * as React from 'react'
import HoverLink from '../../../sharedComponents/HoverLink'
import { NAVY_BLUE_LIGHT } from '../../../sharedStyles/colors'
import { getDisplayDate } from '../../../utils/date'
import { ParsedHTMLComponent } from 'suli-violin-website-types/src'
import { useFetchApiData } from '../../../hooks/useFetcher'
import { GlobalAppState } from '../../../Layout'
import UILoading from '../../../sharedComponents/UILoading'
// import config from '../../../config/config'
import parser from '../../../utils/parser'


const BlogHomeListItem = (): any => {
  

  const { config, darkModeStateManagement } = React.useContext(GlobalAppState)
  const blogData = useFetchApiData('blog', config)
  let blogPreview = blogData?.results[0] || null

  let components = null
  if (blogPreview?.components) {
    components = parser.parseToReactElements(React, blogPreview.components)
  }


  console.log(components)

  return null

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
              { components ? components.map((component: ParsedHTMLComponent, i: number) => component ) : null } 
            </div>
          </>
          : <UILoading isCurved isDarkMode={darkModeStateManagement.isDarkMode} height={300}/>
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