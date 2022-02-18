import React from "react";
import {Route, Redirect} from "react-router-dom";
// import { AuthContext } from "../../helpers/AuthContext";



export default function ClinicProtectedRoutes({auth, component: Component, ...rest}) {

    // const { authState } = useContext(AuthContext);

    return (
        <Route {...rest} render={(props) => {
            if(auth.status && auth.userType === "CLINIC") return <Component {...rest} />;
            else {
                return <Redirect to = {{path: "/", state: {from: props.location}}} />
            }
            
        }}/>
            
    )
}
