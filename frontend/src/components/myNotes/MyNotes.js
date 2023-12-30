import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LOADING, MY_NOTES } from '../../constants/commonConstants'
import Loader from '../layouts/loader/Loader'
import NoNotes from '../UI/noNotes/NoNotes'
import CreateNote from './CreateNote'


import './MyNotes.scss'

import NoteCard from './NoteCard'
import SearchAndFilter from '../searchAndFilter/SearchAndFilter'
// import note from '../../temp/note'
import { fetchNotes } from '../../actions/noteActions'
import Pagination from '../pagination/Pagination'
import NotSigned from '../UI/notSigned/NotSigned'

const AllNotes = () => {

  const dispatch = useDispatch();
  const { notes, status } = useSelector((state) => state.notes)
  const { formData, pageNo } = useSelector((state) => state.filter)
  const { loggedIn } = useSelector((state) => state.myProfile)

  const [showCreateNote, setShowCreateNote] = useState(false);

  const type = MY_NOTES;

  useEffect(() => {
    // const preLink = `/user=${}`
    dispatch(fetchNotes(formData, pageNo, type))
    // console.log(formData)
  }, [dispatch, formData, pageNo, loggedIn, type])

  const toggleShowCreateNote = () => {
    setShowCreateNote(!showCreateNote)
  }

  return (
    <Fragment>
      {
        loggedIn ? (
          <div>{
            showCreateNote ? <div><CreateNote toggleCreateNote={toggleShowCreateNote}></CreateNote></div> :
              <div>
                <h2 className='title'>Your Notes</h2>
                <SearchAndFilter />
                <button className='createNoteButton' onClick={toggleShowCreateNote}>Create A New Note</button>
                {
                  (status === LOADING) ? (<Loader />) : (
                    <div className='allNotes'>
                      {/* {notes.notes?.map((note) => <NoteCard key={note._id} notes={note} ></NoteCard>)} */}
                      {notes.notes ? (notes.notes.length === 0 ? (<NoNotes />) : (notes.notes.map((note) => <NoteCard key={note._id} notes={note} ></NoteCard>))) : null}
                    </div>
                  )
                }
                <Pagination />
              </div>
          }
          </div>
        ) : (<NotSigned></NotSigned>)
      }
    </Fragment>
  )
}

export default AllNotes