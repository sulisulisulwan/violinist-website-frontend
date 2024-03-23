import { useStateWithLocalStorage } from "./useStateWithLocalStorage"

export const useDarkMode = () => {
  const initState = () => localStorage.getItem('darkMode') === 'true' ? true : false
  return useStateWithLocalStorage('darkMode', 'isDarkMode', initState)
}