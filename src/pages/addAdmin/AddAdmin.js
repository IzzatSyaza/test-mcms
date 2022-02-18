import React, {useState, useEffect} from "react";
import {Form, Button, Row, Col} from 'react-bootstrap';
import InputForm from "../../components/InputForm/InputForm";
import Axios from "axios";
import "./addAdmin.css";
import {useHistory} from "react-router-dom";


function AddAdmin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState([]);
    // const [cpassword, setCPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    let history = useHistory();

    // const tambahAdmin = (e) => {
    //     e.preventDefault();
    //     Axios.post("http://localhost:3001/addAdmin", {
    //         username: username,
    //         password: password,
    //     }).then((res) => {
    //         console.log(res)
    //         alert(res.data.message);
    //     }).catch(err =>{
    //         alert(err);
    //     })
    // }

    useEffect(() => {
        Axios.get("http://localhost:3001/getUsername").then((response) => {
            setUser(response.data);
            console.log(response.data)
        })
        .catch((error) =>{console.log(error);});
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate());
        setIsSubmit(true);
    }

    const validate = () => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!username){
            errors.username = "Username is required!";
        }

        user.map(val=>{
            if(username === val.username){
                errors.username = "The Username Already Exist!";
            }
        })

        if (!password){
            errors.password = "Password is required!";
        }else if(password.length < 4){
            errors.password = "Password Must Be at Least 4 characters!";
        }

        return errors
    }

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            // Axios.post("http://localhost:3001/addAdmin", {
            //     username: username,
            //     password: password,
            // }).then((res) => {
            //     console.log(res)
            //     alert(res.data.message);
            //     history.push("/AdminList");
            // }).catch(err =>{
            //     alert(err);
            // })
        }
    }, [formErrors])

    return (
    <div className="addClinic">
        <div className="addContainer">
        <h3 className="addTitle">Add New Admin</h3>
        <div className="addItem">
            <div>
        <Form onSubmit={handleSubmit}>
            <InputForm type="text" cId="" name="username" value={username}
            label="Username:" placeholder="Username" 
            onChange={(event) =>{
                setUsername(event.target.value);
            }}
            />
            <p className="errorText text-center">{formErrors.username}</p>
            {/* <p>{errors.username?.message}</p> */}

            <InputForm type="password" cId="" name="password" value={password}
            label="Password:" placeholder="Password" 
            onChange={(event) =>{
                setPassword(event.target.value);
            }}
            />
            <p className="errorText text-center">{formErrors.password}</p>
            {/* <p>{errors.password?.message}</p> */}
            

            {/* <InputForm type="password" cId="" name="cpassword" value={cpassword}
            label="Password:" placeholder="Password" 
            onChange={(event) =>{
                setCPassword(event.target.value);
            }}
            /> */}

            {/* <p>{errors.cpassword && "Passwords Does Not Match!!"}</p> */}

            
            <Form.Group as={Row} className="mt-5"
            controlId="formHorizontalPwd">
                <Col xs={{span: 1, offset:8}}
                sm={{span: 1, offset:9}}
                md={{span: 1, offset:10}}
                lg={{span: 1, offset:10}}
                >
                    <Button type="submit">Submit</Button>
                </Col>
            </Form.Group>
        </Form>
        </div>
        </div>
        </div>
    </div>
    );
}

export default AddAdmin;