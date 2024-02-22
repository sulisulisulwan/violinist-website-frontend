import * as React from 'react'
const { useState, useContext } = React
import MediaModalWrapper from '../../sharedComponents/MediaModalWrapper'
import YouTubeModal from '../../sharedComponents/YouTubeModal'
import VideoThumbnail from '../../sharedComponents/VideoThumbnail'
import { GlobalAppState } from '../../Layout'
import { VideoDataAPI } from 'suli-violin-website-types/src'


export const MediaVideos = () => {

  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ currYoutubeCode, setCurrYoutubeCode ] = useState(null)
  const { windowWidth, fetchedData } = useContext(GlobalAppState)

  // const data = [
  //   {
  //     youtubeCode: '76R5L8hdv0M',
  //     thumbnail: '/images/thumbnails/ravel-tombeau-prelude.png',
  //     caption: 'Suliman Tekalli plays Le tombeau de Couperin with Tekalli Duo'
  //   }, 
  //   {
  //     youtubeCode: '6ascGMsV1lM',
  //     thumbnail: '/images/thumbnails/vivaldi-concerto-310.png',
  //     caption: 'Suliman Tekalli plays Vivaldi Violin Concerto in G major RV 310'
  //   }, 
  //   {
  //     youtubeCode: 'OgM1TrZ1Tl0',
  //     thumbnail: '/images/thumbnails/ravel-tombeau-prelude.png',
  //     caption: 'Suliman Tekalli plays Brahms Violin Concerto (Mvt. 3)'
  //   }, 
  //   {
  //     youtubeCode: 'GtcgqiBGE7g',
  //     thumbnail: '/images/thumbnails/messiaen-theme-et-variations.png',
  //     caption: 'Suliman Tekalli plays Messiaen\'s Thème et variations'
  //   }, 
  //   {
  //     youtubeCode: 'mUbH8tOVh28',
  //     thumbnail: '/images/thumbnails/franck-sonata-mvt-4.png',
  //     caption: 'Suliman Tekalli plays Franck\'s Violin Sonata 4th movement'
  //   }, 
  //   {
  //     youtubeCode: 'J7iMLe9tybE',
  //     thumbnail: '/images/thumbnails/mozart-concerto-1-1.png',
  //     caption: 'Suliman Tekalli plays Mozart\'s Violin Concerto No. 1 [FULL]'
  //   }, 
  // ]

  const videos = fetchedData.media.videos

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
          videos.map((video: VideoDataAPI, i: number) => {
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
          })
        }
      </ul>
      <MediaModalWrapper isOpen={modalIsOpen} setModalClosed={() => setModalIsOpen(false)}>
        <YouTubeModal youtubeCode={currYoutubeCode}/>
      </MediaModalWrapper>
    </div>
  )
}


export default MediaVideos