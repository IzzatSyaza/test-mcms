import React, {useState} from "react";
import {Form, Button, Row, Col} from 'react-bootstrap';
import InputForm from "../../components/InputForm/InputForm"
import {useHistory} from "react-router-dom";
import "./searchemployee.css";
import Axios from "axios";


function ClinicSearchEmp() {
    const [empId, setEmpId] = useState("");
    let history = useHistory();

    const searchEmp = (e) => {
        e.preventDefault();
        Axios.get("http://localhost:3001/getemployee",{
            params: {
                empId: empId,
            }
        }).then((response) => {
            if(typeof response.data[0] === "undefined" 
            || response.data[0] === null 
            || response.data[0].length === null 
            || response.data[0].length === 0){
                alert("The Employee does not exist")
            }
            else{
                history.push("/clinicDisplayEmp/"+empId);
            }
        })
        .catch((err) =>{
            alert(err);
        })
    }

    return (
        <div className="search">
                
                <div className="searchItem">
                <h3 className="searchTitle">Search Employee</h3>
                <div className="searchFormContainer">
                    <Form>
                    <InputForm type="text" cId="" name="empId" value={empId}
                    label="TC Number:" placeholder="TC No"
                    onChange={(event) =>{
                        setEmpId(event.target.value);
                    }}    
                    />

                    <Form.Group as={Row} className="mb-4"
                        controlId="formHorizontalPwd">
                    <Col xs={{span: 1, offset:7}}
                    sm={{span: 1, offset:8}}
                    md={{span: 1, offset:9}}
                    lg={{span: 1, offset:10}}
                    xl={{span: 1, offset:10}}>
                        <Button onClick={searchEmp}  type="submit">Submit</Button>
                        {/* <Switch>
                            <Route path={"/:"+} children={<Child />} />
                        </Switch> */}
                    </Col>
                </Form.Group>
                    </Form>
                </div>
                </div>
        </div>
    );
}

export default ClinicSearchEmp;