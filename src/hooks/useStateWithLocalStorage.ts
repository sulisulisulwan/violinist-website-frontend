import { useState } from "react"

export const useStateWithLocalStorage = (storageItemName: string, reactStateName: string, initState: Function) => {
  const [ state, stateSetter ] = useState(initState())

  
  const reactStateAndLocalStorageSetter = (value: any) => {
    localStorage.setItem(storageItemName, JSON.stringify(typeof value === 'function' ? value(state) : value))
    stateSetter(value)
  }
  let capitalFirstLetter = reactStateName[0].toUpperCase()
  const stateSetterName = 'set' + capitalFirstLetter + reactStateName.substring(1)

  return { [reactStateName]: state, [stateSetterName]: reactStateAndLocalStorageSetter }
}
