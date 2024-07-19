import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import imgupdate from '../../../imgs/update33.png';
import Sidebar from '../../Sidebar/Sidebar';

export default function AdminUpdatePage() {
    const navigate = useNavigate();
    const { adminId } = useParams();
    const [formData, setFormData] = useState({
        name: null,
        email: null,
        permissions: [],
        faculties: [],
        status: null
    });

    const [permissionsOptions, setPermissionsOptions] = useState([]);
    const [facultiesOptions, setFacultiesOptions] = useState([]);
    const statusOptions = [
        { value: '1', label: 'Active' },
        { value: '0', label: 'Inactive' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/admin/${adminId}`);
                const adminData = response.data;
               
                console.log(adminData );

                const newFormData = {
                    name: adminData.name,
                    email: adminData.email,
                    permissions: adminData.permissions ? adminData.permissions.map(permissions => permissions.permission_id) : [],
                    faculties: adminData.faculties ? adminData.faculties.map(faculties => faculties.faculty_id) : [],
                    status: adminData.is_active.toString() 
                };
                
                setFormData(newFormData);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };
        fetchData();
    }, [adminId]);

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
                const response2 = await axios.get('http://localhost:3001/faculty/list');
                const options2 = response2.data.map(faculty => ({
                    value: faculty.faculty_id,
                    label: faculty.name
                }));
                setFacultiesOptions(options2);
            } catch (error) {
                console.error('Error fetching faculties:', error);
            }
        };

        fetchPermissions();
        fetchFaculties();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeofPermissions = (selectedOptions1) => {
        const newValue1 = selectedOptions1.map(option => option.value);
        setFormData({ ...formData, permissions: newValue1 });
    };
    const handleChangeofFaculties = (selectedOptions) => {
        const newValue = selectedOptions.map(option => option.value);
        setFormData({ ...formData, faculties: newValue });
    };

    const handleStatusChange = (selectedOption) => {
        setFormData({ ...formData, status: selectedOption.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!adminId) {
            console.error('Admin ID is undefined');
            return;
        }

        
        const filteredPermissionsIds = Array.isArray(formData.permissions) ? formData.permissions.filter(id => id !== null) : [];
        const filteredFacultiesIds = Array.isArray(formData.faculties) ? formData.faculties.filter(id => id !== null) : [];

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                permissions_ids: filteredPermissionsIds,
                faculties_ids: filteredFacultiesIds,
                is_active: formData.status === '1' 
            };

            const response = await axios.patch(`http://localhost:3001/admin/update/${adminId}`, payload);
            if (response.data !== 'This email is already exist') {
                alert('Updated successfully');
                navigate('/admins');
            } else {
                alert('This email is already used');
            }
        } catch (error) {
            console.error('Error updating admin:', error);
        }
    };

    return (
        <div  className="sidebar-right">
        <Sidebar/>
        <div>
            <img src={imgupdate} alt="Admin Update" style={{ width: '100%', marginBottom: '20px', height: '25%', marginLeft: '5%' }} />
            <div className="container mt-4">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" style={{fontWeight: '600'}}>Name:</label>
                        <input type="text" id="name" className="form-control" name="name" value={formData.name || ''} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{fontWeight: '600'}}>Email:</label>
                        <input type="email" id="email" className="form-control" name="email" value={formData.email || ''} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="permissions" className="form-label" style={{fontWeight: '600'}}>Permissions:</label>
                        <Select
                            options={permissionsOptions}
                            isMulti
                            value={permissionsOptions.filter(option => formData.permissions.includes(option.value))}
                            onChange={handleChangeofPermissions}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="faculties" className="form-label" style={{fontWeight: '600'}}>Faculties:</label>
                        <Select
                            options={facultiesOptions}
                            isMulti
                            value={facultiesOptions.filter(option => formData.faculties.includes(option.value))}
                            onChange={handleChangeofFaculties}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label" style={{fontWeight: '600'}}>Status:</label>
                        <Select
                            options={statusOptions}
                            value={statusOptions.find(option => option.value === formData.status)}
                            onChange={handleStatusChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-danger">Update</button>
                </form>
            </div>
        </div>
        </div>
    );
}
