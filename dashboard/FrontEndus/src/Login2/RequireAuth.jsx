import { Navigate ,Outlet } from "react-router-dom";
import Cookie from "cookie-universal";
// import ReactDOM from 'react-dom/client';
// import App from "../App";


export default function RequireAuth(){
    const cookie = Cookie();
    const token = cookie.get("jwt");
    // const root = ReactDOM.createRoot(
    //     document.getElementById('root')
    //   );
     return token ? <Outlet/> : <Navigate to={"/login"} replace={true} />
  
}