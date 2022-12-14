// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

import React from 'react'
import './style.css'
import Modal from '../Modal'
import CloseButton from '../CloseButton'

const ModalWithTitle = (props) => {
  return(
    <Modal>
        <div className="modalwithtitle-top" >
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