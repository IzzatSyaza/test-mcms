import React, { useState, useEffect } from "react";
import {Wrapper} from "./Transaction.styles"
import {Form, Button, Row, Col} from 'react-bootstrap';
import FmtInput from "./FmtTransaction";
import EmtInput from "./EmtTransaction";
import Axios from "axios";
import { useParams, Link} from "react-router-dom"
import "./transaction.css"



function Transaction() {
    const {tcNo} = useParams();
    const [isFMT, setIsFMT]= useState(null);
    const [medicalType, setMedicalType]= useState("");
    const [empObject, setEmpObject] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/getemployee",{
            params: {
                empId: tcNo,
            }
        }).then((response) => {
            // console.log(response.data);
            setEmpObject(response.data[0]);
            console.log(empObject);
            console.log(response);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    const setFMT = (e) => {
        e.preventDefault();
        if(medicalType === "FMT") {
            setIsFMT(true);
        }
        else{
            setIsFMT(false);
        }
    }

    return (
    <div className="transaction">
        <div>
            <Wrapper>
                <h1 className="mb-5">Transaction</h1>
                <Form>

                <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={4} lg={4}>
                        Medical Type:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Select aria-label="Default select example" placeholder="JOi"
                        onChange={(event) =>{
                        setMedicalType(event.target.value);
                        }} onClick={setFMT}>
                            <option>Please Select</option>
                            <option value="EMT">EMT</option>
                            <option value="FMT">FMT</option>
                            <option value="DTL">DTL</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                {isFMT ? <FmtInput empObj={empObject} medicalType={medicalType}/> : <EmtInput empObj={empObject} medicalType={medicalType}/> }


                </Form>
            </Wrapper>
        </div>
    </div>
    );
}

export default Transaction;