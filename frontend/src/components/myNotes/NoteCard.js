import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import { BiSolidUpvote, BiSolidDownvote, BiNotepad, BiBookReader} from "react-icons/bi";
import { FaRegFolderOpen } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { generateLink } from '../../actions/linkActions';

import './NoteCard.scss'

import Card from '../UI/Card'
import Modal from '../UI/Modal'

const NoteCard = (props) => {

  const [explanationModal,setExplanationModal] = useState(false)
  const [algorithmModal,setAlgorithmModal] = useState(false)

  const toggleExplanation = () =>{
    setExplanationModal(toggle => !toggle)
  }

  const toggleAlgorithm = () =>{
    setAlgorithmModal(toggle => !toggle)
  }

  const dispatch = useDispatch()


  return (
    <Fragment>
      {explanationModal && <Modal onClose = {toggleExplanation}>
        <div className='modalContainer'>
          <p>{props.notes.explanation}</p>
          <button onClick={toggleExplanation}>Got it</button>
        </div>
      </Modal>}

      {algorithmModal && <Modal onClose = {toggleAlgorithm}>
        <div className='modalContainer'>
          <p>{props.notes.algorithm}</p>
          <button onClick={toggleAlgorithm}>Got it</button>
        </div>
      </Modal>}

      <Card className="noteCard">
          <h4>{props.notes.title}</h4>
          <p>{props.notes.note}</p>
          <div className="noteCard__d1">
              <span> {props.notes.topic} / {props.notes.difficulty}</span>
              <Link to="/note" onClick={()=>{dispatch(generateLink(`/api/v1/notes/${props.notes._id}`))}} className='noteCard__link'><FaRegFolderOpen size={30}/></Link>
          </div>
          <div className="noteCard__d2">
              <span className='noteCard__d2--1'>
                <Link className='noteCard__link' onClick={toggleExplanation}><BiBookReader size={30}/></Link>
                <Link className='noteCard__link' onClick={toggleAlgorithm}><BiNotepad size={30}/></Link>
              </span>
              <span className='noteCard__d2--1'>
                  <Link className='noteCard__link'>{ props.notes.upVote} <BiSolidUpvote size={25}/></Link>
                  <Link className='noteCard__link'>{props.notes.downVote} <BiSolidDownvote size={25}/></Link>
              </span>
          </div>
      </Card>
    </Fragment>
  )
}

export default NoteCard