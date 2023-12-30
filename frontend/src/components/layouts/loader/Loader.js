import React from 'react'

import './Loader.scss'
import Modal from '../../UI/Modal'
// import './Loder.css'


const Loader = () => {
  return (
    <Modal>
      <div className='loader'>
          <div className='loader__ring loader__ring--1'></div>
          <div className='loader__ring loader__ring--2'></div>
          <p>Loading...</p>
      </div>
    </Modal>
  )
}

export default Loader