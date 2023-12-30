import React from "react";
// import Modal from '../../UI/Modal';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

import Menu from './Menu';

import './Header.scss';
import { useState } from "react";

const Header =()=>{

    const [menuClicked,setMenuClicked] = useState(false);
    const {loggedIn} = useSelector((state) => state.myProfile)
    // console.log(loggedIn);

    const setToClick=()=>{
        setMenuClicked(true);
        document.getElementById('bar_1').classList.add('menu-Top');
        document.getElementById('bar_2').classList.add('menu-Middle');
        document.getElementById('bar_3').classList.add('menu-Bottom');
        document.getElementById('gradientForMenu').classList.add('menu-Scale');
        // document.getElementById('headerAllLinks').classList.add('header-Links-Animation');


    }
    const setToUnClick=()=>{
        setMenuClicked(false);
        document.getElementById('bar_1').classList.remove('menu-Top');
        document.getElementById('bar_2').classList.remove('menu-Middle');
        document.getElementById('bar_3').classList.remove('menu-Bottom');
        document.getElementById('gradientForMenu').classList.remove('menu-Scale');
        // document.getElementById('headerAllLinks').classList.remove('header-Links-Animation');
    }


    return(
        <div className="header-Container">
            <Menu setMenuToClick={setToClick} setMenuToUnClick={setToUnClick}></Menu>
            {menuClicked && <div className="header">
                <div id="headerAllLinks" className="header-Links">
                    <Link onClick={setToUnClick} to="/exploreNotes" className="header-Link">Explore Notes</Link>
                    <Link onClick={setToUnClick} to="/myNotes" className="header-Link">My Notes</Link>
                    <Link onClick={setToUnClick} to="/favouriteNotes" className="header-Link">Favourite Notes</Link>
                    <Link onClick={setToUnClick} to="/revisionNotes" className="header-Link">Revision Notes</Link>
                    <Link onClick={setToUnClick} to="/quiz" className="header-Link">Quiz</Link>
                    <Link onClick={setToUnClick} to="/profile" className="header-Link">My Profile</Link>
                </div>
            </div>}
        </div>
    )
}

export default Header;