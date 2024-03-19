import { useState } from "react"

export const useDarkMode = () => {
  const initState = localStorage.getItem('darkMode') === 'true' ? true : false
  const [ isDarkMode, setIsDarkMode ] = useState(initState)

  const darkModeStateSetter = (value: boolean) => {
    localStorage.setItem('darkMode', value.toString())
    setIsDarkMode(value)
  }
  return { isDarkMode, setIsDarkMode: darkModeStateSetter }
}