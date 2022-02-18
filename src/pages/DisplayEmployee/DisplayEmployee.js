import React, {useEffect, useState} from "react";
import {Button, Row, Col, Container} from 'react-bootstrap';
import Axios from "axios";
import { useParams, Link, useHistory} from "react-router-dom"
import "./displayEmployee.css"
import Balance from "../../components/transaction/Balance";
import moment from "moment";
import {MdOutlineEdit, MdDeleteOutline} from "react-icons/md";


function DisplayEmployee() {
    const {tcNo} = useParams();
    const [empObject, setEmpObject] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [emtCost, setEmtCost] = useState(0);
    const [fmtCost, setFmtCost] = useState(0);
    const [edtCost, setEdtCost] = useState(0);
    let history = useHistory();


    function FormatDate(date) {
        if(date == "0000-00-00"){
            return "0000-00-00";
        }
        var d = new Date(date);
        let theDate = moment(date).format("MMM Do YY");
        // let theDate = moment(date).subtract(1, 'days').format("MMM Do YY");
        return theDate ;
      }
      
      const formatClaim = (type) => {
        if(type === "C"){
            return "CLAIM";
        }
        else if(type === "I") {
            return "INVOICE";
        }
        else return ""
        
      }

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
                history.push("/searchemployeetransaction/");
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


    useEffect(() => {
        Axios.get("http://localhost:3001/getEmployeeTransaction",{
            params: {
                empId: tcNo,
            }
        }).then((response) => {
            console.log(response.data);
            setTransaction(response.data);
        })
        .catch((err) =>{
            console.log(err);
        })
    }, []);

    const FormatMarital = (marital) => {
        if(marital === "M") return "MARRIED";
        else if (marital === "S") return "SINGLE";
        else return "";

    }

    const FormatGender = (gender) => {
        if(gender === "M") return "MALE";
        else if (gender === "F") return "FEMALE";
        else return "";
    }

    const deleteTransaction = (e, id) =>{
        e.preventDefault();
        if (window.confirm("Do You Want To Delete The Transaction?") == true) {
            Axios.delete(`http://localhost:3001/deleteTransaction/${id}`)
            .then((response)=> {
                alert(response.data.message);
                setTransaction(transaction.filter((val) => {
                    return val.tr_id != id
                }))
            }).catch(err =>{
                alert(err);
            })
        }

    }

    return (
    <div className="displayEmployee">
    <div>
        <Balance/>
    </div>
    <Container>
    <Row>
        <Col xs={12} sm={11} md={10} lg={7}>
            <div className="employeeInfo">
                <div>
                    <Row>
                        <Col xs={3} md={3}>
                            <Link to={"/AdminDisplayFamily/"+tcNo}>
                                <Button variant="secondary" >
                                    <span className="btnItem">Family</span>
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={3}>
                            <Link to={"/EditEmployee/"+tcNo}>
                                <Button variant="outline-secondary">
                                    <span className="btnItem">Edit</span> 
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
                <h3 className="mt-3 entitlementTitle">Employee Information</h3>
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
                                    <td className="entitlementAmount">{FormatMarital(empObject.MaritalStatus)}</td>
                                </tr>
                                <tr>
                                    <th className="entitlementTh">Gender</th>
                                    <td className="entitlementAmount">{FormatGender(empObject.gender)}</td>
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
                                    <td className="entitlementAmount">{FormatDate(empObject.Resign)}</td>
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
    <Row>
        <Col>
        <div className="employeeInfo">
            <div className="transactionBtn">
                <Link to={"/AdminTransaction/"+tcNo}>
                    <Button variant="outline-secondary" >New Transaction</Button>
                </Link>
            </div>
        <h3 className="mt-4 mb-3 entitlementTitle">Employee Transaction Information</h3>
        
            <table className="entitlementTable">
                <thead>
                    <tr>
                        <th className="entitlementTh">Date</th>
                        <th className="entitlementTh">Clinic Code</th>
                        <th className="entitlementTh">Clinic Name</th>
                        <th className="entitlementTh">Code</th>
                        <th className="entitlementTh">Type of Claim</th>
                        <th className="entitlementTh">Family</th>
                        <th className="entitlementTh">Sickness</th>
                        <th className="entitlementTh">Cost(RM)</th>
                        <th className="entitlementTh">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {transaction.map((val) => {
                        return (
                        <tr key={val.tr_id}>
                            <td className="entitlementAmount">{FormatDate(val.tr_DateVisit)}</td>    
                            <td className="entitlementAmount">{val.tr_ClinicCode}</td>                                        
                            <td className="entitlementAmount">{val.clinic_name}</td>                                        
                            <td className="entitlementAmount">{val.tr_Code}</td>                                        
                            <td className="entitlementAmount">{formatClaim(val.tr_type)}</td>                                        
                            <td className="entitlementAmount">{val.tr_Family}</td>                                        
                            <td className="entitlementAmount">{val.tr_sickness}</td>                                        
                            <td className="entitlementAmount">{val.tr_cost}</td>
                            <td className="listClinicAction">
                                <Link to={`/editTransaction/${tcNo}/${val.tr_id}`}>
                                <Button variant="warning" className="listButton">
                                    <MdOutlineEdit className="listIcon"/>Edit
                                </Button></Link>
                                <Button variant="danger" className="listButton" onClick={(e)=>{deleteTransaction(e, val.tr_id)}}>
                                    <MdDeleteOutline className="listIcon"/>Delete
                                </Button>
                            </td>                                      
                        </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </Col>
    </Row>
    </Container>
    </div>
    );
}

export default DisplayEmployee;