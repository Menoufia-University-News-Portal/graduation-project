import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import updatepermission from '../../../imgs/4.png';
import Sidebar from '../../Sidebar/Sidebar';
import updateDepartment from '../../../imgs/update_department.png'

export default function UpdateDepartment() {
    const navigate = useNavigate();
    const { departmentId } = useParams();
    const [formData, setFormData] = useState({
        name: null,
        staff: []
    });

    const [staffOptions, setstaffOptions] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/department/${departmentId}`);
                const departmentData = response.data;
                console.log(departmentData)
                const newFormData = {
                    name: departmentData.name,
                    staff: departmentData.staff ? departmentData.staff.map(staff => staff.staff_id) : [],

                };

                setFormData(newFormData);
            } catch (error) {
                console.error('Error fetching department data:', error);
            }
        };
        fetchData();
    }, [departmentId]);


    useEffect(() => {
        const fetchstaff_ids = async () => {
            try {
                const response = await axios.get('http://localhost:3001/staff/list');
                const options = response.data.map(staff => ({
                    value: staff.staff_id,
                    label: staff.name
                }));
                setstaffOptions(options);
            } catch (error) {
                console.error('Error fetching department:', error);
            }
        };

        fetchstaff_ids();

    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeofstaff = (selectedOptions1) => {
        const newValue1 = selectedOptions1.map(option => option.value);
        setFormData({ ...formData, staff: newValue1 });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!departmentId) {
            console.error('department ID is undefined');
            return;
        }


        const filteredstaffIds = Array.isArray(formData.staff) ? formData.staff.filter(id => id !== null) : [];


        try {
            const load1 = {
                name: formData.name,
                staff: filteredstaffIds
            };
            const response = await axios.patch(`http://localhost:3001/department/update/${departmentId}`, load1);

            if (response.data !== 'This department is already exist') {
                alert('Updated successfully');
                navigate('/department');
            } else {
                alert('This department is already used');
            }
        } catch (error) {
            console.error('Error updating department:', error);
        }
    };


    return (
        <div className="sidebar-right">
            <Sidebar />
            <div> <img src={updateDepartment} alt="new Admin" style={{ width: '100%', marginBottom: '20px', height: '23%', marginLeft: '5%' }} />
                <div>
                    {/* //      <img src={updatepermission} alt="new Admin" style={{ width: '100%', marginBottom: '20px', height: '23%', marginLeft: '5%' }} /> */}
                    <div className="container mt-4">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label" style={{ fontWeight: '600' }}>Name:</label>
                                <input type="text" id="name" className="form-control" name="name" value={formData.name || ''} onChange={(e) => handleChange(e)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="staff_ids" className="form-label" style={{ fontWeight: '600' }}>Staff:</label>
                                <Select
                                    options={staffOptions}
                                    isMulti
                                    value={staffOptions.filter(option => formData.staff.includes(option.value))}
                                    onChange={handleChangeofstaff}
                                />
                            </div>
                            <button type="submit" className="btn btn-danger">Update Department</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}