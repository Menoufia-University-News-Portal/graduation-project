import axios from "axios";
import React, { useState , useEffect } from "react";
import ReactDOM from 'react-dom/client';
import Cookie from "cookie-universal";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Forgetpass1 from "../ForgetPassword 2/Forgetpass1";
import './Login2.css';
import '../components/pages/Dashboard/Dashboard';
import App from "../App";
import MyProfile from "../components/pages/Setting/MyProfile";
import { useNavigate } from 'react-router-dom';
import { Navigate ,Outlet } from "react-router-dom";
import { MdOutlineVisibility } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import Swal from 'sweetalert2';


const Login2 = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /* to disable the back button */
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);
  };


  
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const [loading, setloading] = useState(false);
  const cookie = Cookie();
  const [err, setErr] = useState("");



  function handleChange(e) {
   
    setform({ ...form, [e.target.name]: e.target.value });
  }
  const root = ReactDOM.createRoot(
    document.getElementById('root')
  );

  const token2 = cookie.get('jwt');
  const navigate = useNavigate();
  async function handleSubmit(e) {

    e.preventDefault();
    setloading(true);
    try {

     
      const res = await axios.post('http://localhost:3001/admin/login', {
        email: form.email,
        password: form.password,
      });
      console.log(res);

      const token = res.data.access_token;

      await axios.get(`http://localhost:3001/admin/login/success`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
         console.log(response.data)
        })
        .catch((error) => {
         console.error('Error fetching user data:', error);
       });

      setloading(false);
     
      
     // const token1 = res.data.admin_info;
     // MyProfile(res.data.admin_info.name);
    //  console.log(res.data.admin_info.name);
      console.log(res);
      console.log(token);
     // console.log(token1);
      cookie.set("jwt", token);
   
      
      
      if (token){


        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1200
        });
       
        
        navigate("/dashboard" , {replace: true });
      
        // root.render(<App />);
          // root.render(<App />);
      }else{
        console.log("token1 not equal token2 ");
      }
    
    } catch (err) {
      setloading(false);

      if (err.response.status === 401) {
        setErr("Wrong Email or Password");
        // alert("Wrong Email or Password");

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: " Email or Password is wrong !",
          footer: '<a href="#">Why do I have this issue?</a>'
        });



      } else {
        setErr("Internal Server Err");
        // alert("Internal Server Error");

        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question"
        });


      }

      if (err.response.status === 404) {
        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question"
        });
      }

      
    }

  
    
  }
     function forget (){
      navigate("/forgetpassword" , {replace: true });
   // root.render(<Forgetpass1/>);
  } 
  
  // const token2 = cookie.get('jwt');
  // console.log(token2);
  

  //  useEffect(() => {
  //   axios.get(`http://localhost:3001/admin/login/success`, {
  //      headers: { Authorization: `Bearer ${token2}` },
  //    })
  //      .then((response) => {
  //       console.log(response.data)
  //      })
  //      .catch((error) => {
  //       console.error('Error fetching user data:', error);
  //     });
  //  }, [token2]);



   



  return (
    //   <div className="login">
    //   <section>

    //   <div className="register">

    // <div className="col-1">
    //     <div className="hhh"> <h1>Welcome !</h1></div>
    //     <form className="form" onSubmit={handleSubmit}>

    //     <h3 className="text1">Email </h3>

    //             <input  
    //               id="email"
    //               name="email"
    //               type="email"
    //               value={form.email}
    //               onChange={handleChange}
    //               placeholder='Example@gmail.com'/>



    //             <h4 className="text">password </h4>
    //             <input  
    //               id="password"
    //               name="password"
    //               type="password"
    //               value={form.password}
    //               onChange={handleChange}
    //               placeholder="Enter Your password ...."/>
    //                <div className="forgetpassword">  <h5>Forget Password ?</h5></div>

    //                <button className="btn"> Submit </button>
    //                {err!=="" && <span className="error">{err}</span>}


    //      </form>
    //      </div>
    //     <div className="col-2">
    //         {/* <img src={bgimg}  alt=""/> */}
    //     </div >

    //     </div>

    //     </section>
    //     </div> 

    <div className="log">
      <div className="wrapper" style={{width:"500px"}}>
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="lo">Login</h1>
          <div className="input-box">
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder='Example@gmail.com' />
            <FaUser className="icon" />
          </div>


          <div className="input-box" >

            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Your Password ...." />
            <MdVisibility className="icon" onClick={toggleShowPassword} >  {showPassword ? 'Hide' : 'Show'} </MdVisibility>
          </div>
          <div className="remember-forgot">
          {/* <a   > Forgot password? </a> */}
           <a onClick={forget} > Forgot Password? </a> 
          </div>
          <button  type="submit">
            LOGIN</button>

        </form>

      </div>
    </div>


  );
}
export default Login2;


