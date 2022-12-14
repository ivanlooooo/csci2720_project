//Group members
//Hung Man Kei   (1155127099)    Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)    Tsai Kwun Ki      (1155126289)

import React from 'react'
import './style.css'
import Modal from '../Modal'
import CloseButton from '../CloseButton'

const ModalWithTitle = (props) => {
  return(
    <Modal>
        <div className="modalwithtitle-top" style={{backgroundColor:props.backgroundColor||"#1f6332",color:props.color||"#ffffff"}}>
					<div className="modalwithtitle-chinese-title">
						{props.chineseTitle}
					</div>
					<div className="modalwithtitle-english-title">
						{props.englishTitle}	
					</div>
					<div className="modalwithtitle-space">
					</div>
					<div className="modalwithtitle-close">
						<CloseButton backgroundColor={props.backgroundColor} onClick={props.onClick}/>
					</div>
        </div>
				<div className="modalwithtitle-main">
					{props.children}
				</div>
    </Modal>
  )
}

export default ModalWithTitle