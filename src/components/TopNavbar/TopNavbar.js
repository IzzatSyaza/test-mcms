import React from "react";
// import {CustomNavbar, CustomOffcanvas, Brand, MedIcon, LogButton, FlexNav} from "./TopNavBar.styles";
// import {Navbar, Nav, Offcanvas} from "react-bootstrap";
// import {NavLink} from "react-router-dom"
// import { AuthContext } from "../../helpers/AuthContext";
// import Axios from "axios";
// import { useHistory } from "react-router-dom";
import "./navbar.css"
import {MdOutlineLogout} from "react-icons/md";

function TopNavbar(props){
  // const { setAuthState } = useContext(AuthContext);
  // let history = useHistory();
  // Axios.defaults.withCredentials = true;

  // const logout = () => {
  //   Axios.post("http://localhost:3001/logout").then((response)=>{
  //     if(response.data.error){
  //       alert(response.data.error);
  //     }
  //     else{
  //       setAuthState({ 
  //         username: "",
  //         mcms_id: "",
  //         userType: "",
  //         status: false 
  //       });
  //       history.push("/login");
  //     }
  //   })
  // };
  
  
    return (
      <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">MCMS</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <MdOutlineLogout className="topAvatar" onClick={props.logout}/>
          </div>
        </div>
      </div>
    </div>
    );
    
}

export default TopNavbar;