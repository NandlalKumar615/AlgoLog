import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

import Header from './components/layouts/header/Header';
import SignUpLogin from './components/signUpLogin/SignUpLogin';
import AllNotes from './components/allNotes/AllNotes';
import QuizNotes from './components/quizNotes/QuizNotes';
import RevisionNote from './components/revisionNote/RevisionNote';
import MyProfile from './components/myProfile/MyProfile';
import MyNotes from './components/myNotes/MyNotes';
import ANote from './components/aNote/ANote';
import FavouriteNotes from './components/favouriteNotes/FavouriteNotes';

// import CreateNotes from './components/createNote/CreateNote';
// import SearchAndFilter from './components/searchAndFilter/SearchAndFilter';

const options = {
  position : "bottom-center",
autoClose : 5000,
hideProgressBar : false,
newestOnTop : false,
closeOnClick : true,
rtl : false,
pauseOnFocusLoss : true,
draggable : true,
pauseOnHover : true,
theme : "light",
}

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route exact path='/' element={<SignUpLogin />} ></Route>
        <Route exact path='/profile' element={<MyProfile />} ></Route>
        <Route exact path='/exploreNotes' element={<AllNotes />} ></Route>
        <Route exact path='/quiz' element={<QuizNotes />} ></Route>
        <Route exact path='/revisionNotes' element={<RevisionNote />} ></Route>
        <Route exact path='/myNotes' element={<MyNotes />} ></Route>
        <Route exact path='/note' element={<ANote/>} ></Route>
        <Route exact path='/favouriteNotes' element={<FavouriteNotes/>} ></Route>
        {/* <Route exact path='/myProfile' element={<MyProfile/>} ></Route> */}
      </Routes>
      <ToastContainer {...options}/>
      {/* <SignUpLogin></SignUpLogin>
        <CreateNotes></CreateNotes>
        <AllNotes></AllNotes>
        <QuizNotes></QuizNotes>
        <RevisionNote></RevisionNote>
        <SearchAndFilter></SearchAndFilter> */}
    </Router>
  );
}

export default App;