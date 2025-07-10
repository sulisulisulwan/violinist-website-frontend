import * as React from 'react'

const { useState } = React

// import config from '../../../config/config'
import { NAVY_BLUE_LIGHT } from '../../../sharedStyles/colors'
import HoverLink from '../../../sharedComponents/HoverLink'
import ModalWrapper from '../../../sharedComponents/modals/ModalWrapper'
import YouTubeModal from '../../../sharedComponents/modals/YouTubeModal'
import VideoThumbnail from '../../../sharedComponents/VideoThumbnail'
import { useFetchApiData } from '../../../hooks/useFetcher'
import { GlobalAppState } from '../../../Layout'
import UILoading from '../../../sharedComponents/UILoading'


export const MediaHomeListItem = () => {

  const { config, darkModeStateManagement } = React.useContext(GlobalAppState)
  const videoData = useFetchApiData('videos', config)
  const [ modalIsOpen, setModalIsOpen ] = useState(false)

  const firstVideo = videoData ? (videoData.results.length ? videoData.results[0] : null) : null

  return (
    <>
      <h2 className='section-header'>MEDIA</h2>
      {
        firstVideo ? <VideoThumbnail 
          thumbnail_id={firstVideo.thumbnail_id} 
          caption={firstVideo.caption} 
          youtubeCode={firstVideo.youtubeCode} 
          setModalIsOpen={setModalIsOpen} 
          setCurrYoutubeCode={() => {}}
        /> : 
        <UILoading isCurved isDarkMode={darkModeStateManagement.isDarkMode} height={300}/>
      }
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
      {
        firstVideo ?
        <ModalWrapper 
          modalName={'media'} 
          isOpen={modalIsOpen} 
          setModalClosed={() => setModalIsOpen(false)} 
          childModalContext={{ type: 'youtube', props: { youtubeCode: firstVideo?.youtubeCode }}}
        />  
        : null
      } 
    </>
  )
}


export default MediaHomeListItem