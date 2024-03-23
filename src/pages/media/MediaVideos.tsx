import * as React from 'react'
const { useState, useContext, useEffect } = React
import ModalWrapper from '../../sharedComponents/modals/ModalWrapper'
import YouTubeModal from '../../sharedComponents/modals/YouTubeModal'
import VideoThumbnail from '../../sharedComponents/VideoThumbnail'
import { GlobalAppState } from '../../Layout'
import { VideoDataAPI } from 'suli-violin-website-types/src'
import { useFetchApiData } from '../../hooks/useFetcher'
// import config from '../../config/config'


export const MediaVideos = () => {

  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ currYoutubeCode, setCurrYoutubeCode ] = useState(null)
  const { windowWidth, config } = useContext(GlobalAppState)

  const videoData = useFetchApiData('videos', config)
  const videos = videoData?.results

  return (
    <div
      style={{
        width: '100%',
        animation: 'fadeIn .5s linear'
      }}
    >
      <h2>VIDEOS</h2>
      <ul style={{
        listStyleType: 'none',
        padding: 0,
        display: 'grid',
        gridTemplateColumns: windowWidth > 769 ? '1fr 1fr 1fr' : '1fr 1fr'
      }}>
        {
          videos ? videos.map((video: VideoDataAPI, i: number) => {
            return (
              <li 
                key={video.caption + i}
                style={{
                  padding: 10
                }}
              >
                <VideoThumbnail 
                  setCurrYoutubeCode={setCurrYoutubeCode}
                  youtubeCode={video.youtubeCode}
                  setModalIsOpen={setModalIsOpen}
                  videoId={video.id} 
                  caption={video.caption}
                />
              </li>
            )
          }) : '...Loading'
        }
      </ul>
      <ModalWrapper modalName={'videos'} isOpen={modalIsOpen} setModalClosed={() => setModalIsOpen(false)}>
        <YouTubeModal youtubeCode={currYoutubeCode}/>
      </ModalWrapper>
    </div>
  )
}


export default MediaVideos