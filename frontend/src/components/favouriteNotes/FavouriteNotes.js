import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LOADING, FAVOURITE_NOTES } from '../../constants/commonConstants'
import Loader from '../layouts/loader/Loader'
import NoNotes from '../UI/noNotes/NoNotes'


import NoteCard from './NoteCard'
import SearchAndFilter from '../searchAndFilter/SearchAndFilter'
// import note from '../../temp/note'
import { fetchNotes } from '../../actions/noteActions'
import Pagination from '../pagination/Pagination'

import './FavouriteNotes.scss'

// import note from '../../temp/note'

const FavouriteNotes = () => {
  const dispatch = useDispatch();
  const { notes, status } = useSelector((state) => state.notes)
  const { formData, pageNo} = useSelector((state)=>state.filter)

  const type  = FAVOURITE_NOTES

  useEffect(() => {
    dispatch(fetchNotes(formData, pageNo, type))
    // console.log(formData)
  }, [dispatch,formData, pageNo])

  return (
    <Fragment>
          <div>
            <h2 className='title'>Favourite Notes</h2>
            <SearchAndFilter/>
            {/* <Pagination/> */}
            {
              (status === LOADING) ? (<Loader />) : (
              <div className='allNotes'>
                {/* {notes.notes?.map((note) => <NoteCard key={note._id} notes={note} ></NoteCard>)} */}
                {notes.notes?(notes.notes.length===0?(<NoNotes/>):(notes.notes.map((note) => <NoteCard key={note._id} notes={note} ></NoteCard>))):null}
              </div>
              )
            }
            <Pagination/>
          </div>
    </Fragment>
  )
}

export default FavouriteNotes