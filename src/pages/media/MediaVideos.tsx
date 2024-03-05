import * as React from 'react'
const { useState, useContext, useEffect } = React
import MediaModalWrapper from '../../sharedComponents/MediaModalWrapper'
import YouTubeModal from '../../sharedComponents/YouTubeModal'
import VideoThumbnail from '../../sharedComponents/VideoThumbnail'
import { GlobalAppState } from '../../Layout'
import { VideoDataAPI } from 'suli-violin-website-types/src'
import axios from 'axios'
import config from '../../../config'


const useFetchVideos = () => {
  const [ videoData, setVideoData ] = useState(null)
  useEffect(() => {
    const getVideoData = async () => {
      const fetchedVideoData = await axios.get(config.BACKEND_API_BASE_URL + '/media/videos')
      setVideoData(fetchedVideoData.data)
    }
    getVideoData()
  }, [])
  return videoData
}

export const MediaVideos = () => {

  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ currYoutubeCode, setCurrYoutubeCode ] = useState(null)
  const { windowWidth } = useContext(GlobalAppState)

  const videoData = useFetchVideos()

  const videos = videoData?.results

  return (
    <div>
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
              >'
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
      <MediaModalWrapper isOpen={modalIsOpen} setModalClosed={() => setModalIsOpen(false)}>
        <YouTubeModal youtubeCode={currYoutubeCode}/>
      </MediaModalWrapper>
    </div>
  )
}


export default MediaVideos