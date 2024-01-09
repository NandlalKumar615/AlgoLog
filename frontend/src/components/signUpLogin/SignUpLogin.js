import React,{useState} from 'react'
import { executeUserAction } from '../../actions/userActions';
import { fetchMyProfile } from '../../actions/userActions';
import { setLoggedIn } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

// import { BiShow } from "react-icons/bi";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

import './SignUpLogin.scss'

const SignUpLogin = () => {

  const [showPass, setShowPass] = useState(false);
  const [showLogPass, setShowLogPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);

  const togglePassword = () =>{
    setShowPass(!showPass);
  }

  const toggleLogPassword = () =>{
    setShowLogPass(!showLogPass);
  }

  const toggleConfirmPassword = () =>{
    setShowConPass(!showConPass);
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const nextCall=()=>{
    navigate('/exploreNotes')
  }
  
  async function getLoginData(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    const loginLink = "api/v1/login";
    dispatch(fetchMyProfile());
    dispatch(setLoggedIn(true));
    dispatch(executeUserAction(loginLink,"post",formValues,nextCall));
  }


  async function getSignUpData (event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    // console.log(formValues);

    const pass = formValues.password;
    const conPass = formValues.confirmPassword;

    if(pass.length<9 || pass!==conPass){
      if(pass!==conPass){
        toast.info("Password does not matched.");
      }
      if(pass.length<9){
        toast.info("Password should be greater than 8 character.");
      }
      return;
    }

    const signUpLink  = 'api/v1/register';
    dispatch(executeUserAction(signUpLink,"post",formValues,nextCall));
    dispatch(setLoggedIn(true));
    dispatch(fetchMyProfile());
    event.target.reset();
  }


  return (
    <div className='signUpLogin'>
      <div className='signUpLogin__banner'>
        <p>Welcome to AlgoLog</p>
        <h2>Organize, learn, and conquer algorithms with ease.</h2>
        <a href='#signUpLoginContainer'>Login / Sign Up</a>
      </div>

      <div id='signUpLoginContainer' className="signUpLogin__container">
        <input type="checkbox" id='signUpLoginCB' />

        <div className="signUpLogin__login">
          <form onSubmit={getLoginData}>
            <label htmlFor="signUpLoginCB">Log in</label>
            <input type="email" name="email" placeholder="Email" required />
            {/* <input type="password" name="password" placeholder="Password" required /> */}
            <div className='signUpLogin__show'>
              <input type={showLogPass?"text":"password"} name="password" placeholder="Password" required />
              <div onClick={toggleLogPassword}>
                {showLogPass?<span className='signUpLogin__show__icon'><PiEyeBold size={"3rem"}></PiEyeBold></span>
                :<span className='signUpLogin__show__icon'><PiEyeClosedBold size={"3rem"}></PiEyeClosedBold></span>}
              </div>
            </div>
            <button type='submit' >Log in</button>
          </form>
        </div>

        <div className="signUpLogin__signUp">
          <form onSubmit={getSignUpData}>
            <label htmlFor="signUpLoginCB">Sign Up</label>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" autoComplete="new-email" required />
            <div className='signUpLogin__show'>
              <input type={showPass?"text":"password"} name="password" placeholder="Password" autoComplete="new-password" required />
              <div onClick={togglePassword}>
                {showPass?<span className='signUpLogin__show__icon'><PiEyeBold size={"3rem"}></PiEyeBold></span>
                :<span className='signUpLogin__show__icon'><PiEyeClosedBold size={"3rem"}></PiEyeClosedBold></span>}
              </div>
            </div>
            <div className='signUpLogin__show' >
              <input type={showConPass?"text":"password"} name="confirmPassword" placeholder="Confirm Password" autoComplete="new-confirm-password" required />
              <div onClick={toggleConfirmPassword}>
                {showConPass?<span className='signUpLogin__show__icon'><PiEyeBold size={"3rem"}></PiEyeBold></span>
                :<span className='signUpLogin__show__icon'><PiEyeClosedBold size={"3rem"}></PiEyeClosedBold></span>}
              </div>
            </div>
            <button type='submit'>Sign Up</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default SignUpLogin





