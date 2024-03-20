import axios from "axios"
import { useEffect, useState } from "react"

const initApiData = (config: any, endpoint: string) => {
  const [ apiData, setApiData ] = useState(null)

  useEffect(() => {
    const getApiData = async () => {
      console.log(config)
      if (!config || !config.isLoaded) return
      const fetchedData = await axios.get(config.getField('BACKEND_API_BASE_URL') + endpoint)
      setApiData(fetchedData.data)
    }
    getApiData()
  }, [config])
  return apiData
}

const endpointMap: any = {
  shortBio: '/bio/shortForm',
  longBio: '/bio/longForm',
  blog: '/blog',
  calendar: '/calendar',
  photos: '/photos?type=media-photo',
  videos: '/videos'
}


export const useFetchApiData = (context: string, config: any) => {
  const endpoint = endpointMap[context]
  const data = initApiData(config, endpoint)
  
  return data
}