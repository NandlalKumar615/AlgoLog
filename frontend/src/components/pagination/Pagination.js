import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { givePageNo } from '../../actions/filterActions'

import './Pagination.scss'


// import ReactPaginate from 'react-paginate';

// const handlePageClick =  () =>{
//     console.log("pageClicked")
// }

// const pageCount ="25"

// const options = {
//     breakLabel:"...",
//     nextLabel : "next >",
//     onPageChange : {handlePageClick},
//     pageRangeDisplayed : "5",
//     pageCount : "25",
//     previousLabel : "< previous",
//     renderOnZeroPageCount : null,
// }

// const Pagination = () => {
//   return (
//     <ReactPaginate {...options}/>
//   )
// }

const Pagination = () => {
    const [startPage,setStartPage] = useState(1)
    const p1 = document.getElementById("pageNoFirst")
    const p2 = document.getElementById("pageNoSecond")
    const p3 = document.getElementById("pageNoThird")
    
    
    const increase =()=>{
        setStartPage((x)=>x+3)
        p1.classList.add('selected')
        p2.classList.remove('selected')
        p3.classList.remove('selected')
    }
    const decrease =()=>{
        if(startPage>=4){
            setStartPage((x)=>x-3)
            p1.classList.add('selected')
            p2.classList.remove('selected')
            p3.classList.remove('selected')
    }
    }
    const getPageNo=(event)=>{
        dispatch(givePageNo(event.target.textContent));
        
        p1.classList.remove('selected')
        p2.classList.remove('selected')
        p3.classList.remove('selected')
        event.target.classList.add('selected');
    }
    
    
    const dispatch =useDispatch();
    
    useEffect(()=>{
        dispatch(givePageNo(startPage))
    },[startPage])
    
  return (

    <div className='pagination'>
        <button onClick={decrease}>&lt;&lt;</button>
        <span id='pageNoFirst' onClick={getPageNo}>{startPage}</span>
        <span id='pageNoSecond' onClick={getPageNo}>{startPage+1}</span>
        <span id='pageNoThird' onClick={getPageNo}>{startPage+2}</span>
        <button onClick={increase}>&gt;&gt;</button>
    </div>
  )
}

export default Pagination