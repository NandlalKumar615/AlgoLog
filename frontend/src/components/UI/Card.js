import React from "react";

import './Card.scss';

const Card = (props) =>{
    const classes = 'cards ' + props.className
    // const classes = props.className + ' cards'
    return(
        <div className={classes}>
            {props.children}
        </div>
    )
}

export default Card;