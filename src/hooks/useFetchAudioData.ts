import axios from 'axios'
import { useEffect, useState } from 'react'
import { Config } from '../config/config'

export const useFetchAudioData = (config: Config): [any, React.Dispatch<React.SetStateAction<any>>] => {

  const [ audioPlayerState, setAudioPlayerState ] = useState({
    hasPlayedOnce: false,
    playList: [],
    playerStatus: 'stop',
    currentTrack: 0,
    progress: 0
  })

  useEffect(() => {  
    const fetchAudioData = async () => {
      if (!config || !config.isLoaded) return
      const backendUrl = config.getField('BACKEND_API_BASE_URL')
      const playlistsData = await axios.get(backendUrl + 'audio/playlists')
      let playlist = playlistsData.data[0]
      playlist = playlist ? playlist.playlistTracks.map((track: any) => {
        const file = backendUrl + 'audio?id=' + track.audioTrackId
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

  }, [config])

  return [ audioPlayerState, setAudioPlayerState ]

}