import * as React from 'react'
const { useContext, useEffect, useState } = React
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
    <div
      style={{
        width: '100%',
        animation: 'fadeIn .5s linear'
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
                  key={`${config.getField('BACKEND_API_BASE_URL')}/photos?id=${picture.id}&isCropped=true`}
                  style={{
                    display: 'grid',
                    width: '100%',
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
                          maxHeight: '100%',
                        }}
                      >
                        <LazyImage 
                          addedStyle={{ 
                            border: isDarkMode ? '.5px darkgray solid' : '', 
                            backgroundColor: isDarkMode ? 'black' : 'white'
                          }}
                          onClickHandler={() => { setPicIndex(i); setModalIsOpen(true) } }
                          src={`${config.getField('BACKEND_API_BASE_URL')}/photos?id=${picture.id}&isCropped=true`}
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