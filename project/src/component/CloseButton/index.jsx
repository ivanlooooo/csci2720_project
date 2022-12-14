// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

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