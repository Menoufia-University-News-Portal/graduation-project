
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Link } from 'react-router-dom';
import { FaPenToSquare } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';
import './FacultyTable.css'
import Sidebar from '../../Sidebar/Sidebar';
export default function FacultiesDemo() {
    const [Faculty, setFaculty] = useState([]);
    const [delete_faculty, setdelete_faculty,] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        faculty_id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },


    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/faculty/list');
                console.log('Permission Data:', response.data);
                const listOfFaculty = response.data;
                console.log(listOfFaculty);
                setFaculty(listOfFaculty);

            } catch (error) {
                console.error('Error fetching data of Faculty:', error);
            }


        };

        fetchData();
    }, [delete_faculty]);


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            
            <div className="first" >
                <h4 className="m-0">Faculties</h4>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const IDBodyTemplate = ({ data }) => {
        // Check if 'data' is defined before accessing 'name' property
        //const id = data?.admin_id || '';

        return (
            <div className="flex align-items-center gap-2">
                <span>{data.faculty_id}</span>
            </div>
        );
    };
    
   
   
    const NameBodyTemplate = ({ data }) => {
        // Check if 'data' is defined before accessing 'name' property
        //const name = data?.Name || '';

        return (
            <div className="flex align-items-center gap-2">
                <span>{data.name}</span>
            </div>
        );
    };

    async function handledelete(id) {

        Swal.fire({
            title: "Are you sure ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(`http://localhost:3001/faculty/delete/${id}`)
                     setdelete_faculty((prev) => !prev);
                } catch (err) {
                    console.log(err);
                }
                   
              Swal.fire({
                title: "Deleted!",
                text: "Faculty has been deleted.",
                icon: "success"
              });
            }
          });
        // try {
        //     const res = await axios.delete(`http://localhost:3001/faculty/delete/${id}`)
        //     console.log(res);
        //     setdelete_faculty((prev) => !prev);
        // } catch (err) {
        //     console.log(err);
        // }
    }


    const ActionBodyTemplate = ({ data }) => {

        return (
            <div className='d-flex align-items-center gap-2'>
                <Link to={`${data.faculty_id}`}>
                    {/* <FaPenToSquare style={{ fontSize: "25px", color: "green" }} /> */}
                    <button className="btn2"> Update
                 </button>
                </Link>

                <button  onClick={() => handledelete(data.faculty_id)} className="btn3"> Delete
                 </button>
                 {/* <FaTrash onClick={() => handledelete(data.faculty_id)} style={{ fontSize: "25px", color: 'crimson', cursor: 'pointer' }} /> */}
            </div> 
        );
    };

    const IDFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} />;
    };

    const header = renderHeader();

    return (
        <div  className="sidebar-right">
        <Sidebar/>

        <div>
            <Link to='/facultiesTable/add'>

                {/* <FaPlus style={{fontSize:"100px" , color:'crimson'}} /> */}
    <button class="cta">
    <span class="span"> Add </span>
    <span class="second">
      <svg width="50px" height="20px" viewBox="0 0 66 43" version="1.1" >
        <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
          <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
          <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
        </g>
      </svg>
    </span> 
</button>

            </Link>


            <div className="card">



                <DataTable
                    removableSort
                    value={Faculty}
                    paginator
                    header={header}
                    rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]}
                    dataKey="faculty_id"
                    selectionMode="checkbox"
                    selection={selectedFaculty}
                    onSelectionChange={(e) => setSelectedFaculty(e.value)}
                    filters={filters}
                    filterDisplay="menu"
                    globalFilterFields={['faculty_id', 'name']}
                    emptyMessage="No Faculties found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                >
                    <Column
                        field="faculty_id"
                        header="ID"
                        sortable
                        dataType="numeric"
                        style={{ minWidth: '12rem' }}
                        filter
                        body={(data) => <IDBodyTemplate data={data} />}
                        filterElement={IDFilterTemplate}
                    />
                    <Column
                        field="name"
                        header="Faculty Name"
                        sortable
                        filter
                        body={(data) => <NameBodyTemplate data={data} />}
                        filterPlaceholder="Search "
                        style={{ minWidth: '14rem' }}
                    />

                    <Column
                        
                        header="Action"
                       
                        body={(data) => <ActionBodyTemplate data={data} />}
                        
                        style={{ minWidth: '14rem' }}
                    />

                </DataTable>
            </div>
        </div>
        </div>
    );
}