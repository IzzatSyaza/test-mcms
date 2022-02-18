import React, {useState} from "react";
import {Form, Button, Row, Col} from 'react-bootstrap';
import InputForm from "../../components/InputForm/InputForm"
import {useHistory} from "react-router-dom";
import "./searchemployee.css";
import Axios from "axios";


function SearchEditEmp() {
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
                history.push("/EditEmployee/"+empId);
            }
        })
        .catch((err) =>{
            alert(err);
        })
    }

    return (
        <div className="search">
                
                <div className="searchItem">
                <span className="searchTitle">Search Employee</span>
                <div className="searchFormContainer">
                    <Form>
                    <InputForm type="text" cId="" name="empId" value={empId}
                    label="TC Number:" placeholder="TC No"
                    onChange={(event) =>{
                        setEmpId(event.target.value);
                    }}    
                    />

                    <Form.Group as={Row} className="mt-5"
                        controlId="formHorizontalPwd">
                    <Col xs={{span: 1, offset:8}}
                    sm={{span: 1, offset:9}}
                    md={{span: 1, offset:10}}
                    lg={{span: 1, offset:10}}>
                        {/* <Link to={"/EditEmployee/"+empId}>  */}
                        <Button onClick={searchEmp} type="submit">Submit</Button>
                        {/* </Link> */}
                        {/* <Switch>
                            <Route path={"/:"+} children={<Child />} />
                        </Switch> */}
                    </Col>
                </Form.Group>
                    </Form>
                    {/* {employeeList.map((val) => {
                        return (<div>
                        {val.Name}
                        </div>);
                    })} */}
                </div>
                </div>
        </div>
    );
}

export default SearchEditEmp;