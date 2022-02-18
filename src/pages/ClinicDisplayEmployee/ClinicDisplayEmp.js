import React, {useEffect, useState} from "react";
import {Button, Row, Col, Container} from 'react-bootstrap';
import Axios from "axios";
import { useParams, Link, useHistory} from "react-router-dom"
import "./clinicDisplayEmp.css"
import Balance from "../../components/transaction/Balance";



function ClinicDisplayEmp() {
    const {tcNo} = useParams();
    const [empObject, setEmpObject] = useState([]);
    const [emtCost, setEmtCost] = useState(0);
    const [fmtCost, setFmtCost] = useState(0);
    const [edtCost, setEdtCost] = useState(0);
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
                history.push("/clinicSearchEmp/");
            }
            else{
                setEmpObject(response.data[0]);
            }
        })
        .catch((err) =>{
            console.log(err);
        })
    }, []);
    
    useEffect(() => {
        Axios.get("http://localhost:3001/getEmtCost",{
            params: {tcNo: tcNo,}
        }).then((result) => {
            setEmtCost(result.data[0].total);
        })
        .catch((error) =>{
            console.log(error);});
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/getFmtCost",{
            params: {tcNo: tcNo,}
        }).then((resp) => {
            setFmtCost(resp.data[0].total);
        })
        .catch((error) =>{console.log(error);});
    }, []);


    useEffect(() => {
        Axios.get("http://localhost:3001/getEdtCost",{
            params: {tcNo: tcNo,}
        }).then((res) => {
            setEdtCost(res.data[0].total);
        })
        .catch((error) =>{
            console.log(error);})
    }, []);

    return (
    <div className="displayEmployee">
    <div>
        <Balance/>
    </div>
    <Container>
    <Row>
        <Col xs={12} md={7} lg={7}>
            <div className="employeeInfo">
                <div>
                    <Row>
                        <Col xs={3} md={3}>
                            <Link to={"/clinicDisplayFamily/"+tcNo}>
                                <Button variant="secondary" >
                                    Family
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={3}>
                            <Link to={"/clinicTransaction/"+tcNo}>
                                <Button variant="outline-secondary">
                                    Transaction
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
                <h3 className="mt-3 mb-2 entitlementTitle">Employee Information</h3>
                <div>
                    <table className="entitlementTable">
                        <tbody>
                            <tr>
                                <th className="entitlementTh">TC Number</th>
                                <td className="entitlementAmount">{empObject.EmployeeNo}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Name</th>
                                <td className="entitlementAmount">{empObject.Name}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Identification No</th>
                                <td className="entitlementAmount">{empObject.IcNo}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Position</th>
                                <td className="entitlementAmount">{empObject.position}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Department</th>
                                <td className="entitlementAmount">{empObject.dep_name}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Marital Status</th>
                                <td className="entitlementAmount">{empObject.MaritalStatus}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Gender</th>
                                <td className="entitlementAmount">{empObject.gender}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Age</th>
                                <td className="entitlementAmount">{empObject.age}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Plant</th>
                                <td className="entitlementAmount">{empObject.plant}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Resign Date</th>
                                <td className="entitlementAmount">{empObject.Resign}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Col>
        <Col>
        <div className="employeeInfo">
            <h3 className="entitlementTitle">Medical Cost Information</h3>
                <div>
                    <table className="entitlementTable">
                        <thead>
                            <tr>
                                <th className="entitlementTh">MEDICAL CODE</th>
                                <th className="entitlementTh">TOTAL(RM)</th>
                            </tr>
                        </thead>
                        <tbody>
                             <tr>
                                <th className="entitlementTh">EMT</th>
                                <td className="entitlementAmount">{emtCost}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">FMT</th>
                                <td className="entitlementAmount">{fmtCost}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">DTL</th>
                                <td className="entitlementAmount">{edtCost}</td>
                            </tr>
                        </tbody>                                                                           
                    </table>
                </div>
            </div>
        </Col>
    </Row>
    </Container>
    </div>
    );
}

export default ClinicDisplayEmp;