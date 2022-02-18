import React, {useState, us} from "react";
import {Wrapper} from "./Spouse.styles.js"
import {Button, Form, Row, Col} from 'react-bootstrap';
import InputForm from "../../../components/InputForm/InputForm";
import DatePicker from "react-datepicker";
import { useParams} from "react-router-dom"
import Axios from "axios";
import "../familyMember.css";


function AddSpouse() {
    const {tcNo} = useParams();

    const [name, setName] = useState("");
    const [ic, setIc] = useState("");
    const [occupation, setOccupation] = useState("");
    const [hpNo, setHpNo] = useState("");

    const [dob, setDob] = useState(new Date());

    const addSpouse = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:3001/addSpouse", {
            tcNo: tcNo,
            name: name,
            icNo: ic,
            occupation: occupation,
            hpNo: hpNo,
            dob: dob,
        }).then(() => {
            console.log("Success");
        })
    }


    return (
        <div className="familyMember">
            <Wrapper>
            <h2>Edit Spouse</h2>
                <Form>
                    <InputForm type="text" cId="" name="name" value={name}
                    label="Name:" placeholder="Name"
                    onChange={(event) =>{
                        setName(event.target.value);
                    }}
                    />

                    <InputForm type="text" cId="" name="ic" value={ic}
                    label="Identification No:" placeholder="MyKad"
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

                    <InputForm type="text" cId="" name="Occupation" value={occupation}
                    label="Occupation:" placeholder="Occupation"
                    onChange={(event) =>{
                        setOccupation(event.target.value);
                    }}
                    />

                    <InputForm type="text" cId="" name="hpNo" value={hpNo}
                    label="Phone No:" placeholder="Phone No"
                    onChange={(event) =>{
                        setHpNo(event.target.value);
                    }}
                    />

                    <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalPwd">
                        <Col xs={{span: 4, offset:9}}
                        sm={{span: 4, offset:9}}
                        md={{span: 4, offset:10}}
                        lg={{span: 4, offset:10}}
                    >
                            <Button onClick={addSpouse} type="submit">Submit</Button>
                        </Col>
                    </Form.Group>

                </Form>
            </Wrapper>
        </div>
    );
}

export default AddSpouse;