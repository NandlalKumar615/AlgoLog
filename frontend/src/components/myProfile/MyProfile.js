import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { fetchMyProfile } from '../../actions/userActions'
import { executeUserAction } from '../../actions/userActions';
import Loader from '../layouts/loader/Loader';
import { LOADING } from '../../constants/commonConstants';
import Rating from '../rating/Rating';
import { BiSolidEditAlt, BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { persistor } from '../../store/store';
import { setLoggedIn } from '../../store/userSlice';
import NotSigned from '../UI/notSigned/NotSigned';
import EditProfile from './EditProfile';
import Modal from '../UI/Modal';

// import { toast } from 'react-toastify';

import './MyProfile.scss';

const MyProfile = () => {

  const { myProfileData, status, loggedIn } = useSelector((state) => state.myProfile)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showEditProfile,setShowEditProfile] = useState(false)

  const toggleShowEditProfile = () =>{
    setShowEditProfile(!showEditProfile)
  }

  // useEffect(() => {
  //   dispatch(fetchMyProfile())
  //   // dispatch(setMyProfileData(myProfileData))
  //   console.log(myProfileData)
  // }, [dispatch])


  const nextCall = () => {
    navigate('/')
  }

  const logoutUser = () => {
    const logoutLink = `/api/v1/logout`
    // dispatch(executeUserAction(logoutLink,"get",null,nextCall))
    dispatch(executeUserAction(logoutLink, "get", null, nextCall)).then(() => {
      persistor.purge()
    })
    dispatch(setLoggedIn(false))


  }

  // const totalPoints = myProfileData.user.totalUpvote + (myProfileData.user.totalFavourite*3)
  // const totalPoints = 21
  // const notify = () => toast.success("Wow so easy !");

  return (
    <div>
      {
        (status === LOADING) ? (<Loader />) : (
          loggedIn ? (
            myProfileData ? (
              <div>
              {/* <EditProfile></EditProfile> */}

                {
                  showEditProfile && <Modal onClose = {toggleShowEditProfile}>
                    <EditProfile profileData = {myProfileData.user} toggleEditProfile = {toggleShowEditProfile}></EditProfile>
                  </Modal>
                }
                <div className='myProfile'>
                  <div className='myProfile__about'>
                    <img src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' alt='Profile'></img>

                    <div className='myProfile__details'>
                      <h3>{myProfileData.user.name} <Rating data={myProfileData.user} /> </h3>
                      <h4> {myProfileData.user.role} </h4>
                      <h4> {myProfileData.user.email} </h4>
                      <h4> {`Account Type : ${myProfileData.user.privateAccount ? "Private" : "Open"}`} </h4>
                    </div>
                  </div>
                  <div className='myProfile__stats'>
                    <div>
                      <span>{`Friends : ${myProfileData.user.totalFriends}`} </span>
                      <span>{`Friends Of : ${myProfileData.user.totalFriendsOf}`} </span>
                    </div>
                    <p>{`Total Notes : ${myProfileData.user.totalNotes}`}</p>
                    <p>{`Upvote gained : ${myProfileData.user.totalUpvote}`}</p>
                    <p>{`Favourite tag : ${myProfileData.user.totalFavourite}`}</p>
                    {/* <span><button>Edit Profile <BiSolidEditAlt/> </button></span>
                  <span><button onClick={logoutUser}>Logout<BiLogOutCircle/> </button></span> */}
                    <div>
                      <button onClick={toggleShowEditProfile}>Edit Profile <BiSolidEditAlt /> </button>
                      <button onClick={logoutUser}>Logout<BiLogOutCircle /> </button>
                    </div>
                  </div>
                </div>
              </div>

            ) : null
          ) : (
            <NotSigned></NotSigned>
          )

        )
      }
    </div>



  )
}

export default MyProfile
