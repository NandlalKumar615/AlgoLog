import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import { BiSolidUpvote, BiSolidDownvote, BiNotepad, BiBookReader} from "react-icons/bi";
import { FaRegFolderOpen } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { generateLink } from '../../actions/linkActions';
import { executeUserAction } from '../../actions/userActions';
// import { fetchNotes } from '../../actions/noteActions';

import './NoteCard.scss'

import Card from '../UI/Card'
import Modal from '../UI/Modal'
// import { fetchNotes } from '../../actions/noteActions';

const NoteCard = (props) => {
  const note = props.notes;
  const dispatch = useDispatch();

  const [explanationModal,setExplanationModal] = useState(false)
  const [algorithmModal,setAlgorithmModal] = useState(false)

  // const [like,setLike] = useState(false)
  // const [dislike,setDislike] = useState(false)

  let like = false
  let disLike = false

  // const colored = () =>{
    
  // }

  note.vote.map((v)=>{
    // console.log(props.profileID)
    if(v.user.toString()===props.profileID){
      console.log(v.voteType)
      if(v.voteType===1){
        // setLike(true)
        // console.log("l")
        like = true
        console.log(like)
      }else{
        disLike = true
        console.log(disLike)
        // console.log("u")
        // setDislike(true)
      }
    }
  })


  const toggleExplanation = () =>{
    setExplanationModal(toggle => !toggle)
  }

  const toggleAlgorithm = () =>{
    setAlgorithmModal(toggle => !toggle)
  }

  const noteID = note._id

  const upVote = ()=>{
    const commentLink = `/api/v1/note/vote/${note._id}`
      const payload = { "voteType":"1"}
      // console.log(payload)
      dispatch(executeUserAction(commentLink,"put",payload))
  }
  const downVote = ()=>{
    const commentLink = `/api/v1/note/vote/${noteID}`
      const payload = { "voteType":"0"}
      dispatch(executeUserAction(commentLink,"put",payload))
      // dispatch(fetchNotes())
  }

  


  return (
    <Fragment>
      {explanationModal && <Modal onClose = {toggleExplanation}>
        <div className='modalContainer'>
          <p>{note.explanation}</p>
          <button onClick={toggleExplanation}>Got it</button>
        </div>
      </Modal>}

      {algorithmModal && <Modal onClose = {toggleAlgorithm}>
        <div className='modalContainer'>
          <p>{note.algorithm}</p>
          <button onClick={toggleAlgorithm}>Got it</button>
        </div>
      </Modal>}

      <Card className="noteCard">
          <h4>{note.title}</h4>
          <p>{note.note}</p>
          <div className="noteCard__d1">
              <span> {note.topic} / {note.difficulty}</span>
              <Link to="/note" onClick={()=>{dispatch(generateLink(`/api/v1/notes/${note._id}`))}} className='noteCard__link'><FaRegFolderOpen size={30}/></Link>
          </div>
          <div className="noteCard__d2">
              <span className='noteCard__d2--1'>
                <Link className='noteCard__link' onClick={toggleExplanation}><BiBookReader size={30}/></Link>
                <Link className='noteCard__link' onClick={toggleAlgorithm}><BiNotepad size={30}/></Link>
              </span>
              <span className='noteCard__d2--1'>
                  <button className='noteCard__link'>{ note.upVote} <BiSolidUpvote size={25} onClick={upVote}/></button>
                  <button className='noteCard__link'>{note.downVote} <BiSolidDownvote size={25} onClick={downVote}/></button>
              </span>
          </div>
      </Card>
    </Fragment>
  )
}

export default NoteCard