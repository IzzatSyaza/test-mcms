import React, {useState, useEffect} from "react";
import {SearchCard, Wrapper} from "./Select.styles"
import {Form, Button, Row, Col} from 'react-bootstrap';
import Axios from "axios";
import {Link, useHistory} from "react-router-dom"
import InputForm from "../../components/InputForm/InputForm"
import "./selectGrade.css"


function SelectGrade() {
    const [grade, setGrade] = useState("");
    const [position, setPosition] = useState([]);
    let history = useHistory();

    // const [employeeList, setEmployeeList] = useState([]);

    // const getEmployee = (event) => {
    //     event.preventDefault();
    //     Axios.get("http://localhost:3001/getemployee",{
    //         params: {
    //             empId: empId,
    //         }
    //     }).then((response) => {
    //         // console.log(response.data);
    //         setEmployeeList(response.data);
    //         console.log(employeeList);
    //     })
    // }

    const searchGrade = (e) => {
        e.preventDefault();
        Axios.get("http://localhost:3001/getpositionbygrade",{
            params: {
                grade: grade,
            }
        }).then((response) => {
            if(typeof response.data[0] === "undefined" 
            || response.data[0] === null 
            || response.data[0].length === null 
            || response.data[0].length === 0){
                alert("The Grade does not exist")
            }
            else{
                history.push("/EditEntitlement/"+grade);
            }
        })
        .catch(err =>{
            alert(err);
        })
    };



    return (
        <div className="selectGrade">
            <div className="selectItem">
            <h3 className="searchTitle">Select Grade</h3>
                <div className="selectFormContainer">
                    <Form>
                    <InputForm type="text" cId="" name="grade" value={grade}
                    label="Grade:" placeholder="Grade"
                    onChange={(event) =>{
                        setGrade(event.target.value);
                    }}    
                    />
                    {/* <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalEmail">
                        <Form.Label column xs={12} sm={12} md={4} lg={4}>
                            Grade:
                        </Form.Label>
                        <Col xs={12} sm={12} md={8} lg={8}>
                            <Form.Select name="gred" aria-label="Default select example" placeholder="JOi"
                            onChange={(event) =>{
                            setGrade(event.target.value);
                            }}>
                                <option>Please Select</option>
                                {position.map((val) => {
                                    return (
                                    <option key={val.id_position} 
                                    value={val.position_code}>
                                    {val.position_code + "-" + val.position_desc}
                                </option>   
                                    );
                            })}
                            
                            </Form.Select>
                        </Col>
                    </Form.Group> */}

                    <Form.Group as={Row} className="mb-4"
                        controlId="formHorizontalPwd">
                    <Col xs={{span: 1, offset:7}}
                    sm={{span: 1, offset:8}}
                    md={{span: 1, offset:9}}
                    lg={{span: 1, offset:10}}>
                        {/* <Link to={`/EditEntitlement/${grade}`}>  */}
                        <Button onClick={searchGrade} type="submit">Submit</Button>
                        {/* </Link> */}
                    </Col>
                </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SelectGrade;