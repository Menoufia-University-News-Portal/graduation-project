import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import imgupdate from '../../../imgs/update33.png';
import Sidebar from '../../Sidebar/Sidebar';
import updatestaff from '../../../imgs/update_staff.png'

export default function UpdateStaff() {
    const navigate = useNavigate();
    const { staffId } = useParams();
    const [formData, setFormData] = useState({
        name: null,
        role: null,

    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/staff/${staffId}`);
                const adminData = response.data;

                const newFormData = {
                    name: adminData.name,
                    role: adminData.role,
                };

                setFormData(newFormData);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };
        fetchData();
    }, [staffId]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!staffId) {
            console.error('staff ID is undefined');
            return;
        }



        try {
            const payload = {
                name: formData.name,
                role: formData.role,

            };

            const response = await axios.patch(`http://localhost:3001/staff/update/${staffId}`, payload);
            if (response.data !== 'This staff is already exist') {
                alert('Updated successfully');
                navigate('/staff');
            } else {
                alert('This staffis already used');
            }
        } catch (error) {
            console.error('Error updating staff:', error);
        }
    };

    return (
        <div className="sidebar-right">
            <Sidebar />
            <div> <img src={updatestaff} alt="new Admin" style={{ width: '100%', marginBottom: '20px', height: '23%', marginLeft: '5%' }} />
                <div>

                    <div className="container mt-4">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label" style={{ fontWeight: '600' }}>Name:</label>
                                <input type="text" id="name" className="form-control" name="name" value={formData.name || ''} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label" style={{ fontWeight: '600' }}>Role:</label>
                                <input type="text" id="role" className="form-control" name="role" value={formData.role || ''} onChange={(e) => handleChange(e)} />
                            </div>


                            <button type="submit" className="btn btn-danger">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
