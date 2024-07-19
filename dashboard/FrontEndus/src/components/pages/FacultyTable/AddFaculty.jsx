
import axios from "axios";
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import imgafaculty from '../../../imgs/1.png';
import Select from 'react-select';
import '../FacultyTable/AddFaculty.css';
import Sidebar from "../../Sidebar/Sidebar";


export default function AddFaculty() {
  const [faculty, setfaculty] = useState({
    name: '',
    dean_name: '',
    admins_ids: [],
    departments: [],
    staff: []
  });



  const [error, setError] = useState(null);
  const [departmentOptions, setdepartmentOptions] = useState([]);
  const [staffOptions, setstaffOptions] = useState([]);
  const [adminOptions, setadminOptions] = useState([]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setfaculty({ ...faculty, [name]: value });
  };



  const navigate = useNavigate();



  const handledepartmentChange = (selectedOptions) => {
    const departments = selectedOptions.map(option => option.value);
    setfaculty({ ...faculty, departments: departments });
  };


  const handlestaffChange = (selectedOptions) => {
    const staff = selectedOptions.map(option => option.value);
    setfaculty({ ...faculty, staff: staff });
  };


  const handleadminidChange = (selectedOptions) => {
    const admins_ids = selectedOptions.map(option => option.value);
    setfaculty({ ...faculty, admins_ids: admins_ids });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!faculty.name || !faculty.dean_name) {
      setError('Please, fill all the required fields!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/faculty/add', faculty);
      console.log('faculty created:', response.data);
      if (response.data) {

        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Faculty Created Successfully",
          showConfirmButton: false,
          timer: 1500
        });

        navigate('/facultiesTable');

      }
    } catch (error) {
      console.error('Error creating faculty:', error);
      setError(error.message || 'An error occurred while creating the admin.');
      alert('Error Creating faculty');
    }
  };


  useEffect(() => {
    const fetchdepartment = async () => {
      try {
        const response = await axios.get('http://localhost:3001/department/list');
        const options = response.data.map(department => ({
          value: department.department_id,
          label: department.name
        }));
        setdepartmentOptions(options);
      } catch (error) {
        console.error('Error fetching department:', error);
      }
    };

    const fetchstaff = async () => {
      try {
        const response = await axios.get('http://localhost:3001/staff/list');
        const options = response.data.map(staff => ({
          value: staff.staff_id,
          label: staff.name
        }));
        setstaffOptions(options);
      } catch (error) {
        console.error('Error fetching faculties:', error);
      }
    };

    const fetchadmins_ids = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/list');
        const options = response.data.map(admin => ({
          value: admin.admin_id,
          label: admin.name
        }));
        setadminOptions(options);
      } catch (error) {
        console.error('Error fetching faculties:', error);
      }
    };

    fetchadmins_ids();
    fetchstaff();
    fetchdepartment();
  }, []);




  return (


    <div className="sidebar-right">
      <Sidebar />
      <div>
        <img src={imgafaculty} alt="new Admin" style={{ width: '100%', marginBottom: '20px', height: '23%', marginLeft: '5%' }} />
        <div className="container mt-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}>Name:<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control type="name" name="name" placeholder="Enter The Faculty Name" value={faculty.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
              <Form.Label style={{ fontWeight: '600' }}>Dean Name:<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control type="dean_name" name="dean_name" placeholder="Enter The Dean Name" value={faculty.dean_name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}>Departments:</Form.Label>
              <Select
                options={departmentOptions}
                isMulti
                onChange={handledepartmentChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}>Staff:</Form.Label>
              <Select
                options={staffOptions}
                isMulti
                onChange={handlestaffChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600' }}>Admins:</Form.Label>
              <Select
                options={adminOptions}
                isMulti
                onChange={handleadminidChange}
              />
            </Form.Group>

            <Button className="btn btn-danger" type="submit" style={{ marginTop: '20px', marginBottom: '10px', height: '48px', fontWeight: '400', borderRadius: '12px' }}>Add Faculty </Button>
          </Form>
          {error && <div className="text-danger">{error}</div>}
        </div>
      </div>
    </div>


  );
}