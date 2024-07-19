import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaLock } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import axios from "axios";
import Swal from 'sweetalert2';
import './forgetpass2.css';
import { MdVisibility } from "react-icons/md";

const Forgetpass2 = (props) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);



  console.log("The token ", token);
  const submit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:3001/reset/${token}`, {
      token,
      password,
      confirm_password: passwordConfirm
    })

    setRedirect(true);
    console.log(res);
    if (res.data == "The email is sent successfully") {
      Swal.fire({
        title: "The password is updated successfully",
        text: "Check your gmail to try logging with your new password",
        icon: "success"
      });
    }
    if (res.data == "Passwords don\'t match") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords don\'t match",
        footer: '<a href="#">Why do I have this issue?</a>'
      });

    } else if (res.data == "The password length must be from 7 to 20 characters") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The password length must be from 7 to 20 characters",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowconfirmpassword = () => {
    setshowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="logpass2">
      <div className="wrapperpass2">
        <form className="form" onSubmit={submit} >
          <h1 className="lo">Reset Password</h1>
          <div className="input-boxpass2">
            <input className='input2'
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter new password" />
            <MdVisibility className="icon2" onClick={toggleShowPassword} >  {showPassword ? 'Hide' : 'Show'} </MdVisibility>
            <input className='input3'
              id="confirmpassword"
              name="confirmpassword"
              type={showConfirmPassword ? 'text' : 'password'}
              onChange={e => setPasswordConfirm(e.target.value)}
              placeholder="Confirm new password" />
            {/* <GiConfirmed className="icon" /> */}
            {/* <GiConfirmed className="icon3" onClick={toggleShowconfirmpassword} >  {showConfirmPassword ? 'Hide' : 'Show'} </GiConfirmed> */}

          </div>
          <br></br><br></br>
          <button type="submit">Submit</button>
        </form>

      </div>
    </div>
  );
}
export default Forgetpass2;
