//Group members
//Hung Man Kei   (1155127099)	   Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)    Tsai Kwun Ki      (1155126289)

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

