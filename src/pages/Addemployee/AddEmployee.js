import React, {useState, useEffect} from "react";
import {Form, Button, Row, Col} from 'react-bootstrap';
import InputForm from "../../components/InputForm/InputForm";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "./addEmp.css"
import { useHistory } from "react-router-dom";

function AddEmployee() {
    const [tcno, setTcNo] = useState("");
    const [name, setName] = useState("");
    const [ic, setIc] = useState("");
    const [gred, setGred] = useState({});
    const [department, setDep] = useState("");
    const [c_Center, setCCenter] = useState({});
    const [plant, setPlant] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [maritialStatus, setMaritial] = useState("");
    const [spouseWork, setSpouse] = useState("");
    const [hpNo, setHp] = useState("");
    const [emt, setEmt] = useState("");
    const [fmt, setFmt] = useState("");
    const [dtl, setDtl] = useState("");

//---------------------------Date useState------------------------------------
    const [dateJoin, setDJoin] = useState(new Date());
    const [dob, setDob] = useState(new Date());

//---------------------------use effect---------------------------------------
    const [position, setPosition] = useState([]);
    const [optionDepartment, setOptionDepartment] = useState([]);
    const [optionCentre, setOptionCentre] = useState([]);
    const [optionPlant, setOptionPlant] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    let history = useHistory();
    


    // const addEmployee = (event) => {
    //     event.preventDefault();
    //     let gd = JSON.parse(gred);
    //     let costCenter = JSON.parse(c_Center);
    //     console.log(costCenter.cost_centre);
    //     Axios.post("http://localhost:3001/addEmployee", {
    //         tcNo: tcno,
    //         name: name,
    //         icNo: ic,
    //         gred: gd,
    //         department: department,
    //         dateJoin: dateJoin,
    //         cCenter: costCenter,
    //         plant: plant,
    //         gender: gender,
    //         dob: dob,
    //         age: age,
    //         maritial: maritialStatus,
    //         sWork: spouseWork,
    //         hpNo: hpNo,
    //         emt: emt,
    //         fmt: fmt,
    //         dtl: dtl,
    //     }).then(() => {
    //         console.log("Success");
    //     })
    // }

    useEffect(() => {
        Axios.get("http://localhost:3001/getPosition",).then((response) => {
            console.log(response);
            setPosition(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/getDepartment",).then((response) => {
            console.log(response);
            setOptionDepartment(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/getCentre",).then((response) => {
            console.log(response);
            setOptionCentre(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/getPlant",).then((response) => {
            console.log(response);
            setOptionPlant(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate());
        setIsSubmit(true);
    }

    const validate = () => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!tcno){
            errors.tcno = "Employee No is required!";
        }
        if (!name){
            errors.name = "Employee Name is required!";
        }
        if (!ic){
            errors.ic = "Employee IC is required!";
        }
        if (Object.keys(gred).length === 0){
            errors.gred = "Employee Grade/Position is required!";
        }
        if (!department){
            errors.department = "Department is required!";
        }
        if (Object.keys(c_Center).length === 0){
            errors.c_Center = "Cost Center is required!";
        }
        if (!plant){
            errors.plant = "Employee Plant is required!";
        }
        if (!gender){
            errors.gender = "Employee Gender is required!";
        }
        if (!age){
            errors.age = "Employee Age is required!";
        }
        if (!maritialStatus){
            errors.maritialStatus = "Employee Marital Status is required!";
        }
        if (!spouseWork){
            errors.spouseWork = "Spouse Job status is required!";
        }
        if (!hpNo){
            errors.hpNo = "Employee Contact is required!";
        }
        if (!emt){
            errors.emt = "Employee Medical Treatment Limit is required!";
        }
        if (!fmt){
            errors.fmt = "Employee Medical Treatment Limit is required!";
        }
        if (!dtl){
            errors.dtl = "Employee Dental Treatment Limit is required!";
        }

        return errors
    }

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            let gd = JSON.parse(gred);
            let costCenter = JSON.parse(c_Center);
            Axios.post("http://localhost:3001/addEmployee", {
                tcNo: tcno,
                name: name,
                icNo: ic,
                gred: gd,
                department: department,
                dateJoin: dateJoin,
                cCenter: costCenter,
                plant: plant,
                gender: gender,
                dob: dob,
                age: age,
                maritial: maritialStatus,
                sWork: spouseWork,
                hpNo: hpNo,
                emt: emt,
                fmt: fmt,
                dtl: dtl,
            }).then((res) => {
                alert(res.data.message);
                history.push("/DisplayEmployee/"+tcno);
            }).catch(err =>{
                alert(err);
            })
        }
    }, [formErrors])


    return(
        <div className="addEmployee">
            <div className="addContainer">
            <h3 className="addTitle">Add New Employee</h3>
            <div className="addItem">
            <>
            <Form onSubmit={handleSubmit}>
                <InputForm type="text" cId="" name="tcNo" value={tcno} 
                label="Employee No:" placeholder="Employee Number"
                onChange={(event) =>{
                    setTcNo(event.target.value);
                }}/>
                <p className="errorText text-center">{formErrors.tcno}</p>

                <InputForm type="text" cId="" name="name" value={name}
                label="Name:" placeholder="Name"
                onChange={(event) =>{
                    setName(event.target.value);
                }}/>
                <p className="errorText text-center">{formErrors.name}</p>

                <InputForm type="text" cId="" name="icNo" value={ic}
                label="Identification Number:" placeholder="Identification Number"
                onChange={(event) =>{
                    setIc(event.target.value);
                }}/>
                <p className="errorText text-center">{formErrors.ic}</p>

                <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Position/Gred:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Select name="gred" aria-label="Default select example" placeholder="JOi"
                        onChange={(event) =>{
                        setGred(event.target.value);
                        }}
                        >
                            <option>Please Select</option>
                            {position.map((val) => {
                                return (
                                <option key={val.id_position} 
                                value={`{"grade":"${val.position_code}", "position":"${val.position_desc}"}`}>
                                {val.position_code + "-" + val.position_desc}
                                </option>   
                                );
                            })}
                            
                        </Form.Select>
                    </Col>
                </Form.Group>
                <p className="errorText text-center">{formErrors.gred}</p>


                <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Department:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Select name="department" aria-label="Default select example" placeholder="JOi"
                        onChange={(event) =>{
                        setDep(event.target.value);
                        }}
                        >
                            <option>Please Select</option>
                            {optionDepartment.map((val) => {
                                return (
                                <option key={val.id} value={val.dept_cod}>
                                {val.dept_cod + "-" +val.dept_name}
                                </option>   
                                );
                            })}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <p className="errorText text-center">{formErrors.department}</p>

                <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Date Join:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={dateJoin} selected={dateJoin} 
                        onChange={dateJoin => setDJoin(dateJoin)} />
                    </Col>
                </Form.Group>



                <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Cost Center:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Select name="cCenter" aria-label="Default select example" placeholder="JOi"
                        onChange={(event) =>{
                        setCCenter(event.target.value);
                        }}
                        >
                            <option>Please Select</option>
                            {optionCentre.map((val) => {
                                return (
                                <option key={val.cost_id} value={`{"cost_centre":"${val.cost_centre}", "cost_category":"${val.cost_category}"}`}>
                                {val.cost_centre +"-"+ val.cost_category}
                                </option>   
                                );
                            })}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <p className="errorText text-center">{formErrors.c_Center}</p>


                <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Plant:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Select name="plant" aria-label="Default select example" placeholder="JOi"
                        onChange={(event) =>{
                        setPlant(event.target.value);
                        }}
                        >
                            <option>Please Select</option>
                            {optionPlant.map((val) => {
                                return (
                                <option key={val.id} value={val.plant}>
                                {val.plant}
                                </option>   
                                );
                            })}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <p className="errorText text-center">{formErrors.plant}</p>
                

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
                            value="M"
                            onChange={(event) =>{
                            setGender(event.target.value);
                            }}    
                        />
                        <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            id="Female"
                            value="F"
                            onChange={(event) =>{
                            setGender(event.target.value);
                        }}
                        />
                    </Col>
                </Form.Group>
                <p className="errorText text-center">{formErrors.gender}</p>

                <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Date of Birth:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={dob} 
                            onChange={dob => setDob(dob)} />
                    </Col>
                </Form.Group>

                <InputForm type="text" cId="" name="age" value={age}
                label="Age:" placeholder="Age"
                onChange={(event) =>{
                    setAge(event.target.value);
                }}/>
                <p className="errorText text-center">{formErrors.age}</p>

                <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Marital Status:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Select name="maritial" aria-label="Default select example" placeholder="JOi"
                        onChange={(event) =>{
                        setMaritial(event.target.value);
                        }}
                        >
                            <option>Open this select menu</option>
                            <option value="M">Married</option>
                            <option value="S">Single</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <p className="errorText text-center">{formErrors.maritialStatus}</p>
                

                <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Spouse Work:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Check
                            type="radio"
                            label="Yes"
                            name="sWork"
                            id="Yes"
                            value="TRUE"
                            onChange={(event) =>{
                            setSpouse(event.target.value);
                            }}
                        />
                        <Form.Check
                            type="radio"
                            label="No"
                            name="sWork"
                            id="No"
                            value="FALSE"
                            onChange={(event) =>{
                            setSpouse(event.target.value);
                            }}
                        />
                    </Col>
                </Form.Group>
                <p className="errorText text-center">{formErrors.spouseWork}</p>

                <InputForm type="text" cId="" name="hpNo" value={hpNo}
                label="Mobile No:" placeholder="Mobile No"
                onChange={(event) =>{
                    setHp(event.target.value);
                }}/>
                <p className="errorText text-center">{formErrors.hpNo}</p>

                <InputForm type="text" cId="" name="emt" value={emt}
                label="Employee Medical Treatment (EMT):" placeholder="EMT"
                onChange={(event) =>{
                    setEmt(event.target.value);
                }}/>
                <p className="errorText text-center">{formErrors.emt}</p>

                <InputForm type="text" cId="" name="fmt" value={fmt}
                label="Family Medical Treatment (FMT):" placeholder="FMT"
                onChange={(event) =>{
                    setFmt(event.target.value);
                }}/>
                <p className="errorText text-center">{formErrors.fmt}</p>

                <InputForm type="text" cId="" name="dtl" value={dtl}
                label="Dental Treatment Limit:" placeholder="Dental Treatment Limit"
                onChange={(event) =>{
                    setDtl(event.target.value);
                }}/>
                <p className="errorText text-center">{formErrors.dtl}</p>

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
            </>
            </div>
            </div>
        </div>
    );
}

export default AddEmployee;