import axios from "axios"
import { useEffect, useState } from "react"
import { Config } from "../config/config"


const useFetchLongFormBio = (config: Config) => {
  const [ longFormBioData, setLongFormBioData ] = useState(null)
  useEffect(() => {
    const getLongFormBio = async () => {
      const longFormData = await axios.get(config.getField('BACKEND_API_BASE_URL') + '/bio/longForm')
      setLongFormBioData(longFormData.data)
    }
    getLongFormBio()
  }, [])
  return longFormBioData
}

const useFetchBlog = (config: Config) => {
  const [ blogData, setBlogData ] = useState(null)
  useEffect(() => {
    const getBlogData = async () => {
      const fetchedBlogData = await axios.get(config.getField('BACKEND_API_BASE_URL') + '/blog')
      setBlogData(fetchedBlogData.data)
    }
    getBlogData()
  }, [])
  return blogData
}

const useFetchCalendarData = (config: Config) => {
  const [ calendarData, setCalendarData ] = useState(null)
  useEffect(() => {
    const getCalendarData = async () => {
      const calendarData = await axios.get(`${config.getField('BACKEND_API_BASE_URL') }/calendar`)
      setCalendarData (calendarData.data)
    }
    getCalendarData()
  }, [])
  return calendarData
}

const useFetchPhotos = (config: Config) => {
  const [ photoData, setPhotoData ] = useState(null)
  useEffect(() => {
    const getPhotoData = async () => {
      const fetchedPhotoData = await axios.get(config.getField('BACKEND_API_BASE_URL')  + '/photos?type=media-photo')
      setPhotoData(fetchedPhotoData.data)
    }
    getPhotoData()
  }, [])
  return photoData
}

const useFetchVideos = (config: Config) => {
  const [ videoData, setVideoData ] = useState(null)
  useEffect(() => {
    const getVideoData = async () => {
      const fetchedVideoData = await axios.get(config.getField('BACKEND_API_BASE_URL')  + '/videos')
      setVideoData(fetchedVideoData.data)
    }
    getVideoData()
  }, [])
  return videoData
}


const useFetchShortBioData = (config: Config) => {
  const [ shortFormBioData, setShortFormBioData ] = useState(null)
  useEffect(() => {
    const getShortFormBioData = async () => {
      const bioDataShortForm = await axios.get(`${config.getField('BACKEND_API_BASE_URL') }/bio/shortForm`)
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


export const useFetchApiData = (context: string, config: Config) => {
  const fetcher = fetcherMap[context]
  const data = fetcher(config)
  return data
}