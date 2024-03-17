import axios from 'axios'
import config from '../../config'
import { useEffect, useState } from 'react'
const { BACKEND_API_BASE_URL } = config

export const useFetchAudioData = (): [any, React.Dispatch<React.SetStateAction<any>>] => {

  const [ audioPlayerState, setAudioPlayerState ] = useState({
    hasPlayedOnce: false,
    playList: [],
    playerStatus: 'stop',
    currentTrack: 0,
    progress: 0
  })

  useEffect(() => {  
    
    const fetchAudioData = async () => {

      const playlistsData: any = await axios.get(BACKEND_API_BASE_URL + '/audio/playlists')

      let playlist = playlistsData.data
      playlist = playlist[0] ? playlist[0].playlistTracks.map((track: any) => {
        const file = config.BACKEND_API_BASE_URL + '/audio?id=' + track.audioTrackId
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
      
    }

    fetchAudioData()

  }, [])

  return [ audioPlayerState, setAudioPlayerState ]

}