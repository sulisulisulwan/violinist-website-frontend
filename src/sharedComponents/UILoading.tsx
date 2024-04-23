import * as React from 'react'

const UILoading = ({ isDarkMode, repeat, height, isCurved }: any) => {

  const skeleton = new Array(repeat || 1).fill(null)

  return (
    <>
      {
        skeleton.map((_, index) => {

          return <div className={ isDarkMode ? "skeleton dark-mode" : "skeleton"} style={{
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: isDarkMode ? 'rgba(200, 200, 200, .1)' : '#eee',
              height: height || 100,
              border: '0px solid rgba(236, 236, 236, .5)',
              borderRadius: isCurved ? 20 : 0,
              marginBottom: index === skeleton.length - 1 ? 0 : 30
            }}/>
        })
      }
    </>
  )
}

export default UILoading