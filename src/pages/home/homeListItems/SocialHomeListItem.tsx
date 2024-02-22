import * as React from 'react'
import getSocialIcons from '../../../socialIcons'

export const SocialsHomeListItem = () => {
  const socialIcons = getSocialIcons('light')
  return (
    <>
      <h2>SOCIALS</h2>
      <div>
        <ul style={{
          listStyleType: 'none',
          display: 'flex',
          padding: 0,
          margin: 0,
          flexWrap: 'wrap'
        }}>
          { socialIcons.map((iconItem, i) => {
            return (
              <li 
                key={iconItem.label + i} 
                style={{
                  paddingTop: 30
                }}
              >
                <a 
                  target="_blank"
                  key={iconItem.label + i}
                  style={{
                    paddingRight: 20
                  }}
                  href={iconItem.href}
                >
                  <img
                    width={50}
                    style={{
                      paddingRight: 30
                    }}
                    src={iconItem.src}
                  />
                </a>
              </li>
            )
          }) }
        </ul>
      </div>
    </>
  )
}

export default SocialsHomeListItem

