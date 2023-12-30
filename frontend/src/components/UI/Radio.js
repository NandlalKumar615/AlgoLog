import React from 'react'

import './Radio.scss'

const Radio = (props) => {
    return (
        <div className="radio-inputs">
            <label>
                <input className="radio-input" type="radio" name={props.name} value={props.value}/>
                <span className="radio-tile">
                    {/* <span className="radio-icon">
                        {props.icon}
                    </span> */}
                    <span className="radio-label">{props.option}</span>
                </span>
            </label>
        </div>
    )
}

export default Radio




