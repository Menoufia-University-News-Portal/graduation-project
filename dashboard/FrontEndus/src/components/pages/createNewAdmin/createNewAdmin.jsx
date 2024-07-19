import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import imgaddadmin from '../../../imgs/newAdmmin.png';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';

const CreateNewAdmin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    password: '',
    permissions_ids: [],
    faculties_ids: [],
    is_active: true,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [permissionsOptions, setPermissionsOptions] = useState([]);
  const [facultiesOptions, setFacultiesOptions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handlePermissionChange = (selectedOptions) => {
    const permissionsIds = selectedOptions.map(option => option.value);
    setAdmin({ ...admin, permissions_ids: permissionsIds });
  };

  const handleFacultyChange = (selectedOptions) => {
    const facultiesIds = selectedOptions.map(option => option.value);
    setAdmin({ ...admin, faculties_ids: facultiesIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admin.name && !admin.email && !admin.password) {
      setError('Please fill in all required fields.');
      return;
    }
    else if (!admin.name) {
      setError('Please fill the Name field !');
      return;
    }
    else if (!admin.email) {
      setError('Please fill the Email field !');
      return;
    }
    else if (!admin.password) {
      setError('Please fill the password field !');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/admin/add', admin);
      console.log('Admin created:', response.data);
      if(response.data){
        alert('Admin Created Successfully');
        navigate('/admins');
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      setError(error.message || 'An error occurred while creating the admin.');
      alert('Error Creating Admin');
    }
  };

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/permission/list');
        const options = response.data.map(permission => ({
          value: permission.permission_id,
          label: permission.type
        }));
        setPermissionsOptions(options);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

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

    fetchPermissions();
    fetchFaculties();
  }, []);
  

  return (
    <div  className="sidebar-right">
    <Sidebar/>
    <div> <img src={imgaddadmin} alt="new Admin" style={{ width: '100%', marginBottom: '20px', height: '23%', marginLeft: '5%' }} />
     
      <div className="container mt-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600' }}>Name:<span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter The Admin Name" value={admin.name} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3 mt-3">
            <Form.Label style={{ fontWeight: '600' }}>Email:<span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control type="text" name="email" placeholder="Enter The Admin Email" value={admin.email} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600' }}>Password:<span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter The Admin Password" value={admin.password} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600' }}>Permissions:</Form.Label>
            <Select
              options={permissionsOptions}
              isMulti
              onChange={handlePermissionChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600' }}>Faculties:</Form.Label>
            <Select
              options={facultiesOptions}
              isMulti
              onChange={handleFacultyChange}
            />
          </Form.Group>
          <Button className="btn btn-danger" type="submit" style={{ marginTop: '20px', marginBottom: '10px', height: '48px', fontWeight: '400', borderRadius: '12px' }}>Add Admin To DataBase</Button>
        </Form>
        {error && <div className="text-danger">{error}</div>}
      </div>
    </div>
    </div>
  );
};

export default CreateNewAdmin;
