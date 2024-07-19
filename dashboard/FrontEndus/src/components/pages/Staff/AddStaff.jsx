import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import imgaddadmin from '../../../imgs/newAdmmin.png';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import createstaff from '../../../imgs/create_staff.png';

const AddStaff = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    name: '',
    role: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!staff.name || !staff.role) {
      setError('Please fill all the required fields!');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/staff/add', staff);
      console.log('Staff created:', res.data);
      if (res.data) {
        alert('Staff Created Successfully');
        navigate('/staff');
      }
    } catch (error) {
      console.error('Error creating staff:', error);
      setError(error.message || 'An error occurred while creating the staff.');
      alert('Error Creating staff');
    }
  };




  return (

    <div className="sidebar-right">
      <Sidebar />
      <div> <img src={createstaff} alt="new Admin" style={{ width: '100%', marginBottom: '20px', height: '23%', marginLeft: '5%' }} />
        <div className="container mt-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}> Name:<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter The Staff Name" value={staff.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
              <Form.Label style={{ fontWeight: '600' }}> Role:<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control type="text" name="role" placeholder="Enter The Staff Role" value={staff.role} onChange={handleInputChange} />
            </Form.Group>


            <Button className="btn btn-danger" type="submit" style={{ marginTop: '20px', marginBottom: '10px', height: '48px', fontWeight: '400', borderRadius: '12px' }}>Add Staff </Button>
          </Form>
          {error && <div className="text-danger">{error}</div>}
        </div>
      </div></div>

  );
};

export default AddStaff;
