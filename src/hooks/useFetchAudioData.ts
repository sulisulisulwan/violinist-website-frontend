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

      const mediaData = await axios.get(BACKEND_API_BASE_URL + '/media')
      let playlist = mediaData.data.playlists[0]
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
      
    }

    fetchAudioData()

  }, [])

  return [ audioPlayerState, setAudioPlayerState ]

}