import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import "./sidebar.css"


const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background-color: rgb(243, 243, 255);
  padding: 0.8rem 0 0.8rem 2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  border-radius: 8px;


  &:hover {
    background-color: rgb(225, 225, 255);
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

return (
    <>
    {item.subNav ?
        <li className="sidebarListItem" onClick={item.subNav && showSubnav}>
            <div className="sidebarIcon">
                {item.icon}
            </div>
            {item.title}
            <div className="iconArrow">
                {item.subNav && subnav
                ? item.iconOpened
                : item.subNav
                ? item.iconClosed
                : null}
            </div>
        </li> : 
    <Link to={item.path} className="link">
        <li className="sidebarListItem" onClick={item.subNav && showSubnav}>
            <div className="sidebarIcon">
                {item.icon}
            </div>
            {item.title}
            <div className="iconArrow">
                {item.subNav && subnav
                ? item.iconOpened
                : item.subNav
                ? item.iconClosed
                : null}
            </div>
        </li>
    </Link>}
    
        {subnav &&
            item.subNav.map((item, index) => {
            return (
            <DropdownLink to={item.path} key={index}>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
        );
        })}
    </>
);
};

export default SubMenu;
