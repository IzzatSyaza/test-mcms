import React, { useState } from "react";
import {Wrapper} from "./Children.styles.js"
import {Button, Form, Row, Col} from 'react-bootstrap';
import InputForm from "../../../components/InputForm/InputForm"
import Axios from "axios";
import { useParams} from "react-router-dom"
import DatePicker from "react-datepicker";
import "../familyMember.css";


function AddChildren() {

    const {tcNo} = useParams();

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [ic, setIc] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [studytStatus, setStudyStatus] = useState("");

    const [dob, setDob] = useState(new Date());

    const addChildren = (event) => {
        event.preventDefault();
        console.log(dob)
        Axios.post("http://localhost:3001/addChildren", {
            tcNo: tcNo,
            name: name,
            icNo: ic,
            gender: gender,
            dob: dob,
            marital: maritalStatus,
            studyStatus: studytStatus,
        }).then(() => {
            console.log("Success");
        })
    }

    return (
        <div className="familyMember">
            <Wrapper>
            <h3>Add New Child</h3>
                <Form>
                    <InputForm type="text" cId="" name="name" value={name}
                    label="Name:" placeholder="Name"
                    onChange={(event) =>{
                        setName(event.target.value);
                    }}
                    />

                    <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Gender:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Check
                            type="radio"
                            label="Male"
                            name="gender"
                            id="Male"
                            value="Male"
                            onChange={(event) =>{
                                setGender(event.target.value);
                            }}    
                        />
                        <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            id="Female"
                            value="Female"
                            onChange={(event) =>{
                                setGender(event.target.value);
                            }}
                        />
                    </Col>
                </Form.Group>

                    <InputForm type="text" cId="" name="ic" value={ic}
                    label="Identification Number:" placeholder="MyKad/MyKid"
                    onChange={(event) =>{
                        setIc(event.target.value);
                    }}
                    />


                    <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Date of Birth:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <DatePicker className="form-control" dateFormat="yyyy-MM-dd" value={dob} selected={dob} 
                        onChange={dob => setDob(dob)} />
                    </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalEmail">
                        <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Marital Status:
                        </Form.Label>
                        <Col xs={12} sm={12} md={8} lg={8}>
                            <Form.Select aria-label="Default select example" placeholder="JOi"
                            onChange={(event) =>{
                                setMaritalStatus(event.target.value);
                            }}
                            >
                                <option>Open this select menu</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Single">Single</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalEmail">
                        <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Still Study:
                        </Form.Label>
                        <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="studyStatus"
                            id="studyStatus"
                            value="Yes"
                            onChange={(event) =>{
                                setStudyStatus(event.target.value);
                            }}   
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="studyStatus"
                            id="studyStatus"
                            value="No"
                            onChange={(event) =>{
                                setStudyStatus(event.target.value);
                            }}   
                        />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalPwd">
                        <Col xs={{span: 4, offset:9}}
                        sm={{span: 4, offset:10}}
                        md={{span: 4, offset:11}}
                        lg={{span: 4, offset:11}}
                    >
                            <Button onClick={addChildren} type="submit">Submit</Button>
                        </Col>
                    </Form.Group>

                </Form>
            </Wrapper>
        </div>
    );
}

export default AddChildren;