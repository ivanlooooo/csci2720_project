//Group members
//Hung Man Kei   (1155127099)	   Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)    Tsai Kwun Ki      (1155126289)

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