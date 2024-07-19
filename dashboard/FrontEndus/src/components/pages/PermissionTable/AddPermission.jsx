
import axios from "axios";
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import imgapermission from '../../../imgs/22.png';
import Sidebar from "../../Sidebar/Sidebar";

export default function AddPermission() {
  const [permission, setpermission] = useState({
    type: '',
    admins_ids: []
  });

  const [adminOptions, setadminOptions] = useState([]);

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setpermission({ ...permission, [name]: value });
  };



  const navigate = useNavigate();
  const handleadminidChange = (selectedOptions) => {
    const admins_ids = selectedOptions.map(option => option.value);
    setpermission({ ...permission, admins_ids: admins_ids });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!permission.type && !permission.admins_ids) {
      setError('Please fill in type & admins_ids  required fields.');
      return;
    }
    else if (!permission.type) {
      setError('Please fill the type field !');
      return;
    }
    else if (!permission.admins_ids) {
      setError('Please fill the admins_ids field !');
      return;
    }


    try {
      const response = await axios.post('http://localhost:3001/permission/add', permission);
      console.log('permission created:', response.data);
      if (response.data) {

        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your Permisssion has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/permissionsTable');
      }
    } catch (error) {
      console.error('Error creating permission:', error);
      setError(error.message || 'An error occurred while creating the permission.');
      alert('Error Creating permission');
    }
  };

  useEffect(() => {
    const fetchadmins_ids = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/list');
        const options = response.data.map(admin => ({
          value: admin.admin_id,
          label: admin.name
        }));
        setadminOptions(options);
      } catch (error) {
        console.error('Error fetching permission:', error);
      }
    };

    fetchadmins_ids();

  }, []);


  return (
    <div className="sidebar-right">
      <Sidebar />
      <div>

        {/* display: block;
  width: 100%;
  object-fit: cover; */}
        <img src={imgapermission} alt="new Admin" style={{ width: '100%', marginBottom: '20px', height: '23%', marginLeft: '5%', display: "block", objectFit: "cover", borderImage: "inherit" }} />
        <div className="container mt-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}>Type:<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control type="type" name="type" placeholder="Enter The permission type" value={permission.type} onChange={handleInputChange} />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}>Admins:</Form.Label>
              <Select
                options={adminOptions}
                isMulti
                onChange={handleadminidChange}
              />
            </Form.Group>



            <Button className="btn btn-danger" type="submit" style={{ marginTop: '20px', marginBottom: '10px', height: '48px', fontWeight: '400', borderRadius: '12px' }}>Add Permission </Button>
          </Form>
          {error && <div className="text-danger">{error}</div>}
        </div>
      </div>
    </div>

  )
}