import React from "react";
import {Route, Redirect, useHistory} from "react-router-dom";

export default function LoginProtectedRoutes({auth, component: Component, ...rest}) {
    let history = useHistory();

    return (
        <Route {...rest} render={(props) => {
            if(auth.status && auth.userType === "ADMIN") {
                history.push("/main");
                
                // return <Redirect to = {{path: "/main", state: {from: props.location}}} />
            }
            else if(auth.status && auth.userType === "CLINIC" ) {
                history.push("/clinicmainmenu");
                // return <Redirect to = {{path: "/clinicmainmenu", state: {from: props.location}}} />
            }
            else if(!auth.status ) {

                return <Component {...rest} />;
            }
            else{
                return <Redirect to = {{path: "/main", state: {from: props.location}}} />
            }
            
        }}/>
            
    )
}

