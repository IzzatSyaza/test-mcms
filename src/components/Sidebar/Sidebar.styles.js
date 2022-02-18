import styled from 'styled-components';
import {MdLineStyle} from 'react-icons/md';


export const Sidebarr = styled.div`
    flex: 1;
    height: calc(100vh - 60px);
    background-color: black;
    position: sticky;
    top: 50px;
`;

export const SidebarWrapper = styled.div`
    padding: 20px;
    color: #555;
`;

export const SidebarMenu = styled.h3`
    margin-bottom: 10px;
`;

export const SidebarTitle = styled.div`
    font-size: 13px;
    color: rgb(187, 186, 186);
`;

export const SidebarList = styled.ul`
    list-style: none;
    padding: 5px;
    
`;

export const SidebarListItem = styled.li`
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;
    
`;

export const IconMdLineStyle = styled(MdLineStyle)`
    margin-right: 5px;
    font-size: 20px !important;
`;