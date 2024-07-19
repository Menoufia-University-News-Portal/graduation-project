import axios from "axios";
import Swal from 'sweetalert2'
import React, { useState } from "react";

import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
//import { FaLock } from "react-icons/fa";
import "./forgetpass1.css";

const Forgetpass1 = () => {
  const [email, setEmail] = useState("");

  const submit = async (e) => {

    e.preventDefault();
    const respose = await axios.post("http://localhost:3001/password/forget", {
      email,
    });
    /* await fetch('http://localhost:3001/password/forget', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
           
            email
            
        })
    });*/
    if (respose) {
      Swal.fire({
        title: "Please, Check Your Gmail ",
        icon: "success"
      });

    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  };


  return (
    <div className="logpass1">
      <div className="wrapper1pass1">
        <form className="form" onSubmit={submit}>
          <h1 className="lo">Forget Password</h1>
          <br></br>
          <div className="input-boxpass1">
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Example@gmail.com"
            />
            <FaUser className="icon" />
          </div>
          <br></br>

          <button type="submit"> SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Forgetpass1;
