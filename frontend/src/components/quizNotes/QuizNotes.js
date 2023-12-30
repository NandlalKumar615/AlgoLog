import React from 'react'

import QuizCard from './QuizCard'
import note from '../../temp/note'

import './QuizNotes.scss'

const QuizNotes = () => {
  return (
    <div className='quizNotes'>
        <QuizCard notes={note}></QuizCard>
        <QuizCard notes={note}></QuizCard>
    </div>
  )
}

export default QuizNotes