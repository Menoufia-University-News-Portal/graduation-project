import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import update from '../../../imgs/3.png';
import '../FacultyTable/UpdateFaculty.css';
import Sidebar from '../../Sidebar/Sidebar';



export default function UpdateFaculty() {
    const navigate = useNavigate();
    const { facultyId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        dean_name: '',
        admins: [],
        departments: [],
        staff: []
    });
    console.log(formData);
    const [departmentOptions, setdepartmentOptions] = useState([]);
    const [staffOptions, setstaffOptions] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/faculty/${facultyId}`);
                const facultyData = response.data;
                const newFormData = {
                    name: facultyData.name,
                    dean_name: facultyData.dean_name,
                    admins: facultyData.admins ? facultyData.admins.map(admins => admins.admin_id) : [],
                    departments: facultyData.departments ? facultyData.departments.map(departments => departments.department_id) : [],
                    staff: facultyData.staff ? facultyData.staff.map(staff => staff.staff_id) : [],

                };
                setFormData(newFormData);
            } catch (error) {
                console.error('Error fetching faculty data:', error);
            }
        };
        fetchData();
    }, [facultyId]);



    useEffect(() => {
        const fetchdepartment = async () => {
            try {
                const response = await axios.get('http://localhost:3001/department/list');
                const options = response.data.map(departments => ({
                    value: departments.department_id,
                    label: departments.name
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

        fetchstaff();
        fetchdepartment();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeofdepartment = (selectedOptions1) => {
        const newValue1 = selectedOptions1.map(option => option.value);
        setFormData({ ...formData, departments: newValue1 });
    };
    const handleChangeofstaff = (selectedOptions) => {
        const newValue = selectedOptions.map(option => option.value);
        setFormData({ ...formData, staff: newValue });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!facultyId) {
            console.error('  faculty ID is undefined');
            return;
        }


        const filtereddepartment = Array.isArray(formData.departments) ? formData.departments.filter(id => id !== null) : [];
        const filteredStaff = Array.isArray(formData.staff) ? formData.staff.filter(id => id !== null) : [];


        console.log(filtereddepartment);
        console.log(filteredStaff);
        console.log(formData.dean_name);
        console.log(formData.name)
        try {
            const load2 = {
                name: formData.name,
                dean_name: formData.dean_name,
                departments: filtereddepartment,
                staff: filteredStaff,
            };

            const response = await axios.patch(`http://localhost:3001/faculty/update/${facultyId}`, load2);
            console.log("response", response)
            if (response.data !== 'This faculty is already exist') {
                alert('Updated successfully');
                navigate('/facultiesTable');
            } else {
                alert('This faculty is already used');
            }
        } catch (error) {
            console.error('Error updating faculty:', error);
        }
    };

    return (
        <div className='sidebar-right'>
            <Sidebar />
            <div>
                <img src={update} alt="new Admin" style={{ width: '100%', marginBottom: '20px', height: '23%', marginLeft: '5%' }} />
                <div className="container mt-4">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label" style={{ fontWeight: '600' }}>Name:</label>
                            <input type="text" id="name" className="form-control" name="name" value={formData.name || ''} onChange={(e) => handleChange(e)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dean_name" className="form-label" style={{ fontWeight: '600' }}>Dean Name:</label>
                            <input type="text" id="dean_name" className="form-control" name="dean_name" value={formData.dean_name || ''} onChange={(e) => handleChange(e)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="departments" className="form-label" style={{ fontWeight: '600' }}>Departments:</label>
                            <Select
                                options={departmentOptions}
                                isMulti
                                value={departmentOptions.filter(option => formData.departments.includes(option.value))}
                                onChange={handleChangeofdepartment}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="staff" className="form-label" style={{ fontWeight: '600' }}>Staff:</label>
                            <Select
                                options={staffOptions}
                                isMulti
                                value={staffOptions.filter(option => formData.staff.includes(option.value))}
                                onChange={handleChangeofstaff}
                            />
                        </div>
                        <button type="submit" className="btn btn-danger">Update Faculty</button>
                    </form>
                </div>
            </div>
        </div>
    )
}