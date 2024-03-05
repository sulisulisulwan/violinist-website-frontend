import * as React from 'react'
const { useContext, useEffect, useState } = React
import { GlobalAppState } from '../../Layout'
import MediaModalWrapper from '../../sharedComponents/MediaModalWrapper'
import PictureModal from '../../sharedComponents/PictureModal'
import { PhotoDataAPI } from 'suli-violin-website-types/src'
import config from '../../../config'
import LazyImage from '../../sharedComponents/LazyImage'
import axios from 'axios'


const useFetchPhotos = () => {

  const [ photoData, setPhotoData ] = useState(null)

  useEffect(() => {
    const getPhotoData = async () => {
      const fetchedPhotoData = await axios.get(config.BACKEND_API_BASE_URL + '/media/photos')
      setPhotoData(fetchedPhotoData.data)
    }
    getPhotoData()
  }, [])

  return photoData
}

const MediaPhotos = () => {

  const photoData = useFetchPhotos()

  const { windowWidth } = useContext(GlobalAppState)
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ clickedPicIndex, setClickedPicIndex ] = useState(null)

  const photos = photoData
  
  const isThreeColumns = windowWidth > 769

  return (
    <div
      style={{
        width: '100%',
      }}
      >
      <h2>PHOTOS</h2>
      <div style={{
        maxWidth: 1156,
        marginRight: 'auto',
        marginLeft: 'auto',
      }}>
        <ul style={{
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: isThreeColumns ? '1fr 1fr 1fr' : '1fr 1fr',
          listStyleType: 'none',
          padding: 0,
          width: '100%',
        }}>
          {
            photos ? photos.map((picture: PhotoDataAPI, i: number) => {
              let column = isThreeColumns ? i % 3 : i % 2
        
              let textAlignStyle: 'left' | 'center' | 'right'

              switch(column) {
                case 0: 
                  textAlignStyle = 'left' 
                  break;
                case 1:
                  textAlignStyle = isThreeColumns ? 'center' : 'right' 
                  break;
                case 2:
                  textAlignStyle = 'right' 
              }
      
              return (
                <li
                  key={`${config.BACKEND_API_BASE_URL}/media/photos?id=${picture.id}&isCropped=true`}
                  style={{
                    display: 'grid',
                    width: '100%',
                    overflow: 'clip',
                  }}
                  >
                  <div 
                    className="outer-wrapper"
                    style={{
                      listStyleType: 'none',
                      textAlign: textAlignStyle,
                    }}
                    >
                    <div 
                      className="inner-wrapper"
                      style={{
                        display: 'inline-block',
                        maxWidth: '90%',
                        width: '100%',
                        paddingBottom: 30,
                      }}
                      >
                      <div 
                        className="inner-most-wrapper"
                        style={{
                          paddingBottom: 15,
                          maxHeight: '100%'
                        }}
                      >
                        <LazyImage 
                          onClickHandler={() => { setClickedPicIndex(i); setModalIsOpen(true) } }
                          src={`${config.BACKEND_API_BASE_URL}/media/photos?id=${picture.id}&isCropped=true`}
                          alt={'Media photo gallery image'}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              )
            }) : '...Loading'
          }
        </ul>
        <MediaModalWrapper isOpen={modalIsOpen} setModalClosed={() => setModalIsOpen(false)}>
          <PictureModal initIndex={clickedPicIndex} picDataArray={photos} setModalClosed={() => setModalIsOpen(false)}/>
        </MediaModalWrapper>
      </div>
    </div>
  )
}

export default MediaPhotos