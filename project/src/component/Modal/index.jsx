// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

import React from 'react'
import clsx from 'clsx'
import './style.css'

const Modal = (props) => {
  return(
    <div className="modal-container">
        <div className={clsx("modal-inner", props.className)}>
            {props.children}
        </div>
    </div>
  )
}

export default Modal

