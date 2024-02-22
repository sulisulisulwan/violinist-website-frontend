import * as React from 'react'
import HoverLink from '../../../sharedComponents/HoverLink'
import { NAVY_BLUE_LIGHT } from '../../../sharedStyles/colors'
import { getDisplayDate } from '../../../utils/date'
import { FEData, ParsedHTMLComponent } from 'suli-violin-website-types/src'

interface blogHomeListItemPropsIF {
  fetchedData: FEData
}

const BlogHomeListItem = ({ fetchedData }: blogHomeListItemPropsIF) => {

  const blogPreview = fetchedData?.blog?.results[0] || null

  if (blogPreview === null) return null

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
          : null
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