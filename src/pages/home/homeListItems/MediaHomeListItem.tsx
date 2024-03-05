import * as React from 'react'

const { useState, useEffect } = React

import { NAVY_BLUE_LIGHT } from '../../../sharedStyles/colors'
import HoverLink from '../../../sharedComponents/HoverLink'
import MediaModalWrapper from '../../../sharedComponents/MediaModalWrapper'
import YouTubeModal from '../../../sharedComponents/YouTubeModal'
import VideoThumbnail from '../../../sharedComponents/VideoThumbnail'
import axios from 'axios'
import config from '../../../../config'


const useFetchVideoData = () => {
  const [ videoData, setVideoData ] = useState(null)
  useEffect(() => {
    const getVideoData = async () => {
      const fetchedVideoData = await axios.get(`${config.BACKEND_API_BASE_URL}/media/videos`)
      setVideoData (fetchedVideoData.data)
    }
    getVideoData()
  }, [])

  return videoData
}

export const MediaHomeListItem = () => {

  const videoData = useFetchVideoData()
  const [ modalIsOpen, setModalIsOpen ] = useState(false)

  const firstVideo = videoData ? (videoData.results.length ? videoData.results[0] : null) : null

  return (
    <>
      <h2>MEDIA</h2>
      {
        firstVideo ? <VideoThumbnail 
          videoId={firstVideo.id} 
          caption={firstVideo.caption} 
          youtubeCode={firstVideo.youtubeCode} 
          setModalIsOpen={setModalIsOpen} 
          setCurrYoutubeCode={() => {}}
        /> : '...Loading'

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
        <MediaModalWrapper isOpen={modalIsOpen} setModalClosed={() => setModalIsOpen(false)}>
          <YouTubeModal youtubeCode={videoData.youtubeCode}/>
        </MediaModalWrapper> : null

      } 
    </>
  )
}


export default MediaHomeListItem