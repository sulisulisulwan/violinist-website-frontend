import * as React from 'react'
const { useContext, useEffect, useState } = React
import { GlobalAppState } from '../../Layout'
import MediaModalWrapper from '../../sharedComponents/MediaModalWrapper'
import PictureModal from '../../sharedComponents/PictureModal'
import { PhotoDataAPI } from 'suli-violin-website-types/src'



const MediaPhotos = () => {

  const { windowWidth, fetchedData } = useContext(GlobalAppState)
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ clickedPicIndex, setClickedPicIndex ] = useState(null)


  const photos = fetchedData.media.photos

  /**
  
  id: 11,
  originalFileName: 'asdfasdf',
  photoCred: 'cresdfaf'
  
   */
  

  // const data = [
  //   {
  //     id: 1,
  //     src: '/images/violin-photos/st_violin_1.jpg',
  //     croppedSrc: '/images/violin-photos/st_violin_1_thumbnail.jpg',
  //     photoCred: 'David Fung'
  //   },
  //   {
  //     id: 2,
  //     src: '/images/violin-photos/st_violin_2.jpg',
  //     croppedSrc: '/images/violin-photos/st_violin_2_thumbnail.jpg',
  //     photoCred: 'David Fung'
  //   },
  //   {
  //     id: 3,
  //     src: '/images/violin-photos/st_violin_3.jpg',
  //     croppedSrc: '/images/violin-photos/st_violin_3_thumbnail.jpg',
  //     photoCred: 'David Fung'
  //   },
  //   {
  //     id: 4,
  //     src: '/images/violin-photos/st_violin_4.jpg',
  //     croppedSrc: '/images/violin-photos/st_violin_4_thumbnail.jpg',
  //     photoCred: 'David Fung'
  //   },
  //   {
  //     id: 5,
  //     src: '/images/violin-photos/st_violin_5.jpg',
  //     croppedSrc: '/images/violin-photos/st_violin_5_thumbnail.jpg',
  //     photoCred: 'David Fung'
  //   },
  //   {
  //     id: 6,
  //     src: '/images/violin-photos/st_violin_6.jpg',
  //     croppedSrc: '/images/violin-photos/st_violin_6_thumbnail.jpg',
  //     photoCred: 'David Fung'
  //   },
  // ] 
  
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
            photos.map((picture: PhotoDataAPI, i: number) => {
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
                  key={`http://localhost:1337/v1/media/photos?id=${picture.id}&isCropped=true`}
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
                        <img 
                          onClick={() => { setClickedPicIndex(i); setModalIsOpen(true) } }
                          src={`http://localhost:1337/v1/media/photos?id=${picture.id}&isCropped=true`}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            overflow: 'clip',
                            overflowClipMargin: 'content-box'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              )
            })
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