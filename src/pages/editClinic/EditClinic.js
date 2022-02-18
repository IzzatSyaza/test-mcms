import React, {useState, useEffect} from "react";
import {Form, Button, Row, Col} from 'react-bootstrap';
import InputForm from "../../components/InputForm/InputForm";
import Axios from "axios";
import "./editClinic.css"
import {useParams, useHistory} from "react-router-dom";




export default function EditClinic() {
    const {mcmsId} = useParams();
    const [editObj, setEditOjb] = useState([])
    const [cType, setCType] = useState("");
    const [code, setCode] = useState("");
    const [cName, setCName] = useState("");
    const [status, setStatus] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUser] = useState([]);
    const [clinicCode, setClinicCode] = useState([]);
    let history = useHistory();


    

    useEffect(() => {
        Axios.get("http://localhost:3001/getClinicbymcmsId",{
            params:{
                mcmsId: mcmsId,
            }
        }).then((response) => {
            console.log(response);
            setEditOjb(response.data[0])
            setCName(response.data[0].clinic_name);
            setCType(response.data[0].clinic_ref);
            setCode(response.data[0].clinic_code);
            setStatus(response.data[0].clinic_status);
            setUsername(response.data[0].username);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/getUsername").then((response) => {
            setUser(response.data);
            console.log(response.data)
        })
        .catch((error) =>{console.log(error);});
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/getClinicCode").then((response) => {
            setClinicCode(response.data);
            console.log(response.data)
        })
        .catch((error) =>{console.log(error);});
    }, []);

    // const editClinic = (event) => {
    //     event.preventDefault();
    //     Axios.put("http://localhost:3001/editclinic", {
    //         cType: cType,
    //         code: code,
    //         cName: cName,
    //         status: status,
    //         username: username,
    //         password: password,
    //         id: mcmsId,
    //     }).then((res) => {
    //         alert(res.data.message);
    //         history.push("/ClinicList");
    //     }).catch(err =>{
    //         alert(err);
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate());
        setIsSubmit(true);
    }

    const validate = () => {
        const errors = {};
        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!cType){
            errors.cType = "Clinic Type is required!";
        }

        if (!code){
            errors.code = "Clinic Code is required!";
        }

        clinicCode.map(val=>{
            if(code === val.clinic_code){
                errors.code = "The Clinic Code Already Exist!";
            }
        })

        if (!cName){
            errors.cName = "Clinic Name is required!";
        }

        if (!status){
            errors.status = "Clinic Type is required!";
        }

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
            errors.password = "Password must be at least 4 characters!";
        }

        return errors
    }

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            Axios.put("http://localhost:3001/editclinic", {
                cType: cType,
                code: code,
                cName: cName,
                status: status,
                username: username,
                password: password,
                id: mcmsId,
            }).then((res) => {
                alert(res.data.message);
                history.push("/ClinicList");
            }).catch(err =>{
                alert(err);
            })
        }
    }, [formErrors])

    return (
    <div className="addClinic">
        <div className="addContainer">
        <h3 className="addTitle">Edit Clinic</h3>
        <div className="addItem">
            <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-4"
            controlId="formHorizontalEmail">
                <Form.Label column xs={12} sm={12} md={3} lg={3}>
                    Clinic Type:
                </Form.Label>
                <Col xs={12} sm={12} md={8} lg={8}>
                    <Form.Check
                        type="radio"
                        label="G"
                        name="clinicType"
                        id="G"
                        value="G"
                        checked={cType === "G"}
                        onChange={(event) =>{
                        setCType(event.target.value);
                        }}    
                    />
                    <Form.Check
                        type="radio"
                        label="R"
                        name="clinicType"
                        id="R"
                        value="R"
                        checked={cType === "R"}
                        onChange={(event) =>{
                        setCType(event.target.value);
                    }}
                    />
                </Col>
            </Form.Group>
            <p className="errorText text-center">{formErrors.cType}</p>

            
            <InputForm type="text" cId="" name="cCode" value={code} 
            label="Clinic Code:" placeholder="Clinic Code"
            onChange={(event) =>{
                setCode(event.target.value);
            }}/>
            <p className="errorText text-center">{formErrors.code}</p>

            
            <InputForm type="text" cId="" name="cname" value={cName}
            label="Clinic Name:" placeholder="Clinic Name"
            onChange={(event) =>{
                setCName(event.target.value);
            }}/>
            <p className="errorText text-center">{formErrors.cName}</p>

            <Form.Group as={Row} className="mb-4"
            controlId="formHorizontalEmail">
                <Form.Label column xs={12} sm={12} md={3} lg={3}>
                    Clinic Status:
                </Form.Label>
                <Col xs={12} sm={12} md={8} lg={8}>
                    <Form.Check
                        type="radio"
                        label="ACTIVE"
                        name="StatusClinic"
                        id="ACTIVE"
                        value="ACTIVE"
                        checked={status === "ACTIVE"}
                        onChange={(event) =>{
                        setStatus(event.target.value);
                        }}/>
                    <Form.Check
                        type="radio"
                        label="INACTIVE"
                        name="StatusClinic"
                        id="INACTIVE"
                        value="INACTIVE"
                        checked={status === "INACTIVE"}
                        onChange={(event) =>{
                        setStatus(event.target.value);
                        }} />
                </Col>
            </Form.Group>
            <p className="errorText text-center">{formErrors.status}</p>


            <InputForm type="text" cId="" name="cusername" value={username}
            label="Username:" placeholder="Username"
            onChange={(event) =>{
                setUsername(event.target.value);
            }}/>
            <p className="errorText text-center">{formErrors.username}</p>


            <InputForm type="password" cId="" name="cpassword" value={password}
            label="Password:" placeholder="Password"
            onChange={(event) =>{
                setPassword(event.target.value);
            }}/>
            <p className="errorText text-center">{formErrors.password}</p>

            
            <Form.Group as={Row} className="mt-5"
            controlId="formHorizontalPwd">
                <Col xs={{span: 1, offset:7}}
                sm={{span: 1, offset:8}}
                md={{span: 1, offset:9}}
                lg={{span: 1, offset:10}}>
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
