import React, {useState, useEffect} from "react";
import {Wrapper} from "../Spouse/Spouse.styles.js"
import {Button, Form, Row, Col} from 'react-bootstrap';
import InputForm from "../../../components/InputForm/InputForm";
import DatePicker from "react-datepicker";
import { useParams} from "react-router-dom"
import Axios from "axios";
import "../familyMember.css";


function EditSpouse() {
    const {tcNo} = useParams();
    const {spouseId} = useParams();

    const [name, setName] = useState("");
    const [ic, setIc] = useState("");
    const [occupation, setOccupation] = useState("");
    const [hpNo, setHpNo] = useState("");

    const [dob, setDob] = useState(new Date());

    const SpouseEdit = (event) => {
        event.preventDefault();
        Axios.put("http://localhost:3001/editspouse", {
            tcNo: tcNo,
            spouseId: spouseId,
            name: name,
            icNo: ic,
            occupation: occupation,
            hpNo: hpNo,
            dob: dob,
        }).then(() => {
            console.log("Success");
        })
    }

    useEffect(()=> {
        setName(localStorage.getItem("name"));
        setIc(localStorage.getItem("ic"));
        setOccupation(localStorage.getItem("occupation"));
        setHpNo(localStorage.getItem("contact"));
        setDob(FormatDate(localStorage.getItem("dob")));
        console.log("Lol" + dob)
    },[])

    function FormatDate(thedate) {
        var d = new Date(thedate);
        console.log("Lol" + d)
        return d ;
    }


    return (
        <div className="familyMember">
        <h2 className="ms-5">Edit Spouse</h2>
            <Wrapper>
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
                        <DatePicker dateFormat="yyyy-MM-dd" value={dob} selected={dob} 
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
                        sm={{span: 4, offset:10}}
                        md={{span: 4, offset:11}}
                        lg={{span: 4, offset:11}}
                    >
                            <Button onClick={SpouseEdit} type="submit">Edit</Button>
                        </Col>
                    </Form.Group>

                </Form>
            </Wrapper>
        </div>
    );
}

export default EditSpouse;