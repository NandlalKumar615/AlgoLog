import React, { useState } from 'react'
import Modal from '../UI/Modal'
import Switch from '../UI/Switch'
import Radio from '../UI/Radio'
import { executeUserAction } from '../../actions/userActions'
import {useNavigate} from 'react-router-dom';

import './CreateNote.scss'
import { useDispatch } from 'react-redux'

const CreateNote = (props) => {

  const [explanationModal, setExplanationModal] = useState(false)
  const [explanation, setExplanation] = useState("")

  const [algorithmModal, setAlgorithmModal] = useState(false)
  const [algorithm, setAlgorithm] = useState("")

  const [noteModal, setNoteModal] = useState(false)
  const [note, setNote] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const toggleExplanationModal = () => {
    setExplanationModal(value => !value);
  }
  const toggleAlgorithmModal = () => {
    setAlgorithmModal(value => !value);
  }
  const toggleNoteModal = () => {
    setNoteModal(value => !value);
  }

  const nextCall=()=>{
    navigate('/myNotes')
  }

  const postNewNote = (event) =>{
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    if(!formValues.public){
      formValues.public = false
    }else{
      formValues.public = true
    }
    delete(formValues.images);
    if(!formValues.questionName){
      delete(formValues.questionName)
    }
    if(!formValues.questionLink){
      delete(formValues.questionLink)
    }

    console.log(formValues);

   

    const createNoteLink  = 'api/v1/notes/new';
    dispatch(executeUserAction(createNoteLink,"post",formValues,nextCall));
    // dispatch(setLoggedIn(true));
    // dispatch(fetchMyProfile());
    event.target.reset();
    props.toggleCreateNote();
  }


  return (
    <div className='createNote--Container'>
      <form onSubmit={postNewNote} className='createNote'>
        <h4>Create A New Note</h4>
        <div>
          <input className='createNote__input' type="text" name='title' placeholder='Title For Your Note' required />
          <label className='createNote__label' htmlFor="">Title For Your Note</label>
        </div>

        <div>
          <input className='createNote__input' type="text" name='note' placeholder='Your Note' required value={note} readOnly onClick={toggleNoteModal}/>
          <label className='createNote__label' htmlFor="">Your Note</label>
        </div>
        {noteModal && <Modal onClose={toggleNoteModal}>
          <textarea className='createNote__input' name="note" cols="60" rows="15" placeholder='Write Your Note' autoFocus onChange={(e) => setNote(e.target.value)} value={note}></textarea>
          <button onClick={toggleNoteModal} className='createNote__modalButtons'>Done</button>
        </Modal>}

        <div>
          <input className='createNote__input' type="text" name='explanation' placeholder='Explanation In Detail' readOnly value={explanation} onClick={toggleExplanationModal} />
          <label className='createNote__label' htmlFor="">Explanation In Detail</label>
        </div>
        {explanationModal && <Modal onClose={toggleExplanationModal}>
          <textarea className='createNote__input' name="explanation" cols="60" rows="15" placeholder='Write Your Explanation' autoFocus onChange={(e) => setExplanation(e.target.value)} value={explanation}></textarea>
          <button onClick={toggleExplanationModal} className='createNote__modalButtons'>Done</button>
        </Modal>}

        <div>
          <input className='createNote__input' type="text" name='algorithm' placeholder='Algorithm' value={algorithm} readOnly onClick={toggleAlgorithmModal}/>
          <label className='createNote__label' htmlFor="">Algorithm</label>
        </div>
        {algorithmModal && <Modal onClose={toggleAlgorithmModal}>
          <textarea className='createNote__input' name="algorithm" cols="60" rows="15" placeholder='Write Your Algorithm' autoFocus onChange={(e) => setAlgorithm(e.target.value)} value={algorithm}></textarea>
          <button onClick={toggleAlgorithmModal} className='createNote__modalButtons'>Done</button>
        </Modal>}

        <div>
          <input className='createNote__input' type="text" name='questionName' placeholder='Question For Practice'/>
          <label className='createNote__label' htmlFor="">Question Name</label>
        </div>

        <div>
          <input className='createNote__input' type="url" name='questionLink' placeholder='Question Link'/>
          <label className='createNote__label' htmlFor="">Question Link</label>
        </div>

        <div className='createNote__Group'>
          {/* <select id="difficulty" name="difficulty">
            <option value="basic">Basic</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select> */}
          <label htmlFor="difficulty">Choose Difficulty Label</label>
          <Radio option="Basic" name="difficulty" value="Basic"></Radio>
          <Radio option="Easy" name="difficulty" value="Easy"></Radio>
          <Radio option="Medium" name="difficulty" value="Medium"></Radio>
          <Radio option="Hard" name="difficulty" value="Hard"></Radio>
        </div>

        <div className='createNote__Group'>
          <label htmlFor="topic">Select Topic</label>
          <select id="topic" name="topic">
            <option value="Arrays">Arrays</option>
            <option value="Linked_List">Linked List</option>
            <option value="Stack">Stack</option>
            <option value="Queue">Queue</option>
            <option value="Recursion">Recursion</option>
            <option value="Binary_Tree">Binary Tree</option>
            <option value="Greedy_Algorithm">Greedy Algorithm</option>
            <option value="Binary_Search">Binary Search</option>
            <option value="Binary_Search_Tree">Binary Search Tree</option>
            <option value="Graph">Graph</option>
            <option value="Trie">Trie</option>
            <option value="Dynamic_Programming">Dynamic Programming</option>
          </select>
        </div>

        <div className='createNote__Group'>
          <label className='createNote__label'></label>
          <input className='createNote__input' type="file" name='images'/>
        </div>

        <div className='createNote__Group'>
          <label className='createNote__label' htmlFor="">Make It Public</label>
          <Switch name={"public"}></Switch>
        </div>

        <div className='createNote__Buttons'>
          <button type='button' onClick={props.toggleCreateNote}>Close</button>
          <button type='submit'>Create Note</button>
        </div>
      </form>
    </div>
  )
}

export default CreateNote