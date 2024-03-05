import * as React from 'react'
import { NAVY_BLUE_LIGHT } from '../../../sharedStyles/colors'
import HoverLink from '../../../sharedComponents/HoverLink'
import { ParsedHTMLComponent } from 'suli-violin-website-types/src'
import axios from 'axios'
import config from '../../../../config'
const { useState, useEffect } = React

const useFetchBioData = () => {
  const [ shortFormBioData, setShortFormBioData ] = useState(null)
  useEffect(() => {
    const getShortFormBioData = async () => {
      const bioDataShortForm = await axios.get(`${config.BACKEND_API_BASE_URL}/bio/shortForm`)
      setShortFormBioData (bioDataShortForm.data)
    }
    getShortFormBioData()
  }, [])
  return shortFormBioData
}

export const BioHomeListItem = () => {

  const shortFormBioData = useFetchBioData()

  return (
    <>
      <h2>BIOGRAPHY</h2>
      <div>
        { shortFormBioData ? 
            shortFormBioData.components.map((component: ParsedHTMLComponent, index: number) => 
              <p key={component.content + index}>{component.content}</p>) : '...Loading'
        }
      </div>
      <div 
        className="more"
        style={{
          paddingTop:  15
        }}
      >
        <HoverLink 
          cls="more-button"
          onClickHandler={() => {}}
          openInNewTab={false}
          href={'biography'} 
          linkText={'MORE'} 
          overColor={NAVY_BLUE_LIGHT} 
          offColor={'silver'}
        />
      </div>
    </>
  )
}

export default BioHomeListItem