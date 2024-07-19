import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import imgaddadmin from '../../../imgs/newAdmmin.png';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import Swal from 'sweetalert2';
import createDepartment from '../../../imgs/create_department.png'

const AddDepartment = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    name: '',
    staff: []
  });


  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [staffOptions, setstaffOptions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleStaffChange = (selectedOptions) => {
    const staffIds = selectedOptions.map(option => option.value);
    setDepartment({ ...department, staff: staffIds });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!department.name) {
      setError('Please, fill all the requird fields!');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/department/add', department);
      console.log('department created:', res.data);
      if (res.data) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "department Created Successfully",
          showConfirmButton: false,
          timer: 1500
        });

        navigate('/department');
      }
    } catch (error) {
      console.error('Error creating department:', error);
      setError(error.message || 'An error occurred while creating the staff.');
      alert('Error Creating department');
    }
  };


  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:3001/staff/list');
        const options = response.data.map(staff => ({
          value: staff.staff_id,
          label: staff.name
        }));
        setstaffOptions(options);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };


    fetchStaff();

  }, []);



  return (
    <div className="sidebar-right">
      <Sidebar />
      <div> <img src={createDepartment} alt="new Admin" style={{ width: '100%', marginBottom: '20px', height: '23%', marginLeft: '5%' }} />

        <div className="container mt-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}> Name:<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter The Department Name" value={department.name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}>Staff:</Form.Label>
              <Select
                options={staffOptions}
                isMulti
                onChange={handleStaffChange}
              />
            </Form.Group>

            <Button className="btn btn-danger" type="submit" style={{ marginTop: '20px', marginBottom: '10px', height: '48px', fontWeight: '400', borderRadius: '12px' }}>Add Department </Button>
          </Form>
          {error && <div className="text-danger">{error}</div>}
        </div>
      </div>
    </div>

  );
};

export default AddDepartment;
