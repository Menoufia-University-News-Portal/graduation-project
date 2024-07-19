

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import '../Events/AddEvents.css';
import Swal from 'sweetalert2';

import { FaCloudUploadAlt } from "react-icons/fa";
import Select from 'react-select';


import axios from 'axios';
import Sidebar from '../../Sidebar/Sidebar';

export default function UpdateUniLeader() {

  const [form, setform] = useState({
    name: "",
    role: "",
  });

  const [imagesFromServer, setImageFromServer] = useState([]);


  const [link, setlink] = useState([]);
  const [uploading, setuploading] = useState(0);
  //const { id } = useParams();
  console.log(uploading);


  //Ref
  const openImage = useRef(null);
  const progress = useRef([]);
  //const ids  = useRef([]);


  const id = Number(window.location.pathname.replace("/Uni_leadear/", ""));




  // get data
  useEffect(() => {
    axios.get(`http://localhost:3001/uni-leader/${id}`)
      .then((data) => {
        setform(data.data);
        setImageFromServer('http://localhost:3001/' + data.data.link);
        console.log({ data });

      })
      .catch((err) => console.log(err));

  }, []);


  console.log(imagesFromServer);

  //ref
  function handleOpenImage() {
    openImage.current.click();
  }




  // Handle edit

  const navigate = useNavigate();


  async function HandleEdit(e) {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        try {
          const load2 = {
            "name": form.name,
            "role": form.role,
            "link": link[0],


          };

          axios.patch(`http://localhost:3001/uni-leader/update/${id}`, load2);

          //  if (res.data) {
          //  alert('this News Update Successfully');
          navigate("/Uni_leadear");
          //  }
        } catch (err) {
          console.log(err);

        }


        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });





  }


  function handlechange(e) {
    setform({ ...form, [e.target.name]: e.target.value })
  }



  // Handle Delete Image 
  async function handleImageDelete(id, img) {


  }

  //mapping showing picture 
  const imagesFromServershow =
    <div className=" border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-2 ">

          <img src={imagesFromServer} style={{ width: "250PX" }}></img>

        </div>
        {/* <Button onClick={() => handleImageDelete(key, img)} variant="danger"> Delete </Button> */}
      </div>

    </div>
  console.log({ link });









  const imageshow = link.map((img, key) => (
    <div className=" border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-2 ">

          <img src={URL.createObjectURL(img)} style={{ width: "250PX" }}></img>
          <div>
            <p className='mb-1'>{img.name}</p>
            <p>{img.size / 1024 < 900
              ? (img.size / 1024).toFixed(2) + "KB"
              : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <Button onClick={() => handleImageDelete(key, img)} variant="danger"> Delete </Button>
      </div>
      <div className="custom-progress mt-3">
        <span percent={`${uploading}%`}
          style={{ width: `${uploading}%` }}
          className="inner-progress"></span>

      </div>
    </div>

  ));



  // fetch faculty

  return (


    <div className="sidebar-right">
      <Sidebar />
      <div>

        <Form className='bg-white w-100 mx-2 p-5' style={{ marginTop: "40px" }} onSubmit={HandleEdit}>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>  </Form.Label>
            <Form.Control
              ref={openImage}
              hidden
              multiple
              type='file'
              onChange={(e) => setlink([...e.target.files])} />
          </Form.Group>

          <div onClick={handleOpenImage}
            className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2  w-100 flex-column"
            style={{ border: "3px dashed crimson", cursor: 'pointer' }}>
            <FaCloudUploadAlt style={{ height: "12%", width: "12%", color: "crimson" }} />
            <p className="fw-bold" style={{ color: "crimson" }}>  Upload images</p>
          </div>

          <div className="d-flex align-items-left flex-column gap-2">
            {imageshow}
          </div>

          <div className="d-flex align-items-left flex-column gap-2">
            {imagesFromServershow}
          </div>


          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1" >

            <Form.Label style={{ fontWeight: '600', marginTop: "2%" }}>Name: </Form.Label>
            <Form.Control
              value={form.name}
              requird
              onChange={handlechange}
              name="name"
              type="text"
              placeholder="Name......." />
          </Form.Group>


          <Form.Group className="mb-3" controlId="description">

            <Form.Label style={{ fontWeight: '600', marginTop: "2%" }}>Role: </Form.Label>
            <Form.Control
              value={form.role}
              requird
              onChange={handlechange}
              name="role"
              type="text"
              placeholder="Role......" />

          </Form.Group>




          <button disabled={form.name.length > 1 ? false : true}
            className="btn btn-danger" type="submit" style={{ marginTop: '20px', marginBottom: '10px', height: '48px', fontWeight: '400', borderRadius: '12px' }}
          >
            Save

          </button>
        </Form>

      </div>
    </div>


  );
}



