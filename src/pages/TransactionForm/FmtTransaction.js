import React, { useState } from "react";
import {Wrapper} from "./Transaction.styles"
import {Form, Button, Row, Col} from 'react-bootstrap';
import InputForm from "../../components/InputForm/InputForm"
import DatePicker from "react-datepicker";
import Axios from "axios";


function FmtInput(props) {

    const [clinic, setClinic] = useState("");
    const [sickness, setSickness] = useState("");
    const [charge, setCharge] = useState("");
    const [medicalType, setMedicalType] = useState(props.medicalType);
    const [relation, setRelation] = useState("");
    const [patientName, setPatientName] = useState("");

    const [dateVisit, setDateVisit] = useState(new Date());

    const handleTransaction = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/addTransaction",{
            sickness: sickness,
            charge: charge,
            dateVisit: dateVisit,
            medicalType: medicalType,
            relation: relation,
            patientName: patientName,
        }).then(()=> {
            console.log("Berjaya");
        })
    }

    return (
    <div>
        <div>

                <h1 className="mb-5">{props.medicalType}</h1>



                <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={4} lg={4}>
                        Date Visit:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <DatePicker dateFormat="dd/MM/yyyy" value={dateVisit} selected={dateVisit} 
                        onChange={dateVisit => setDateVisit(dateVisit)} />
                    </Col>
                </Form.Group>

{/* 
                <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={4} lg={4}>
                        Clinic:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Select aria-label="Default select example" placeholder="JOi">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>
                </Form.Group> */}

                <InputForm type="text" cId="" 
                    label="Patient Name:" placeholder="Patient"/>

                 <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={4} lg={4}>
                        Relation:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Select aria-label="Default select example" placeholder="JOi">
                            <option>Open this select menu</option>
                            <option value="1">Spouse</option>
                            <option value="2">Child</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                

                    <InputForm type="text" cId="" 
                    label="Sickness:" placeholder="Sickness"/>

                    <InputForm type="text" cId="" 
                    label="Charge:" placeholder="Charge in RM"/>

                    <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalPwd">
                    <Col xs={{span: 4, offset:9}}
                    sm={{span: 4, offset:10}}
                    md={{span: 4, offset:11}}
                    lg={{span: 4, offset:11}}
                    >
                        <Button type="submit">Submit</Button>
                    </Col>
                </Form.Group>

        </div>
    </div>
    );
}

export default FmtInput;