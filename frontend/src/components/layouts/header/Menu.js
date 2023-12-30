import React from "react";

import './Menu.scss';
import { useState } from "react";


const Menu = (props) => {
    
    const [menuActive,setMenuActive] = useState(false)
    
    
    const addingMenuAnimation=()=>{
        if(menuActive){
            // document.getElementById('bar_1').classList.remove('menu-Top');
            // document.getElementById('bar_2').classList.remove('menu-Middle');
            // document.getElementById('bar_3').classList.remove('menu-Bottom');
            // document.getElementById('gradientForMenu').classList.remove('menu-Scale');
            setMenuActive(false);
            props.setMenuToUnClick()
            
        }else{
        //     document.getElementById('bar_1').classList.add('menu-Top');
        //     document.getElementById('bar_2').classList.add('menu-Middle');
        //     document.getElementById('bar_3').classList.add('menu-Bottom');
        //     document.getElementById('gradientForMenu').classList.add('menu-Scale');
            setMenuActive(true);
            props.setMenuToClick();
        }
    }
    return(
        <div className="menu" >
            <div id="gradientForMenu" className="menu-Gradient"></div>
            <div className="menu-Bars" onClick={addingMenuAnimation} >
                <div id="bar_1" className="menu-Bar"></div>
                <div id="bar_2" className="menu-Bar"></div>
                <div id="bar_3" className="menu-Bar"></div>
            </div>
        </div>
    )
}

export default Menu;