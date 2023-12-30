

import React from 'react'
import './Rating.scss'
import { BiStar, BiSolidStar } from "react-icons/bi";


const Rating = (props) => {

    const points =  props.data.totalUpvote + (props.data.totalFavourite*3)
    let rating = 0;
    if (points > 0) rating = 1
    if (points > 4) rating = 2
    if (points > 8) rating = 3
    if (points > 16) rating = 4
    if (points > 32) rating = 5
    let unrated = 5 - rating;
    const ratingStars = []
    for (; rating > 0; rating--) {
        ratingStars.push(<BiSolidStar key={rating}/>)
    }
    for (; unrated > 0; unrated--) {
        ratingStars.push(<BiStar key={unrated}/>)
    }

    return (
        <span className='rating'>({ratingStars})</span>
    )
}

export default Rating