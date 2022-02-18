import React from "react";
import {Route, Redirect} from "react-router-dom";
// import { AuthContext } from "../../helpers/AuthContext";

export default function AdminProtectedRoutes({auth, component: Component, ...rest}) {

    // const { authState, } = useContext(AuthContext);

    return (
        <Route {...rest} render={(props) => {
            if(auth.status && auth.userType === "ADMIN") {
                return <Component {...rest} />;
            }
            if(!auth.status ) {

                return <Redirect to = {{path: "/login", state: {from: props.location}}} />
            }
            else{
                return <Redirect to = {{path: "/", state: {from: props.location}}} />
            }
            
        }}/>
            
    )
}

// export function ClinicProtectedRoutes({auth, component: Component, ...rest}) {

//     const { authState } = useContext(AuthContext);

//     return (
//         <Route {...rest} render={(props) => {
//             if(authState.status) {
//                 if(authState.userType == "CLINIC"){
//                     return <Component {...rest} />;
//                 }
//                 else{
//                     return <Redirect to = {{path: "/", state: {from: props.location}}} />
//                 }
                 
//             }
           
//             else {
//                 return <Redirect to = {{path: "/", state: {from: props.location}}} />
//             }
            
//         }}/>
            
//     )
// }
