import React, {useContext, useEffect} from "react";
import {ImageContainer, HomeButton, HomeH1, HomeH4, LoginIcon} from "./HomePage.styles"
import {NavLink, useHistory} from "react-router-dom"
import { AuthContext } from "../../helpers/AuthContext";


function HomePage({auth}) {
    // const { auth } = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        if(auth.status && auth.userType === "ADMIN") {
            history.push("/main");
        }
        else if(auth.status && auth.userType === "CLINIC" ) {
            history.push("/clinicmainmenu");
        }

      }, []);

    // const handleClick = () => {
    //     console.log(authState);
    // }
    return(
        <div>
        <ImageContainer>
            <HomeH1>HICOM AUTOMOTIVE</HomeH1>
            <HomeH4><span>MEDICAL CHARGE MANAGEMENT SYSTEM</span></HomeH4>
            <NavLink to="/login">
            <HomeButton variant="outline-light"><LoginIcon/>LOGIN</HomeButton>
            </NavLink>
        </ImageContainer>
        </div>
    );
}

export default HomePage;