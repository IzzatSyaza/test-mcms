import React, { useState, useEffect } from "react";
import {Wrapper} from "./Transaction.styles"
import {Form, Button, Row, Col} from 'react-bootstrap';
import InputForm from "../../components/InputForm/InputForm"
import DatePicker from "react-datepicker";
import Axios from "axios";



function EmtInput(props) {

    const [tcNo, setTcNo] = useState(props.empObj.EmployeeNo);
    const [deptCode, setDeptCode] = useState(props.empObj.dep_name);
    const [medicalType, setMedicalType] = useState(props.medicalType);
    const [cCenter, setCCenter] = useState(props.empObj.costcen);
    const [cCenterNo, setCCenterNo] = useState(props.empObj.costcen);
    const [patientName, setPatientName] = useState(props.empObj.Name);
    const [sickness, setSickness] = useState("");
    const [clinicCode, setClinicCode] = useState("");    
    const [charge, setCharge] = useState("");
    // const [relation, setRelation] = useState("MYSELF");

    const [dateVisit, setDateVisit] = useState(new Date());


    const handleTransaction = (e) => {
        e.preventDefault();
        formatCCenter();
        Axios.post("http://localhost:3001/addTransaction",{
            tcNo: tcNo,
            deptCode: deptCode,
            dateVisit: dateVisit,
            medicalType: medicalType,
            cCenter: cCenter,
            cCenterNo: cCenterNo,
            patientName: patientName,
            sickness: sickness,
            // clinicCode: clinicCode,
            charge: charge,

        }).then((response)=> {
            console.log("Berjaya");
        })
    }

    const formatCCenter = () =>{
        let letter = props.empObj.costcen.charAt(3);
        if (cCenterNo === "311D") setCCenter("DIR LABOUR");
        else if(letter === "D") setCCenter("DIRECT");
        else if(letter === "H") setCCenter("INDIRECT");
        else setCCenter("ADMIN");
        // alert(tcNo);
    }

    // useEffect(() => {
    //     Axios.get("http://localhost:3001/getClinic",).then((response) => {
    //         console.log(response);
    //         setPosition(response.data);
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //     })
    // }, []);

    return (
    <div>
        <div>

                <h1 className="mb-5">{props.medicalType}</h1>
                <h1 className="mb-5">{props.empObj.Name}</h1>



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


                {/* <Form.Group as={Row} className="mb-4"
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
                    label="Sickness:" placeholder="Sickness"
                    onChange={(event) =>{
                        setSickness(event.target.value);
                    }}
                    />

                    <InputForm type="text" cId="" 
                    label="Charge:" placeholder="Charge in RM"
                    onChange={(event) =>{
                        setCharge(event.target.value);
                    }}
                    />

                    <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalPwd">
                    <Col xs={{span: 4, offset:9}}
                    sm={{span: 4, offset:10}}
                    md={{span: 4, offset:11}}
                    lg={{span: 4, offset:11}}
                    >
                        <Button onClick={handleTransaction} type="submit">Submit</Button>
                    </Col>
                </Form.Group>


        </div>
    </div>
    );
}

export default EmtInput;