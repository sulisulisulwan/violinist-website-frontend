import * as React from 'react'

interface youTubeModalPropsIF {
  youtubeCode: string
}

const YouTubeModal = ({ youtubeCode }: youTubeModalPropsIF) => {

  let displaySetting = ''
  if (youtubeCode === null) displaySetting = 'none'

  const windowWidth = parseInt(document.documentElement.clientWidth.toString())
  const windowHeight = parseInt(document.documentElement.clientHeight.toString())
  let youtubePlayerWidth = windowWidth > 1280 ? 1280 : windowWidth * 0.95
  let youtubePlayerHeight = ( youtubePlayerWidth * 0.5625 );
  
  if ( youtubePlayerHeight > ( windowHeight * 0.95 ) ){
    youtubePlayerHeight = windowHeight * 0.95;
    youtubePlayerWidth = youtubePlayerHeight / 0.5625;
  }

  return (
    <div 
      className="fade-wrapper"
      style={{
        display: '',
      }}
    >
      <iframe 
        width={youtubePlayerWidth}
        height={youtubePlayerHeight }
        // src={`https://www.youtube.com/embed/${youtubeCode}?autoplay=1`}
        src={`https://www.youtube.com/embed/${youtubeCode}?autoplay=0`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        frameBorder="0" 
        allowFullScreen
      />
    </div>
  )
}

export default YouTubeModal