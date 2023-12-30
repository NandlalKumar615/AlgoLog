import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { executeUserAction } from '../../actions/userActions';
import { fetchMyProfile } from '../../actions/userActions';

import './EditProfile.scss'

const EditProfile = (props) => {

    const [showOldPass, setShowOldPass] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showConPass, setShowConPass] = useState(false);

    const dispatch = useDispatch()

    const toggleOldPassword = () => {
        setShowOldPass(!showOldPass);
    }

    const togglePassword = () => {
        setShowPass(!showPass);
    }

    const toggleConfirmPassword = () => {
        setShowConPass(!showConPass);
    }

    async function getNewData(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());
        // console.log(formValues);newP
        const newEmail = formValues.email
        const updatedName = formValues.name
        const pass = formValues.oldPassword
        const newPass = formValues.newPassword;
        const conPass = formValues.confirmPassword;

        const profileData = {
            'name' : updatedName,
            'email' : newEmail
        }

        const passwordData = {
            'oldPassword' : pass,
            'newPassword' : newPass,
            'confirmPassword' : conPass
        }

        if(newPass.length>0){

            if (pass.length < 9 || newPass !== conPass) {
                if (newPass !== conPass) {
                    toast.info("Password does not matched.");
                }
                if (newPass.length < 9) {
                    toast.info("Password should be greater than 8 character.");
                }
                return;
            }else{
                const passResetLink = 'api/v1/password/update'
                dispatch(executeUserAction(passResetLink, "put", passwordData));
            }
        }

        if(newEmail !== props.profileData.email || updatedName !== props.profileData.name){
            const editProfileLink = 'api/v1/me/update';
            dispatch(executeUserAction(editProfileLink, "put", profileData));
        }
        props.toggleEditProfile();
        dispatch(fetchMyProfile());
        event.target.reset();
    }

    return (
        // <div id='editProfileContainer' className="editProfile__container">
        // </div>
        <div className="editProfile__container">
            <form onSubmit={getNewData}>
                <label htmlFor="editProfileCB">Enter New Data</label>
                <input type="text" name="name" placeholder="Name" defaultValue={props.profileData.name} required />
                <input type="email" name="email" placeholder="Email" autoComplete="new-email" defaultValue={props.profileData.email} required />
                <div className='editProfile__show'>
                    <input type={showOldPass ? "text" : "password"} name="oldPassword" placeholder="Old Password" autoComplete="old-password"/>
                    <div onClick={toggleOldPassword}>
                        {showOldPass ? <span className='editProfile__show__icon'><PiEyeBold size={"3rem"}></PiEyeBold></span>
                            : <span className='editProfile__show__icon'><PiEyeClosedBold size={"3rem"}></PiEyeClosedBold></span>}
                    </div>
                </div>
                <div className='editProfile__show'>
                    <input type={showPass ? "text" : "password"} name="newPassword" placeholder="New Password" autoComplete="new-password"/>
                    <div onClick={togglePassword}>
                        {showPass ? <span className='editProfile__show__icon'><PiEyeBold size={"3rem"}></PiEyeBold></span>
                            : <span className='editProfile__show__icon'><PiEyeClosedBold size={"3rem"}></PiEyeClosedBold></span>}
                    </div>
                </div>
                <div className='editProfile__show' >
                    <input type={showConPass ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" autoComplete="new-confirm-password"/>
                    <div onClick={toggleConfirmPassword}>
                        {showConPass ? <span className='editProfile__show__icon'><PiEyeBold size={"3rem"}></PiEyeBold></span>
                            : <span className='editProfile__show__icon'><PiEyeClosedBold size={"3rem"}></PiEyeClosedBold></span>}
                    </div>
                </div>
                <button type='submit'>Edit My Profile</button>
                <button type='button' onClick={props.toggleEditProfile}>Close</button>
            </form>
        </div>

    )
}

export default EditProfile