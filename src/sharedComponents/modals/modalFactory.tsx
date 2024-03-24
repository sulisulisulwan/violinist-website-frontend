import * as React from 'react'
import ShopModal from "../../pages/shop/ShopModal"
import PictureModal from "./PictureModal"
import YouTubeModal from "./YouTubeModal"

const modalFactory = (modalType: string, propsToInherit: Record<string, any>) => {
  const modalComponent = modalTypeMap[modalType]
  const modalComponentToRender = modalComponent(propsToInherit)
  return modalComponentToRender
}

const modalTypeMap: Record<string, React.FC> = {
  'photoGallery': PictureModal,
  'youtube': YouTubeModal,
  'shop': ShopModal
}

export default modalFactory