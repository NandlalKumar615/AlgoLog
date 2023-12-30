import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from '../../actions/dataAction'
import { executeUserAction } from '../../actions/userActions';
import ImageGallery from "react-image-gallery";
import { BiDownArrowAlt } from "react-icons/bi";
import Modal from '../UI/Modal';
import { toast } from 'react-toastify';
import Loader from '../layouts/loader/Loader';
import { LOADING } from '../../constants/commonConstants';


import './ANote.scss'

const ANote = () => {
  const { link } = useSelector((state) => state.myLink)
  const { fetchedData, status } = useSelector((state) => state.myData)
  const [commentModal, setCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  const [note, setNote] = useState(null);
  const [rendered, setRendered] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("dispatched")
    dispatch(fetchData(link))
  }, [dispatch, link])


  useEffect(()=>{
    if(rendered){
        setNote(fetchedData.note)
    }else{
      setRendered(true)
    }
  },[fetchedData])

  // const note = fetchData.note;

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

  function toggleDetails(divNumber) {

    return function toggleDetail() {
      const detailsSection = document.querySelectorAll('.details')
      detailsSection[divNumber].classList.toggle('details__clicked')

      const arrow = document.querySelectorAll('.details__arrow')
      arrow[divNumber].classList.toggle('details__arrow__clicked')
    }
  }

  const commentsInReverse = note ? ([...note.comment].reverse()) : (null);


  const toggleCommentModal = () => {
    setCommentModal((value) => !value);
  }

  const submitComment = () => {
    const text = document.getElementById('comment')
    if (text.value != "") {
      setComment(text.value)
    } else {
      toast.warn("Empty comment, not submitted")
    }
    toggleCommentModal()
  }


  useEffect(() => {
    if (comment != "") {
      const commentLink = `/api/v1/note/comment/${note._id}`
      const payload = { "comment": comment }
      // console.log(payload)
      dispatch(executeUserAction(commentLink, "put", payload)).then(() => {
        dispatch(fetchData(link))
      })
    }
  }, [comment, link])

  return (
    <Fragment>
      {
        (status === LOADING) ? (<Loader />) : (
          note ? (
            <div className="aNote">
              <div className='aNote__section1'>
                <h2> {note.title} </h2>
                <h4> (<span>{note.topic}</span> / <span>{note.difficulty}</span>) </h4>
              </div>

              <div className='aNote__section2'>
                <div className='aNote__section2--1'>
                  <ImageGallery items={images} />
                </div>
                <div className='aNote__section2--2'>
                  <div className='aNote__section2--2__stats'>
                    <h4> {`Up Vote : ${note.upVote} \xa0\xa0 / \xa0\xa0 Down Vote : ${note.downVote}`} </h4>
                    <h4>Marked for Revision : {note.revision} </h4>
                  </div>

                  <div id='detailsSection' className='details'>
                    <div className='details__section'>
                      <div className='details__section--title' onClick={toggleDetails(0)}>
                        Note
                      </div>
                      <div className='details__section--expand'>
                        <button type='button' onClick={toggleDetails(0)}> <span className='details__arrow'> <BiDownArrowAlt /> </span> </button>
                      </div>
                    </div>
                    <div className='details__textArea'>
                      <div id='textArea' className='details__textArea--text'>
                        {note.note || "No Note Available"}
                      </div>
                    </div>
                  </div>
                  <div id='detailsSection' className='details'>
                    <div className='details__section'>
                      <div className='details__section--title' onClick={toggleDetails(1)}>
                        Explanation
                      </div>
                      <div className='details__section--expand'>
                        <button type='button' onClick={toggleDetails(1)}> <span className='details__arrow'> <BiDownArrowAlt /> </span> </button>
                      </div>
                    </div>
                    <div className='details__textArea'>
                      <div id='textArea' className='details__textArea--text'>
                        {note.explanation || "No Explanation Available"}
                      </div>
                    </div>
                  </div>
                  <div id='detailsSection' className='details'>
                    <div className='details__section'>
                      <div className='details__section--title' onClick={toggleDetails(2)}>
                        Algorithm
                      </div>
                      <div className='details__section--expand'>
                        <button type='button' onClick={toggleDetails(2)}> <span className='details__arrow'> <BiDownArrowAlt /> </span> </button>
                      </div>
                    </div>
                    <div className='details__textArea'>
                      <div className='details__textArea--text'>
                        {note.algorithm || "No Algorithm Available"}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="aNote__section3">
                <h3>Comments : {note.numOfComments}</h3>
                <div className='aNote__section3__comments'>
                  {
                    commentsInReverse.map((data) => {
                      return <div key={data._id}>
                        <h4>{data.name}</h4>
                        <p>{data.comment}</p>
                      </div>
                    })}
                </div>
              </div>

              <div className='aNote__section4'>
                <button onClick={toggleCommentModal}>Write a comment</button>
                {commentModal && <Modal>
                  <div className='aNote__section4__modal'>
                    <textarea name="comment" id="comment" cols="60" rows="10"></textarea>
                    <div>
                      <button onClick={submitComment}>Submit</button>
                      <button onClick={toggleCommentModal}>Close</button>
                    </div>
                  </div>
                </Modal>}
              </div>
            </div>
          ) : (null)
        )
      }
    </Fragment>
  )
}

export default ANote