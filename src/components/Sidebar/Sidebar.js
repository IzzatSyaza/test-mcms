import React, {useState} from "react";
import "./sidebar.css"
import { SidebarDataAdmin, SidebarDataClinic} from './SidebarData';
import SubMenu from './SubMenu';


function Sidebar(props) {

    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    const sideItem = (auth) => {
        if(auth.status && auth.userType === "ADMIN"){
                    return (
                <ul className="sidebarList">
                    {SidebarDataAdmin.map((item, index) => {
                        return <SubMenu item={item} key={index} />;
                    })}

                    {/* <Link to="/main" className="link">
                        <li className="sidebarListItem">
                            <MdHome className="sidebarIcon" />
                            Home
                        </li>
                    </Link> */}
                </ul>
                )
                }
                else if(auth.status && auth.userType === "CLINIC"){
                    return(
                <ul className="sidebarList">
                    {SidebarDataClinic.map((item, index) => {
                        return <SubMenu item={item} key={index} />;
                    })}
                </ul>
                    )
                }
                else {
                    return (
                        <ul>
                        </ul>
                    )
                }
    }
    return (
        <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            {sideItem(props.auth)}
        
        </div>
        </div>
        </div>
    );
}

export default Sidebar;

