import React, {useEffect, useState, useContext} from "react";
import HammLogo from "../../images/hamm_logo.png";
import {Form, Button, FloatingLabel} from 'react-bootstrap';
import {Formdiv, Wrapper, FormCard} from './Login.styles'
import Axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { useHistory } from "react-router-dom";




function Login() {

  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const { authState,setAuthState } = useContext(AuthContext);


  const[loginStatus, setLoginStatus] = useState(false)
  let history = useHistory();


  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/login",{
      username: username,
      password: password,
    }).then((response)=>{
      if(response.data.error){
        alert(response.data.error);
      }
      else{
        setAuthState({
          username: response.data.username,
          mcms_id: response.data.id,
          userType: response.data.userType,
          status: true,
        });

        // console.log(response.data.username);
        // console.log(authState);
        if(response.data.userType === "ADMIN"){
          history.push("/main");
        }
        else if(response.data.userType === "CLINIC"){
          history.push("/clinicmainmenu");
        }
        
      }
    })
  }

  // useEffect(()=>{
  //   Axios.get("http://localhost:3001/login").then((response)=>{
  //     if (response.data.loggedIn === true) {
  //       setLoginStatus(response.data.user[0].username)
  //     }
      
  //   })
  // },[])

  // const userAuthenticated = () =>{
  //   Axios.get("http://localhost:3001/isUserAuth", {
  //     headers: {
  //       "x-access-token": localStorage.getItem("token"),
  //     }
  //   }).then((response) => {
  //     console.log(response);
  //   })
  // }

  return (
    <Wrapper className=" text-center">
    <Form>
    <FormCard>
      <img className="mb-4" src={HammLogo} alt="Logo Hicom Automotive" width="72" height="57"/>
      <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>
      
      <Formdiv>
      
      <FloatingLabel
        controlId="floatingInput"
        label="Username"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="Username" value={username}
        onChange={(e)=>{setUsername(e.target.value)}}
        />
        </FloatingLabel>
        
        <FloatingLabel 
        controlId="floatingPassword" 
        label="Password" 
        className="mb-3">

        <Form.Control type="password" placeholder="Password" value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
        />
        </FloatingLabel>
      </Formdiv>
      <div className="d-grid gap-2">

      <Button variant="primary" size="md" type="submit"
      onClick={login}>
        Login
      </Button>
      </div>
      <p className="mt-5 mb-3 text-muted">&copy; Hicom Automotive</p>
    </FormCard>
    </Form>
    {/* {loginStatus && <Button onClick={userAuthenticated}> Check If Authenticated</Button>} */}
  </Wrapper>
  );
}

export default Login;