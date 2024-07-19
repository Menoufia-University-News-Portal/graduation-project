

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';

 import axios from "axios";
 import React, { useEffect, useState } from "react";
 import Cookie from "universal-cookie";
 import profile from '../../../imgs/profile.png';
 import '../Setting/MyProfile.css';
 import { FaUser } from "react-icons/fa6";
import Sidebar from '../../Sidebar/Sidebar';


export default function MyProfile() {
  const [userData, setUserData] = useState({});
  const cookie = new Cookie();
  const token = cookie.get('jwt');

   useEffect(() => {
    axios.get(`http://localhost:3001/admin/login/success`, {
       headers: { Authorization: `Bearer ${token}` },
     })
       .then((response) => {
         setUserData(response.data);
       })
       .catch((error) => {
        console.error('Error fetching user data:', error);
      });
   }, [token]);
  return (
    <div className='sidebar-right'>
    <Sidebar />
    <div   style={{marginLeft:"-200px" , marginTop:"80px"}}>
      <MDBContainer >
        <MDBRow>
          <MDBCol >
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4  d-flex flex-column" style={{ width: '160px' , marginTop:"70px" }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h4"> {userData.name} </MDBTypography>
                  <MDBCardText >{userData.email}</MDBCardText>
                </div>
              </div>
             
              
              <MDBCardBody className="text-black p-4" >
                <div className="mb-5" style={{marginTop:"50px"}}>
                  
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">
                      {userData.permissions && (
            <div>
              <h2>Permissions:</h2>
              <ul>
                 {userData.permissions.map((permission, i) => (
                   <li key={i}>{permission.type}</li>
                 ))}
               </ul>
             </div>
             
           )}
           </MDBCardText>
                   
                  </div>
                </div>
                
              </MDBCardBody>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                 
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">
                    {userData.faculties && (
            <div>
              <h2>Faculties:</h2>
              <ul>
                {userData.faculties.map((faculty, i) => (
                   <li key={i}>{faculty.name}</li>
                 ))}
              </ul>
             </div>
          )}

           </MDBCardText>
                   
                  </div>
                </div>
               
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    </div>
  );
}