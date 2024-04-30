import * as React from 'react'
const { useState, useContext } = React
import ModalWrapper from '../../sharedComponents/modals/ModalWrapper'
import VideoThumbnail from '../../sharedComponents/VideoThumbnail'
import { GlobalAppState } from '../../Layout'
import { VideoDataAPI } from 'suli-violin-website-types/src'
import { useFetchApiData } from '../../hooks/useFetcher'


export const MediaVideos = () => {

  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ currYoutubeCode, setCurrYoutubeCode ] = useState(null)
  const { windowWidth, config } = useContext(GlobalAppState)

  const videoData = useFetchApiData('videos', config)
  const videos = videoData?.results
  return (
    <div className="media-videos-wrapper">
      <h2>VIDEOS</h2>
      <ul className="media-videos-ul">
        {
          videos ? videos.map((video: VideoDataAPI, i: number) => {
            return (
              <li  className="media-videos-li" key={video.caption + i}>
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
      <ModalWrapper 
        modalName={'videos'} 
        isOpen={modalIsOpen} 
        setModalClosed={() => setModalIsOpen(false)}
        childModalContext={{ type: 'youtube', props: {
          youtubeCode: currYoutubeCode 
        }}}
      />
    </div>
  )
}


export default MediaVideos