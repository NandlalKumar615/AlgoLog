import React from 'react'
import { Link } from 'react-router-dom'

import './NotSigned.scss'

const NotSigned = () => {
  return (
    <div>
        <div className='notSigned'>You Are Not Logged In, Please Log In First</div>
        <Link className='notSigned__link' to={"/"}>Log In</Link>
    </div>
  )
}

export default NotSigned