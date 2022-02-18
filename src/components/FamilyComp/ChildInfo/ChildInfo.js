import Axios from "axios";
import React, {useState} from "react";
import {Table, Button, Form, Row, Col} from "react-bootstrap"
import {Link} from "react-router-dom"
// import {Wrapper} from "./DisplayFamilly.styles"

function ChildInfo(props) {
    const [childObj, setChildObj] =useState(props.obj)
    var i = 0;

    const deleteChild = (e, id) =>{
        Axios.delete(`http://localhost:3001/deletechild/${id}`).then((response)=> {
            setChildObj(childObj.filter((val) => {
                return val.child_id !== id
            }))
        })
    }

    function FormatDate(thedate) {
        var d = new Date(thedate);
        const bornYear = d.getFullYear();
        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth();
        const age = thisYear - bornYear;

        if (age === 0){
            const bornMonth = d.getMonth();
            const month = thisMonth - bornMonth;
            return month + " Month Old";
        }

        return age ;
    }


    const setChild = (e, val) => {
        localStorage.setItem("name", val.child_name);
        localStorage.setItem("ic", val.child_ic);
        localStorage.setItem("gender", val.child_gender);
        localStorage.setItem("dob", val.child_dob);
        localStorage.setItem("maritalStatus", val.child_marital_status);
        localStorage.setItem("studyStatus", val.child_study_status);
    }

    return(
    <div>
    <Table striped bordered hover size="xl" responsive="md">
    <thead>
        <tr>
            <th>No</th>
            <th>Name</th>
            <th>Identification No</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Marital Status</th>
            <th>Study Status</th>
            <th>Action</th>

        </tr>
    </thead>
    <tbody>
        {/* <Wrapper> */}
        {childObj.map((val)=>{
            return(
            <tr key={val.child_id}>
                <td>{++i}</td>
                <td>{val.child_name}</td>
                <td>{val.child_ic}</td>
                <td>{val.child_gender}</td>
                <td>{FormatDate(val.child_dob)}</td>
                <td>{val.child_marital_status}</td>
                <td>{val.child_study_status}</td>
                <td>
                    <Link to={"/editchild/"+props.tcNo+"/"+val.child_id}>
                    <Button 
                    onClick={(e) => setChild(e, val)}>
                        Edit
                    </Button> 
                    </Link>
                    <Button onClick={(e) => {deleteChild(e, val.child_id)}}>Delete</Button>
                </td>
            </tr>)
        })}
    </tbody>
    </Table>   
    <Form.Group as={Row} className="mb-4"
    controlId="formHorizontalPwd">
        <Col xs={{span: 4, offset:10}}
        sm={{span: 4, offset:10}}
        md={{span: 4, offset:10}}
        lg={{span: 4, offset:10}}
        xl={{span: 4, offset:11}}>
            <Link to={"/addchildren/"+props.tcNo}> 
                <Button  type="submit">Add Child</Button>
            </Link>
        </Col>
    </Form.Group>     
        {/* </Wrapper> */}
    </div>
    );
}

export default ChildInfo