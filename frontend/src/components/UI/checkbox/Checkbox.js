import React from 'react'
import Checkbox2 from './Checkbox2'

import './Checkbox.scss'

const Checkbox = (props) => {
  return (
    <div className='checkbox__container'>
        <Checkbox2 color = {props.color} name ={props.name}></Checkbox2>
        <p>{props.value}</p>
    </div>
  )
}

export default Checkbox