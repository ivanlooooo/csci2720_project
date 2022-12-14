// Au Yeung Hui Kei (1155158820) Chan Gi Wei Violet (1155126648) 
// Kong Ming Kin(1155144268)     Lo Kwun Hei (1155155612) 
// Yeung Ka Him(1155176590)      Yuen Man Yi (1155127553)

import React from 'react';
import clsx from "clsx"
import './style.css';

const Button = (props) => {
  const { multiline = false , reverse = false, center = false ,className} = props
  return (
    <div className={className}>
      <button type="button" className={clsx(
        "button-button",
        multiline ? "button-multiline" : "button-singleline",
        reverse ? "button-reverse" : "button-normal",
          center ? "button-center" : ""
        )}
      onClick={props.onClick}
      >
        <span className="button-english-word">
          {props.englishLabel}
        </span>
        <span className="button-chinese-word">
          {props.chineseLabel}
        </span>
      </button>
    </div>
  )
}

export default Button