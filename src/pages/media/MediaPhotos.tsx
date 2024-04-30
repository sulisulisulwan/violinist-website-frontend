import * as React from 'react'
const { useContext, useState } = React
import { GlobalAppState } from '../../Layout'
import ModalWrapper from '../../sharedComponents/modals/ModalWrapper'
import PictureModal from '../../sharedComponents/modals/PictureModal'
import { PhotoDataAPI } from 'suli-violin-website-types/src'
import LazyImage from '../../sharedComponents/LazyImage'
import { useFetchApiData } from '../../hooks/useFetcher'

const MediaPhotos = () => {

  const { windowWidth, darkModeStateManagement, config } = useContext(GlobalAppState)
  const photoData = useFetchApiData('photos', config)

  const { isDarkMode } = darkModeStateManagement
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ picIndex, setPicIndex ] = useState(null)

  const photos = photoData
  
  const isThreeColumns = windowWidth > 769

  return (
    <div className="media-photos-wrapper">
      <h2>PHOTOS</h2>
      <div className="media-photos-ul-wrapper">
        <ul className="media-photos-ul">
          {
            photos ? photos.map((picture: PhotoDataAPI, i: number) => {

              return (
                <li className="media-photos-li" key={`${config.getField('BACKEND_API_BASE_URL')}/photos?id=${picture.id}&isCropped=true`}>
                  <LazyImage 
                    addedStyle={{ 
                      border: isDarkMode ? '.5px darkgray solid' : '', 
                      backgroundColor: isDarkMode ? 'black' : 'white'
                    }}
                    onClickHandler={() => { setPicIndex(i); setModalIsOpen(true) } }
                    src={`${config.getField('BACKEND_API_BASE_URL')}/photos?id=${picture.id}&isCropped=true`}
                    alt={'Media photo gallery image'}
                  />
                </li>
              )
            }) : '...Loading'
          }
        </ul>
        <ModalWrapper 
          modalName={'photos'} 
          isOpen={modalIsOpen} 
          setModalClosed={() => setModalIsOpen(false)}
          childModalContext={{ type: 'photoGallery', props: { 
            currPicIndex: picIndex,
            setPicIndex: setPicIndex,
            picDataArray: photos,
            setModalClosed: () => setModalIsOpen(false)
          }}}
        />
      </div>
    </div>
  )
}

export default MediaPhotos