import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LOADING, EXPLORE_NOTES } from '../../constants/commonConstants'
import Loader from '../layouts/loader/Loader'
import NoNotes from '../UI/noNotes/NoNotes'


import './AllNotes.scss'

import NoteCard from './NoteCard'
import SearchAndFilter from '../searchAndFilter/SearchAndFilter'
// import note from '../../temp/note'
import { fetchNotes } from '../../actions/noteActions'
import Pagination from '../pagination/Pagination'

const AllNotes = () => {

  const dispatch = useDispatch();
  const { myProfileData } = useSelector((state) => state.myProfile)
  const { notes, status } = useSelector((state) => state.notes)
  const { formData, pageNo} = useSelector((state)=>state.filter)

  const type = EXPLORE_NOTES;
  // const profileID = myProfileData.user._id;

  useEffect(() => {
    dispatch(fetchNotes(formData, pageNo, type))
    // console.log(formData)
  }, [dispatch,formData, pageNo])

  return (
    <Fragment>
          <div>
            <h2 className='title'>Explore Notes</h2>
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

export default AllNotes