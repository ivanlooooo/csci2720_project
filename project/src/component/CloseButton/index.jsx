//Group members
//Hung Man Kei   (1155127099)	   Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)    Tsai Kwun Ki      (1155126289)

import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-regular-svg-icons'
import { faWindowClose as faWindowCloseSolid } from '@fortawesome/free-solid-svg-icons'

const CloseButton = (props ) => {
  const { solid = false } = props
  
  return(
    <div className="closebutton-container"  style={{color:props.backgroundColor||"#1f6332"}} onClick={props.onClick}>
      {(solid&&<FontAwesomeIcon className="closebutton-close" icon={faWindowCloseSolid}/>)||<FontAwesomeIcon className="n81-closebutton-close" icon={faWindowClose}/>}
    </div>
  )
}

export default CloseButton