import { useStateWithLocalStorage } from "./useStateWithLocalStorage";

export const useCart = () => {
  const initState = () => localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
  return useStateWithLocalStorage('cart', 'cart', initState)
}