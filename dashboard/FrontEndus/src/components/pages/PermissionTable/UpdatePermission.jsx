import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import updatepermission from '../../../imgs/4.png';
import Sidebar from '../../Sidebar/Sidebar';

export default function UpdatePermission() {
    const navigate = useNavigate();
    const { permissionId } = useParams();
    const [formData, setFormData] = useState({
        type: null,
        admins: []
    });

    const [adminOptions, setadminOptions] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/permission/${permissionId}`);
                const PermissionData = response.data;
                console.log(PermissionData)
                const newFormData = {
                    type: PermissionData.type,
                    admins: PermissionData.admins ? PermissionData.admins.map(admins => admins.admin_id) : [],

                };

                setFormData(newFormData);
            } catch (error) {
                console.error('Error fetching permission data:', error);
            }
        };
        fetchData();
    }, [permissionId]);


    useEffect(() => {
        const fetchadmins_ids = async () => {
            try {
                const response = await axios.get('http://localhost:3001/admin/list');
                console.log(response);
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeofadminid = (selectedOptions1) => {
        const newValue1 = selectedOptions1.map(option => option.value);
        setFormData({ ...formData, admins: newValue1 });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!permissionId) {
            console.error('permission ID is undefined');
            return;
        }


        const filteredadminIds = Array.isArray(formData.admins) ? formData.admins.filter(id => id !== null) : [];


        try {
            const payload = {
                type: formData.type,
                admins_ids: filteredadminIds

            };
            const response = await axios.patch(`http://localhost:3001/permission/update/${permissionId}`, payload);
            if (response.data !== 'This permission is already exist') {
                alert('Updated successfully');
                navigate('/permissionsTable');
            } else {
                alert('This permission is already used');
            }
        } catch (error) {
            console.error('Error updating Permission:', error);
        }
    };


    return (
        <div className="sidebar-right">
            <Sidebar />
            <div>

                <img src={updatepermission} alt="new Admin" style={{ width: '100%', marginBottom: '20px', height: '23%', marginLeft: '5%' }} />
                <div className="container mt-4">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label" style={{ fontWeight: '600' }}>Type:</label>
                            <input type="text" id="type" className="form-control" name="type" value={formData.type || ''} onChange={(e) => handleChange(e)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dmins_ids" className="form-label" style={{ fontWeight: '600' }}>Admins:</label>
                            <Select
                                options={adminOptions}
                                isMulti
                                value={adminOptions.filter(option => formData.admins.includes(option.value))}
                                onChange={handleChangeofadminid}
                            />
                        </div>
                        <button type="submit" className="btn btn-danger">Update Permission</button>
                    </form>
                </div>
            </div>
        </div>
    )
}