import { useEffect, useState } from 'react'
import configInstance, { Config } from '../config/config'

export const useConfig = () => {
  const [ configuration, setConfiguration ] = useState<Config | null>(null)
  useEffect(() => {
    const initiateConfiguration = async () => {
      const initializedConfig = await configInstance.initConfig()
      setConfiguration(initializedConfig)
    }
    initiateConfiguration()
  }, [])

  return configuration
}