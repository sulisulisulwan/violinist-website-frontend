import axios from 'axios'
import config from '../../config'
import { useEffect, useState } from 'react'
const { BACKEND_API_BASE_URL } = config

export const useFetchAllData = () => {

  const [ fetchedData, setFetchedData ] = useState(null)
  const [ audioPlayerState, setAudioPlayerState ] = useState({
    hasPlayedOnce: false,
    playList: [],
    playerStatus: 'stop',
    currentTrack: 0,
    progress: 0
  })



  useEffect(() => {  
    
    const fetchData = async () => {
      const bioDataLongForm = await axios.get(`${BACKEND_API_BASE_URL}/bio/longForm`)
      const bioDataShortForm = await axios.get(`${BACKEND_API_BASE_URL}/bio/shortForm`)
      const calendarData = await axios.get(`${BACKEND_API_BASE_URL}/calendar`)
      const mediaData = await axios.get(`${BACKEND_API_BASE_URL}/media`)
      const blogData = await axios.get(`${BACKEND_API_BASE_URL}/blog`)
    
      const data = {
        bio: {
          longForm: bioDataLongForm.data,
          shortForm: bioDataShortForm.data
        },
        calendar: calendarData.data,
        media: mediaData.data,
        blog: blogData.data,
      }

      let playlist = data.media.playlists[0]
      playlist = playlist ? playlist.playlistTracks.map((track: any) => {
        const file = config.BACKEND_API_BASE_URL + '/media/audio?id=' + track.audioTrackId
        return {
          file: file, 
          author: track.author, 
          title: track.title 
        } 
      }) : []

      setAudioPlayerState((pS) => ({
        ...pS,
        playList: playlist
      }))
      
      setFetchedData(data)
    }

    fetchData()

  }, [])

  return {
    fetchedData,
    audioPlayerStateManagement: [ audioPlayerState, setAudioPlayerState ]
  }

}