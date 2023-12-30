import React, { Fragment, useState } from 'react'
import { BiSolidUpvote, BiSolidDownvote, BiNotepad, BiBookReader } from "react-icons/bi";


import './QuizCard.scss'

import Card from '../UI/Card'
import Modal from '../UI/Modal'

const QuizCard = (props) => {

    const [flipButtonClicked, setFlipButtonClicked] = useState(false);

    const buttonClicked = () => {
        setFlipButtonClicked(currentStatus => !currentStatus);
    }

    let classes_backSide = 'quizCard__back ';
    let classes_frontSide = 'quizCard__front ';

    if (flipButtonClicked) {
        classes_backSide = classes_backSide + 'quizCard__flipBack';
        classes_frontSide = classes_frontSide + 'quizCard__flipFront'
    }

    const [explanationModal, setExplanationModal] = useState(false)
    const [algorithmModal, setAlgorithmModal] = useState(false)

    const toggleExplanation = () => {
        setExplanationModal(toggle => !toggle)
    }

    const toggleAlgorithm = () => {
        setAlgorithmModal(toggle => !toggle)
    }

    return (
        <Fragment>
            {explanationModal && <Modal onClose={toggleExplanation}>
                <div className='modalContainer'>
                    <p>{props.notes.explanation}</p>
                    <button onClick={toggleExplanation}>Got it</button>
                </div>
            </Modal>}

            {algorithmModal && <Modal onClose={toggleAlgorithm}>
                <div className='modalContainer'>
                    <p>{props.notes.algorithm}</p>
                    <button onClick={toggleAlgorithm}>Got it</button>
                </div>
            </Modal>}

            <div className='quizCard'>
                <Card className={classes_frontSide}>
                    <h4 className='quizCard__question'>Explain <span>{props.notes.title}</span></h4>
                    <div className='quizCard__d1'>
                        <span> {props.notes.topic} </span>
                        <span> {props.notes.difficulty} </span>
                    </div>
                    <button className='quizCard__Button quizCard__Button--1' onClick={buttonClicked}>See Answer</button>
                </Card>
                <Card className={classes_backSide}>
                    <p className='quizCard__note'> {props.notes.note} </p>
                    <div className="quizCard__d1">
                        <span className='quizCard__d1--1'>
                            <button onClick={toggleExplanation}><BiBookReader size={30} /></button>
                            <button onClick={toggleAlgorithm}><BiNotepad size={30} /></button>
                        </span>
                        <span className='quizCard__d1--1'>
                            <button>{props.notes.upVote} <BiSolidUpvote size={25} /></button>
                            <button>{props.notes.downVote} <BiSolidDownvote size={25} /></button>
                        </span>
                    </div>
                    <div className='quizCard__d1'>
                        <button className='quizCard__Button quizCard__Button--2'>Open Note</button>
                        <button className='quizCard__Button quizCard__Button--3' onClick={buttonClicked}>Flip</button>
                    </div>
                </Card>
            </div>
        </Fragment>
    )
}

export default QuizCard