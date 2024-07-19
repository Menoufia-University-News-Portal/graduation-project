import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./settingstyle.css"
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import ReactDOM from 'react-dom/client';
import { FaRegEdit } from "react-icons/fa";
import { FcAcceptDatabase } from "react-icons/fc";
import { IoMoonOutline } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Login2 from '../../../Login2/Login2';
import axios from 'axios';
import Cookie from 'cookie-universal';
import Sidebar from '../../Sidebar/Sidebar';
//import { useTheme } from '../../../theme/theme';
const Setting = () => {
  //const { theme, toggleTheme } = useTheme();

const cookie = Cookie();
  async function handlelogout(){
    try{
      const res = await axios.post(`http://localhost:3001/admin/logout`,{
        headers:{
          Authorization:"Bearer" + cookie.get("jwt"),
        },
      });
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }


 

  return (
    <div  className="sidebar-right">
    <Sidebar/>
    <div>
      <aside>
        <div className="setting">



          <Link to='/setting/my_profile'>
            <CgProfile />
            <h2>My Profile</h2>
          </Link>



          <Link to='/dashboard'>
            <FaRegEdit />
            <h2>My Posts</h2>
          </Link>



          <Link to='/dashboard'>
            <IoMoonOutline />
            <h2> Mode</h2>
          </Link>

          <Link to='/dashboard'>
            <GrLanguage />
            <h2>Language</h2>
          </Link>
 
           <Link to="/">  
            <IoIosLogOut />
            <h2 onClick={handlelogout} >LogOut</h2>
            </Link>  





        </div>
      </aside>
    </div>
    </div>
  )
}

export default Setting