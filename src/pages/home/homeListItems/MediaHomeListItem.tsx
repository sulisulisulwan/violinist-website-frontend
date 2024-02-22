import * as React from 'react'

const { useState } = React

import { NAVY_BLUE_LIGHT } from '../../../sharedStyles/colors'
import HoverLink from '../../../sharedComponents/HoverLink'
import MediaModalWrapper from '../../../sharedComponents/MediaModalWrapper'
import YouTubeModal from '../../../sharedComponents/YouTubeModal'
import VideoThumbnail from '../../../sharedComponents/VideoThumbnail'
import { FEData } from 'suli-violin-website-types/src'

interface mediaHomeListItemPropsIF {
  fetchedData: FEData
}

export const MediaHomeListItem = ({ fetchedData }: mediaHomeListItemPropsIF) => {

  const [ modalIsOpen, setModalIsOpen ] = useState(false)

  const videoData = fetchedData?.media?.videos[0] || null

  if (videoData === null) return null

  return (
    <>
      <h2>MEDIA</h2>
      <VideoThumbnail videoId={videoData.id} caption={videoData.caption} youtubeCode={videoData.youtubeCode} setModalIsOpen={setModalIsOpen} setCurrYoutubeCode={() => {}}/>
      <div 
        className="more-button"
        style={{
          paddingTop: 15
        }}
      >
        <HoverLink 
          href={'media'} 
          cls="more-button"
          openInNewTab={false}
          onClickHandler={() => {}}
          linkText={'MORE'} 
          overColor={NAVY_BLUE_LIGHT} 
          offColor={'silver'}
        />
      </div>    
      <MediaModalWrapper isOpen={modalIsOpen} setModalClosed={() => setModalIsOpen(false)}>
        <YouTubeModal youtubeCode={videoData.youtubeCode}/>
      </MediaModalWrapper>
    </>
  )
}


export default MediaHomeListItem