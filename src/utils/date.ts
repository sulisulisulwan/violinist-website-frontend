export const parseDateToString = (dateData: string) => {
    if (dateData) {
        const dateObject = new Date(dateData.substring(0, dateData.length -5))
        return dateObject.toString()
    }

    return ''
}


export const getDisplayDate = (dateTime: string) => {
  const date = new Date(dateTime)
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate() + 1
  const year = date.getUTCFullYear()
  
  return month + '.' + day + '.' + year
}