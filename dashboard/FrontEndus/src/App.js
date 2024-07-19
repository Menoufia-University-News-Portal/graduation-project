// here................
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

import Dashboard from './components/pages/Dashboard/Dashboard';
import WebsiteView from './components/pages/WebsiteView';
import Setting from './components/pages/Setting/Setting';
import AdminsDemo from './components/Primetable/Primetable';
import CreateNewAdmin from './components/pages/createNewAdmin/createNewAdmin';
//import Adminpage from './components/Adminpage/Adminpage';
//import AdminsDemo from './components/Primetable/Primetable';
//import AdminsDemo from './components/Primetable/Primetable';
//import BasicTable from './components/Table/Table';
//import Admins from './components/pages/Admins';
//import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './theme/theme';
import Login2 from './Login2/Login2';

import News from './components/pages/News/News';
import Events from './components/pages/Events/Events';

import PermissionDemo from './components/pages/PermissionTable/PermissionTable';
import FacultiesDemo from './components/pages/FacultyTable/FacultyTable';
import AdminUpdatePage from './components/pages/AdminUpdatePage/adminUpdate';
import MyProfile from './components/pages/Setting/MyProfile';
import UpdateNews from './components/pages/News/UpdateNews';
import AddNews from './components/pages/News/AddNews';
import UpdateEvents from './components/pages/Events/UpdateEvents';
import AddEvents from './components/pages/Events/AddEvents';
import AddFaculty from './components/pages/FacultyTable/AddFaculty';
import AddPermission from './components/pages/PermissionTable/AddPermission';
import UpdatePermission from './components/pages/PermissionTable/UpdatePermission';
import UpdateFaculty from './components/pages/FacultyTable/UpdateFaculty';
import Department from './components/pages/Department/Department';
import Staff from './components/pages/Staff/Staff'
import AddStaff from './components/pages/Staff/AddStaff';
import AddDepartment from './components/pages/Department/AddDepartment';
import UpdateStaff from './components/pages/Staff/UpdateStaff';
import UpdateDepartment from './components/pages/Department/UpdateDepartment';
import DragDropImageUploader from './components/pages/News/DragDropImageUploader';
import RequireAuth from './Login2/RequireAuth';
import Sidebar2 from './components/Sidebar2';
import ComersNews from './components/pages/ComersNews/ComersNews';
import ComersAdd from './components/pages/ComersNews/ComersAdd';
import SectorHeadNews from './components/pages/SectorHead/SectorHeadNews';
import SectorAdd from './components/pages/SectorHead/SectorAdd';
import Unileader from './components/pages/Uni_Leader/UniLeader';
import AddUniLeader from './components/pages/Uni_Leader/AddUniLeader';
import UpdateUniLeader from './components/pages/Uni_Leader/UpdateUniLeader';
import Gallary from './components/pages/Gallary/Gallary';
import AddGallary from './components/pages/Gallary/AddGallary';
import UpdateGallary from './components/pages/Gallary/UpdateGallary';
import ComersNewsUpdate from './components/pages/ComersNews/ComersNewsUpdate';
import SectorHeadUpdate from './components/pages/SectorHead/SectorHeadUpdate';
import Forgetpass1 from './ForgetPassword 2/Forgetpass1';
import Forgetpass2 from './ForgetPassword 2/Forgetpass2';


function App() {
  
  return (
    
    <div className="AppGlass">
      <ThemeProvider>
      <BrowserRouter>
        {/* <Sidebar/>    */}
       
        <Routes>
         <Route path="/" element={<Login2 />} />
         <Route path="/forgetpassword" element={<Forgetpass1 />} /> 
          <Route path="/resetpassword/:token" element={<Forgetpass2 />} /> 
          <Route element={<RequireAuth />}>
        
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admins" element={<AdminsDemo />} />
          <Route path="/website" element={<WebsiteView />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/createNewAdmin" element={<CreateNewAdmin />} />
          <Route path="/permissionsTable" element={<PermissionDemo />} />
          <Route path="/facultiesTable" element={<FacultiesDemo />} />
          <Route path="/updatePage/:adminId"  element={<AdminUpdatePage/>}  />
          <Route path="/setting/my_profile"  element={<MyProfile/>}  />
          <Route path="/news/:id" element={<UpdateNews />} />
          <Route path="/news/add" element={<AddNews />} />
          <Route path="/events/:id" element={<UpdateEvents />} />
          <Route path="/events/add" element={<AddEvents />} />
          <Route path="/facultiesTable/add" element={<AddFaculty />} />
          <Route path="/permissionsTable/add" element={<AddPermission />} />
          <Route path="/permissionsTable/:permissionId" element={<UpdatePermission/>} />
          <Route path="/facultiesTable/:facultyId" element={<UpdateFaculty/>} />
          <Route path="/department" element={<Department/>} />
          <Route path="/Staff" element={<Staff/>} />
          <Route path="/Staff/add"  element={<AddStaff />} />
          <Route path="/department/add"  element={<AddDepartment />} />
          <Route path="/Staff/:staffId" element={<UpdateStaff/>} />
          <Route path="/department/:departmentId" element={<UpdateDepartment/>} />
          <Route path="/drag" element={<DragDropImageUploader/>} />
          <Route path="/sidebar2" element={<Sidebar2/>} />
          <Route path="/comersnews" element={<ComersNews />} />
          <Route path="/comers/add" element={<ComersAdd />} />
          <Route path="/comersnews/:comers_news_id" element={<ComersNewsUpdate/>} />
          <Route path="/sectorhead" element={< SectorHeadNews/>} />
          <Route path="/sectorhead/add" element={<SectorAdd/>} />
          <Route path="/sectorhead/:id" element={<SectorHeadUpdate/>} />
          <Route path="/Uni_leadear" element={<Unileader/>} />
          <Route path="/Uni_leadear/add" element={< AddUniLeader/>} />
          <Route path="/Uni_leadear/:id" element={<UpdateUniLeader/>} />
          <Route path="/gallary" element={<Gallary/>} />
          <Route path="/gallary/add" element={< AddGallary/>} />
          <Route path="/gallary/:id" element={<UpdateGallary/>} />
          
         


          </Route>
        </Routes>
        
      
    </BrowserRouter> 
    
    </ThemeProvider> 
     
    </div>
  );
}

export default App;
/**return (
    <div className='Tableformat'>
        

<DataTable value={data} tableStyle={{ minWidth: '50rem' }}  >
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="permission" header="Permission"></Column>
                <Column field="status" header="status"></Column>
            </DataTable>



    </div>
  ) */