import "../Events/AddEvents.css";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Sidebar from "../../Sidebar/Sidebar";

export default function AddUniLeader() {
  const [form, setform] = useState({
    name: "",
    role: "",
  });

  const [link, setlink] = useState([]);
  const [uploading, setuploading] = useState(0);
  const [error, setError] = useState(null);
  console.log(uploading);

  //Ref
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  function handleOpenImage() {
    openImage.current.click();
  }

  console.log(link);

  async function HandleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.role || !link[0]) {
      setError("Please, fill all the required fields!");
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("name", form.name);
      formdata.append("role", form.role);
      for (let i = 0; i < link.length; i++) {
        formdata.append("link", link[i]);
      }
      let res = await axios.post(
        "http://localhost:3001/uni-leader/add",
        formdata,

        {
          onUploadProgress: (ProgressEvent) => {
            const loaded = ProgressEvent.loaded;
            const total = ProgressEvent.total;
            setuploading(Math.floor((loaded * 100) / total));
          },
        }
      );

      if (res.data) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your uni_leader has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      navigate("/Uni_leadear");

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  function handlechange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  const navigate = useNavigate();

  // Handle Delete Image
  async function handleImageDelete(id, img) { }

  //mapping showing picture

  const imageshow = link.map((img, key) => (
    <div className=" border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-2 ">
          <img src={URL.createObjectURL(img)} style={{ width: "250PX" }}></img>
          <div>
            <p className="mb-1">{img.name}</p>
            <p>
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + "KB"
                : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <Button onClick={() => handleImageDelete(key, img)} variant="danger">
          {" "}
          Delete{" "}
        </Button>
      </div>
      <div className="custom-progress mt-3">
        <span
          percent={`${uploading}%`}
          style={{ width: `${uploading}%` }}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));

  return (
    <div className="sidebar-right">
      <Sidebar />

      <div>
        <Form
          className="bg-white w-100 mx-2 p-5"
          style={{ marginTop: "40px" }}
          onSubmit={HandleSubmit}
        >
          <Form.Group className="mb-3" controlId="image">
            <Form.Label> </Form.Label>
            <Form.Control
              ref={openImage}
              hidden
              multiple
              type="file"
              onChange={(e) => setlink([...e.target.files])}
            />
          </Form.Group>
          <div
            onClick={handleOpenImage}
            className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2  w-100 flex-column"
            style={{ border: "3px dashed crimson", cursor: "pointer" }}
          >
            <FaCloudUploadAlt
              style={{ height: "12%", width: "12%", color: "crimson" }}
            />
            <p className="fw-bold" style={{ color: "crimson" }}>
              {" "}
              Upload images<span style={{ color: "red" }}>*</span>
            </p>
          </div>

          <div className="d-flex align-items-left flex-column gap-2">
            {imageshow}
          </div>

          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ fontWeight: "600", marginTop: "2%" }}>
              Name:<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              value={form.name}
              requird
              onChange={handlechange}
              name="name"
              type="text"
              placeholder="Name......."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="role">
            <Form.Label style={{ fontWeight: "600", marginTop: "2%" }}>
              Role:<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              value={form.role}
              requird
              onChange={handlechange}
              name="role"
              type="text"
              placeholder="Role......"
            />
          </Form.Group>
          <button className="button33">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>

            <span className="text">Save </span>
          </button>
        </Form>
        {error && <div className="text-danger">{error}</div>}
      </div>
    </div>
  );
}
