import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from '../../actions/dataAction'
import ImageGallery from "react-image-gallery";
// import Carousel from '../carousel/Carousel'
// import Pag

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import './ANote.scss'


const ANote = () => {

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];


  return (
    <div className="aNote">
      <div className='aNote__section1'>
        <h2> {} </h2>

      </div>
      <div className='aNote__section2'>
        <div className='aNote__section2--1'>

          <ImageGallery items={images} />
        </div>
        <div className='aNote__section2--2'>


        </div>
      </div>
    </div>
  )
}

export default ANote