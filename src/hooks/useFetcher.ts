import axios from "axios"
import { useEffect, useState } from "react"
import config from "../../config"


const useFetchLongFormBio = () => {
  const [ longFormBioData, setLongFormBioData ] = useState(null)
  useEffect(() => {
    const getLongFormBio = async () => {
      const longFormData = await axios.get(config.BACKEND_API_BASE_URL + '/bio/longForm')
      setLongFormBioData(longFormData.data)
    }
    getLongFormBio()
  }, [])
  return longFormBioData
}

const useFetchBlog = () => {
  const [ blogData, setBlogData ] = useState(null)
  useEffect(() => {
    const getBlogData = async () => {
      const fetchedBlogData = await axios.get(config.BACKEND_API_BASE_URL + '/blog')
      setBlogData(fetchedBlogData.data)
    }
    getBlogData()
  }, [])
  return blogData
}

const useFetchCalendarData = () => {
  const [ calendarData, setCalendarData ] = useState(null)
  useEffect(() => {
    const getCalendarData = async () => {
      const calendarData = await axios.get(`${config.BACKEND_API_BASE_URL}/calendar`)
      setCalendarData (calendarData.data)
    }
    getCalendarData()
  }, [])
  return calendarData
}

const useFetchPhotos = () => {
  const [ photoData, setPhotoData ] = useState(null)
  useEffect(() => {
    const getPhotoData = async () => {
      const fetchedPhotoData = await axios.get(config.BACKEND_API_BASE_URL + '/photos')
      setPhotoData(fetchedPhotoData.data)
    }
    getPhotoData()
  }, [])
  return photoData
}

const useFetchVideos = () => {
  const [ videoData, setVideoData ] = useState(null)
  useEffect(() => {
    const getVideoData = async () => {
      const fetchedVideoData = await axios.get(config.BACKEND_API_BASE_URL + '/videos')
      setVideoData(fetchedVideoData.data)
    }
    getVideoData()
  }, [])
  return videoData
}


const useFetchShortBioData = () => {
  const [ shortFormBioData, setShortFormBioData ] = useState(null)
  useEffect(() => {
    const getShortFormBioData = async () => {
      const bioDataShortForm = await axios.get(`${config.BACKEND_API_BASE_URL}/bio/shortForm`)
      setShortFormBioData (bioDataShortForm.data)
    }
    getShortFormBioData()
  }, [])
  return shortFormBioData
}

const fetcherMap: any = {
  shortBio: useFetchShortBioData,
  longBio: useFetchLongFormBio,
  blog: useFetchBlog,
  calendar: useFetchCalendarData,
  photos: useFetchPhotos,
  videos: useFetchVideos
}


export const useFetchApiData = (context: string) => {
  const fetcher = fetcherMap[context]
  const data = fetcher()
  return data
}