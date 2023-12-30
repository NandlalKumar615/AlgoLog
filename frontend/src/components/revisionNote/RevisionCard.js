import React, { Fragment, useState } from 'react'

import Card from '../UI/Card'
import Modal from '../UI/Modal'

import './RevisionCard.scss'
import Checkbox from '../UI/checkbox/Checkbox2'

const RevisionCard = (props) => {

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

        <Card className = "revisionCard">
            <div className='revisionCard__d1'>
                <h4> {props.notes.title} </h4>
                <div> {props.notes.note} </div>
            </div>
            <div className='revisionCard__d2'>
                <div className='revisionCard__d2--1'>
                    <button onClick={toggleExplanation}>Explain</button>
                    <button onClick={toggleAlgorithm}>Algorithm</button>
                </div>
                <div className='revisionCard__d2--2'>
                    <p>Progress</p>
                    <Checkbox color="green"></Checkbox>
                    <Checkbox color="green"></Checkbox>
                    <Checkbox color="green"></Checkbox>
                </div>
                <div className='revisionCard__d2--3'>
                    <button>Open Notes</button>
                </div>
            </div>
        </Card>
    </Fragment>
  )
}

export default RevisionCard