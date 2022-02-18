import React, {useState, useEffect} from "react";
import {Form, Button, Row, Col} from 'react-bootstrap';
import InputForm from "../../components/InputForm/InputForm";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "./editEmployee.css"
import { useParams, useHistory} from "react-router-dom"


function EditEmployee() {
    const {tcNo} = useParams();
    const [empObj, setEmpObj] = useState({});

    const [empNo, setEmpNo] = useState(tcNo);
    const [name, setName] = useState("");
    const [ic, setIc] = useState("");
    const [gred, setGred] = useState({
        grade: "",
        position: "",
        });
    // const [grade, setGrade] = useState("");
    // const [thePosition, setThePosition] = useState("");
    const [department, setDep] = useState("");
    const [c_Center, setCCenter] = useState("");
    const [plant, setPlant] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [maritialStatus, setMaritial] = useState("");
    const [spouseWork, setSpouse] = useState("");
    const [hpNo, setHp] = useState("");
    const [emt, setEmt] = useState("");
    const [fmt, setFmt] = useState("");
    const [dtl, setDtl] = useState("");
    const [empPosition, setEmpPosition] = useState("");
    const [status, setStatus] = useState("");


    const [depObj, setDepObj] = useState({});
    const [cCategory, setCCategory] = useState("");

    const [hasDep, setHasDep] = useState(false);


//---------------------------Date useState------------------------------------
    const [dateJoin, setDJoin] = useState(new Date());
    const [dob, setDob] = useState(new Date());
    const [dateConfirm, setDateConfirm] = useState(new Date());
    const [dateResign, setDateResign] = useState(new Date());

//---------------------------use effect---------------------------------------
    const [position, setPosition] = useState([]);
    const [optionDepartment, setOptionDepartment] = useState([]);
    const [optionCentre, setOptionCentre] = useState([]);
    const [optionPlant, setOptionPlant] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    let history = useHistory();


    useEffect(() => {
        Axios.get("http://localhost:3001/getemployee",{
            params: {
                empId: tcNo,
            }
        }).then((response) => {
            if(typeof response.data[0] === "undefined" 
            || response.data[0] === null 
            || response.data[0].length === null 
            || response.data[0].length === 0){
                alert("The Employee does not exist")
                history.push("/searcheditemployee/");
            }
            else{
                setEmpNo(response.data[0].EmployeeNo);
                setName(response.data[0].Name);
                setIc(response.data[0].IcNo);
                setGred({
                    grade: response.data[0].grade,
                    position: response.data[0].position
                });
                // setGrade(response.data[0].grade);
                // setThePosition(response.data[0].position);
                setCCenter(response.data[0].costcen);
                setPlant(response.data[0].plant);
                setAge(response.data[0].age);
                setMaritial(response.data[0].MaritalStatus);
                setSpouse(response.data[0].wife_work);
                setHp(response.data[0].hp_num);
                setEmt(response.data[0].uop_ent);
                setFmt(response.data[0].heal_entitle_1);
                setDtl(response.data[0].dent_entitle);
                setGender(response.data[0].gender);
                setStatus(response.data[0].job_status);
                setDJoin(FormatDate(response.data[0].date_join));
                setDob(FormatDate(response.data[0].Birth));
                setDep(response.data[0].dep_name)
                setDateConfirm(FormatDate(response.data[0].date_confirm));
                setDateResign(FormatDate(response.data[0].Resign));
                setEmpObj(response.data[0]);
                Axios.get("http://localhost:3001/getDeptAndCode",{
                    params: {
                        dep: response.data[0].dep_name,
                        cc: response.data[0].costcen,
                    }
                }).then((resp) => {
                    // console.log(response);
                    setDepObj(resp.data[0]);
                    if(typeof resp.data[0] === "undefined" 
                    || resp.data[0] === null 
                    || resp.data[0].length === null 
                    || resp.data[0].length === 0)
                    {
                        setHasDep(false);
                    }

                    else{
                        setHasDep(true);
                    }
                })
                .catch(err =>{
                    console.log(err);
                })

                Axios.get("http://localhost:3001/getCategory",{
                    params: {
                        cCentre: response.data[0].costcen,
                    }
                }).then((res) => {
                    setCCategory(res.data[0].cost_category);
                    console.log(res.data[0])
                    console.log("ok category")
                
                })
                .catch(error =>{
                    console.log(error);
                })
            }
            
            
        })
        .catch((err) =>{
            console.log(err);
        })
    }, []);

    function FormatDate(thedate) {
        if(thedate == "0000-00-00"){
            let today = new Date();
            return today;
        }else if(thedate == ""){
            let today = new Date();
            return today;
        }
        else{
            let d = new Date(thedate);
            let date = new Date( d.getTime() + Math.abs(d.getTimezoneOffset()*60000));
        return date;
        }
        
    }

    // const editEmployee = (event) => {
    //     event.preventDefault();
    //     let gd = JSON.parse(gred);
    //     Axios.put("http://localhost:3001/editEmployee", {
    //         tcNo: tcNo,
    //         empNo: empNo,
    //         name: name,
    //         icNo: ic,
    //         gred: gd,
    //         department: department,
    //         dateJoin: dateJoin,
    //         cCenter: c_Center,
    //         plant: plant,
    //         gender: gender,
    //         dob: dob,
    //         age: age,
    //         marital: maritialStatus,
    //         sWork: spouseWork,
    //         hpNo: hpNo,
    //         emt: emt,
    //         fmt: fmt,
    //         dtl: dtl,
    //         dateResign: dateResign,
    //         dateConfirm: dateConfirm,
    //         status: status,
    //     }).then(() => {
    //         console.log("Success");
    //     })
    // }

    useEffect(() => {
        Axios.get("http://localhost:3001/getPosition",).then((response) => {
            // console.log(response);
            setPosition(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/getDepartment",).then((response) => {
            // console.log(response);
            setOptionDepartment(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/getCentre",).then((response) => {
            // console.log(response);
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
        if (!empNo){
            errors.empNo = "Employee No is required!";
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
            errors.spouseWork = "Spouse Job Status is required!";
        }
        if (!hpNo){
            errors.hpNo = "Employee Contact No is required!";
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
        if (!status){
            errors.status = "Employee Status is required!";
        }

        return errors
    }

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            // let gd = JSON.parse(gred);
            if(gred.position != empObj.position){
                let gd = JSON.parse(gred);
                Axios.put("http://localhost:3001/editEmployee", {
                    tcNo: tcNo,
                    empNo: empNo,
                    name: name,
                    icNo: ic,
                    gred: gd.grade,
                    position: gd.position,
                    department: department,
                    dateJoin: dateJoin,
                    cCenter: c_Center,
                    plant: plant,
                    gender: gender,
                    dob: dob,
                    age: age,
                    marital: maritialStatus,
                    sWork: spouseWork,
                    hpNo: hpNo,
                    emt: emt,
                    fmt: fmt,
                    dtl: dtl,
                    dateResign: dateResign,
                    dateConfirm: dateConfirm,
                    status: status,
                }).then((res) => {
                    alert(res.data.message);
                    history.push("/searchemployeetransaction");
                }).catch(err =>{
                    alert(err);
                })
            }
            else if(gred.position === empObj.position){
                Axios.put("http://localhost:3001/editEmployee", {
                    tcNo: tcNo,
                    empNo: empNo,
                    name: name,
                    icNo: ic,
                    gred: gred.grade,
                    position: gred.position,
                    department: department,
                    dateJoin: dateJoin,
                    cCenter: c_Center,
                    plant: plant,
                    gender: gender,
                    dob: dob,
                    age: age,
                    marital: maritialStatus,
                    sWork: spouseWork,
                    hpNo: hpNo,
                    emt: emt,
                    fmt: fmt,
                    dtl: dtl,
                    dateResign: dateResign,
                    dateConfirm: dateConfirm,
                    status: status,
                }).then((res) => {
                    alert(res.data.message);
                    history.push("/searchemployeetransaction");
                }).catch(err =>{
                    alert(err);
                })
            }
            // let costCenter = JSON.parse(c_Center);
            // console.log(costCenter.cost_centre);
            // alert(gd)
            // alert(gred.position)
            
        }
    }, [formErrors])

    const deleteEmployee = (e) =>{
        e.preventDefault();
        if (window.confirm("Do You Want To Delete The User?") == true) {
            Axios.delete(`http://localhost:3001/deleteEmployee/${tcNo}`)
            .then((response)=> {
                alert(response.data.message);
                history.push("/main");
            }).catch(err =>{
                alert(err);
            })
        }
    }

    const formatMartial = (m) =>{
        if(m === "S")return "Single"
        else if(m === "M") return "Married"
        else if(m === "D") return "Divorced"
        else return "Please Select"
    }


    return(
        <div className="addEmployee">
            <div className="addContainer">
            <h3 className="addTitle">Edit Employee</h3>
            <div className="addItem">
            <>
            <Form >
                <InputForm type="text" cId="" name="tcNo" value={empNo} 
                label="Employee No:" placeholder="TC No"
                onChange={(event) =>{
                    setEmpNo(event.target.value);
                }}/>
                <p className="errorText text-center">{formErrors.empNo}</p>

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
                        }}>
                            {/* {gred.grade && gred.position ? 
                            <option value={gred} hidden>{gred.grade+"-"+gred.position}</option>
                            : <option hidden >Please Select</option>} */}
                            <option hidden >
                                {empObj.grade+"-"+empObj.position}
                            </option>
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
                    {hasDep ? <Form.Select name="department" aria-label="Default select example" placeholder="JOi"
                        onChange={(event) =>{
                        setDep(event.target.value);
                        }}>
                            <option hidden>{depObj.dept_cod + "-" + depObj.dept_name}</option>
                            {optionDepartment.map((val) => {
                                return (
                                <option key={val.id} value={val.dept_cod}>
                                {val.dept_cod + "-" +val.dept_name}
                                </option>   
                                );
                            })}
                    
                        </Form.Select> : 
                        <Form.Select name="department" aria-label="Default select example" placeholder="JOi"
                        onChange={(event) =>{
                        setDep(event.target.value);
                        }}>
                            <option hidden>{department}</option>
                            {optionDepartment.map((val) => {
                                return (
                                <option key={val.id} value={val.dept_cod}>
                                {val.dept_cod + "-" +val.dept_name}
                                </option>   
                                );
                            })}
                    
                        </Form.Select>}
                    </Col>
                </Form.Group>
                <p className="errorText text-center">{formErrors.department}</p>

                <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Cost Center:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Select name="cCenter" aria-label="Default select example" placeholder="JOi"
                        onChange={(event) =>{
                        setCCenter(event.target.value);
                        }}>
                            <option hidden value={empObj.costcen}>{empObj.costcen + "-" + cCategory}</option>
                            {optionCentre.map((val) => {
                                return (
                                <option key={val.cost_id} value={val.cost_centre}>
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
                        }}>
                            <option value={plant} hidden>{plant}</option>
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
                        Date Confirm:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={dateConfirm} selected={dateConfirm} 
                        onChange={dateConfirm => setDateConfirm(dateConfirm)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Date Resign:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={dateResign} selected={dateResign} 
                        onChange={dateResign => setDateResign(dateResign)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Status:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Check
                            type="radio"
                            label="Active"
                            name="status"
                            id="Male"
                            value="Active"
                            checked={status.toUpperCase() === "ACTIVE"}
                            onChange={(event) =>{
                            setStatus(event.target.value);
                            }}/>
                        <Form.Check
                            type="radio"
                            label="Inactive"
                            name="status"
                            id="Inactive"
                            value="Inactive"
                            checked={status.toUpperCase() === "INACTIVE"}
                            onChange={(event) =>{
                            setStatus(event.target.value);
                            }}/>
                    </Col>
                </Form.Group>
                <p className="errorText text-center">{formErrors.status}</p>


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
                            checked={gender.toUpperCase() === "M"}
                            onChange={(event) =>{
                            setGender(event.target.value);
                            }}/>
                        <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            id="Female"
                            value="F"
                            checked={gender.toUpperCase() === "F"}
                            onChange={(event) =>{
                            setGender(event.target.value);
                        }}/>
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
                        <Form.Select name="maritial" placeholder="JOi" 
                        onChange={(event) =>{
                        setMaritial(event.target.value);
                        }}>
                            {/* <option value={maritialStatus}>{maritialStatus}</option> */}
                            {maritialStatus ? <option hidden value={maritialStatus}>{formatMartial(maritialStatus)}</option>
                            :<option hidden value="">Please Select</option>}
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
                            checked={spouseWork.toUpperCase() === "TRUE"}
                            onChange={(event) =>{
                            setSpouse(event.target.value);
                            }}/>
                        <Form.Check
                            type="radio"
                            label="No"
                            name="sWork"
                            id="No"
                            value="FALSE"
                            checked={spouseWork.toUpperCase() === "FALSE"}
                            onChange={(event) =>{
                            setSpouse(event.target.value);
                            }}/>
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
                label="Employee Dental Treatment:" placeholder="Dental Treatment Limit"
                onChange={(event) =>{
                    setDtl(event.target.value);
                }}/>
                <p className="errorText text-center">{formErrors.dtl}</p>

                <Form.Group as={Row} className="mt-5"
                controlId="formHorizontalPwd">
                    <Col className="me-4" 
                    sm={{span: 1, offset:6}}
                    md={{span: 1, offset:7}}
                    lg={{span: 1, offset:9}} >
                        <Button onClick={handleSubmit} type="submit">Submit</Button>
                    </Col>
                    <Col 
                    sm={{span: 1, offset:2}}
                    md={{span: 1, offset:1}}
                    lg={{span: 1, offset:0}} >
                        <Button variant="danger" onClick={deleteEmployee} type="submit">Delete</Button>
                    </Col>
                </Form.Group>
            </Form>
            </>
            </div>
            </div>
        </div>
    );
}

export default EditEmployee;