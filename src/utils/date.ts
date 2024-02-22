export const parseDateToString = (dateData: string) => {
    if (dateData) {
        const dateObject = new Date(dateData.substring(0, dateData.length -5))
        return dateObject.toString()
    }

    return ''
}


export const getDisplayDate = (dateTime: string) => {
  const date = new Date(dateTime)
  const month = date.getMonth() + 1
  const day = date.getDate() + 1
  const year = date.getFullYear()
  
  return month + '.' + day + '.' + year
}