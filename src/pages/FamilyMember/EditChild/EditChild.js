import React, { useState, useEffect } from "react";
import {Wrapper} from "../Children/Children.styles"
import {Button, Form, Row, Col} from 'react-bootstrap';
import InputForm from "../../../components/InputForm/InputForm"
import Axios from "axios";
import {useParams} from "react-router-dom"
import DatePicker from "react-datepicker";
import "../familyMember.css";



function AddChildren() {

    const {tcNo} = useParams();
    const {childId} = useParams();

    // const [childObj, setChildObj] = useState([]);

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [ic, setIc] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [studytStatus, setStudyStatus] = useState("");

    const [dob, setDob] = useState(new Date());

    const editChild = (event) => {
        event.preventDefault();
        Axios.put("http://localhost:3001/editchild", {
            tcNo: tcNo,
            childId: childId,
            name: name,
            icNo: ic,
            gender: gender,
            dob: dob,
            marital: maritalStatus,
            study: studytStatus,
        }).then(() => {
            console.log("Success");
        })
    }


    // useEffect(() => {
    //     Axios.get("http://localhost:3001/getChildrenById",{
    //         params: {
    //             empId: tcNo,
    //             id: childId,
    //         }
    //     }).then(response => 
    //         response.json().then((data)=>{
    //             console.log(data)
    //         setName(data.data[0].child_name);
    //         setIc(data.data[0].child_ic);
    //         })
    //     )
    // },[])


    //     })
    //     .catch(err =>{
    //         console.log(err);
    //     })
    // }, []);

    // useEffect(() => {
    //     console.log(childObj)
    //     childObj.map((val)=>{
    //         setName(val.child_name);
    //         setGender(val.child_gender);
    //         setIc(val.child_name);
    //         setMaritalStatus(val.child_marital_status);
    //         setStudyStatus(val.child_study_stautus);
    //         setDob(val.child_dob);
            
    //     })
    //     setName(childObj.child_name);
    

    //     console.log(name);
    // }, [childObj])

    useEffect(()=> {
        setName(localStorage.getItem("name"));
        setGender(localStorage.getItem("gender"));
        setIc(localStorage.getItem("ic"));
        setMaritalStatus(localStorage.getItem("maritalStatus"));
        setStudyStatus(localStorage.getItem("studyStatus"));
        setDob(FormatDate(localStorage.getItem("dob")));
    },[])

    function FormatDate(thedate) {
        var d = new Date(thedate);
        return d ;
    }

    

    return (
        <div className="familyMember">
            <Wrapper>
            
                <Form>
                
                    <InputForm type="text" cId="" name="child_name" value={name}
                    label="Name:" placeholder="Name"
                    onChange={(event) =>{
                        setName(event.target.value);
                    }}
                    />

                    <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={4} lg={4}>
                        Gender:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Check
                            type="radio"
                            label="Male"
                            name="gender"
                            id="Male"
                            value="Male"
                            checked={gender === "Male"}
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
                            checked={gender === "Female"}
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
                    <Form.Label column xs={12} sm={12} md={4} lg={4}>
                        Date of Birth:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <DatePicker dateFormat="yyyy-MM-dd" value={dob} selected={dob} 
                        onChange={dob => setDob(dob)} />
                    </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalEmail">
                        <Form.Label column xs={12} sm={12} md={4} lg={4}>
                        Marital Status:
                        </Form.Label>
                        <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Select aria-label="Default select example" value={maritalStatus}
                        onChange={(event) =>{
                            setMaritalStatus(event.target.value);
                        }}
                        >
                            <option  value="Married">Married</option>
                            <option  value="Divorced">Divorced</option>
                            <option  value="Single">Single</option>
                        </Form.Select>

                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalEmail">
                        <Form.Label column xs={12} sm={12} md={4} lg={4}>
                        Still Study:
                        </Form.Label>
                        <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="studyStatus"
                            id="studyStatus"
                            value="Yes"
                            checked={studytStatus === "Yes"}
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
                            checked={studytStatus === "No" }
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
                            <Button onClick={editChild} type="submit">Submit</Button>
                        </Col>
                    </Form.Group>

                </Form>
            </Wrapper>
        </div>
    );
}

export default AddChildren;