import styled from 'styled-components';
import {Navbar, NavDropdown, Button} from 'react-bootstrap';
import {FaClinicMedical } from 'react-icons/fa';

export const CustomNavbar = styled(Navbar)`
    background-color: #0061A8;
    width: 100%;
    height: 60px;
    position: sticky;
    top: 0;
    z-index: 999;
`;
export const FlexNav = styled.div`
    width: 100%;
    display: flex;
`;

export const CustomOffcanvas = styled(Navbar.Offcanvas)`
    background-color: #8AB6D6;
    width: 271px;
`;

export const Brand = styled(Navbar.Brand)`
    background-color: #0061A8;
    font-family: "Montserrat-Black";
    font-size: 1.5rem;
`;


export const MedIcon = styled(FaClinicMedical)`
    font-family: "Montserrat-Black";
    font-size: 1.5rem;
    margin: 0 3px 7px;
    
`;

export const LogButton = styled(Button)`

`;

export const FlexDiv1 = styled.div`
    flex: 5%;
`;

export const FlexDiv2 = styled.div`
    flex: 5%;
`;

export const FlexDiv3 = styled.div`
    flex: 5%;
`;

