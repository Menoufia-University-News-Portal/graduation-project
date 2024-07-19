import '../Events/AddEvents.css';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from "react-icons/fa";
import Select from 'react-select';
import Swal from 'sweetalert2';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import Sidebar from '../../Sidebar/Sidebar';


export default function AddEvent() {

  const [form, setform] = useState({
    title: "",
    description: "",
    faculties_ids: [],
  });
  const [facultiesOptions, setFacultiesOptions] = useState([]);
  const [error, setError] = useState(null);
  const [link, setlink] = useState([]);
  const [uploading, setuploading] = useState(0);
  const navigate = useNavigate();

  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  function handleOpenImage() {
    openImage.current.click();
  }

  const handleFacultyChange = (selectedOptions) => {
    const facultiesIds = selectedOptions.map(option => option.value);
    setform({ ...form, faculties_ids: facultiesIds });
  };

  async function HandleSubmit(e) {
    e.preventDefault();
    setError(null);

    if( !form.description || form.faculties_ids.length === 0 || !link[0] || !form.title){
      setError('Please, fill all the required field!');
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("title", form.title);
      formdata.append("description", form.description);
      formdata.append("faculties_ids[]", form.faculties_ids);
      for (let i = 0; i < link.length; i++) {
        formdata.append("link", link[i]);
      }
      const res2 = await axios.post("http://localhost:3001/event/add", formdata, {
        onUploadProgress: (ProgressEvent) => {
          const loaded = ProgressEvent.loaded;
          const total = ProgressEvent.total;
          setuploading(Math.floor((loaded * 100) / total));
        },
      });

      if (res2.data) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your Event has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/events');
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred while saving the event. Please try again.');
    }
  }

  function handlechange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  async function handleImageDelete(id, img) {
    // Handle delete image logic
  }

  const imageshow = link.map((img, key) => (
    <div key={key} className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-2">
          <img src={URL.createObjectURL(img)} style={{ width: "250PX" }} alt="Uploaded" />
          <div>
            <p className='mb-1'>{img.name}</p>
            <p>{img.size / 1024 < 900
              ? (img.size / 1024).toFixed(2) + "KB"
              : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <Button onClick={() => handleImageDelete(key, img)} variant="danger">Delete</Button>
      </div>
      <div className="custom-progress mt-3">
        <span percent={`${uploading}%`}
          style={{ width: `${uploading}%` }}
          className="inner-progress"></span>
      </div>
    </div>
  ));

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/faculty/list');
        const options = response.data.map(faculty => ({
          value: faculty.faculty_id,
          label: faculty.name
        }));
        setFacultiesOptions(options);
      } catch (error) {
        console.error('Error fetching faculties:', error);
      }
    };
    fetchFaculties();
  }, []);

  return (
    <div className="sidebar-right">
      <Sidebar />
      <div>
        <Form className='bg-white w-100 mx-2 p-5' style={{ marginTop: "40px" }} onSubmit={HandleSubmit}>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label></Form.Label>
            <Form.Control
              ref={openImage}
              hidden
              multiple
              type='file'
              onChange={(e) => setlink([...e.target.files])} />
          </Form.Group>
          <div onClick={handleOpenImage}
            className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column"
            style={{ border: "3px dashed crimson", cursor: 'pointer' }}>
            <FaCloudUploadAlt style={{ height: "12%", width: "12%", color: "crimson" }} />
            <p className="fw-bold" style={{ color: "crimson" }}>Upload images<span style={{ color: "red" }}>*</span></p>
          </div>

          <div className="d-flex align-items-left flex-column gap-2">
            {imageshow}
          </div>

          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ fontWeight: '600', marginTop: "2%" }}>Title:<span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              value={form.title}
              onChange={handlechange}
              name="title"
              type="text"
              placeholder="Title......." />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label style={{ fontWeight: '600', marginTop: "2%" }}>Description:<span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              value={form.description}
              onChange={handlechange}
              name="description"
              as="textarea"
              rows={5}
              placeholder="Description......" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600', marginTop: "2%" }}>Faculties:<span style={{ color: 'red' }}>*</span></Form.Label>
            <Select
              options={facultiesOptions}
              isMulti
              onChange={handleFacultyChange}
            />
          </Form.Group>

          <button className="button33">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Save Event</span>
          </button>
        </Form>
        {error && <div className="text-danger">{error}</div>}
        <br></br>
      </div>
    </div>
  );
}