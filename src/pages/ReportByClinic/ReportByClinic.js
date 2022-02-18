import React, {useState, useEffect} from "react";
import {SearchCard, Wrapper} from "./ReportByClinic.styles"
import {Form, Button, Row, Col} from 'react-bootstrap';
import InputForm from "../../components/InputForm/InputForm"
import Axios from "axios";
import {Link} from "react-router-dom"
import DatePicker from "react-datepicker";
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import moment from "moment";



function ReportByClinic() {
    const [empId, setEmpId] = useState("");
    const [clinic, setClinic] = useState("");
    const [listClinic, setListClinic] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [report, setReport] = useState([])
    let i = 0;

    const formatType = (type) => {
        if(type == "I"){
            return "INVOICE";
        }
        else if(type === "C") return "CLAIM" ;
    }

    const formatDate = (date) => {
        if(date == "0000-00-00"){
            return "0000-00-00";
        }else if(date == ""){
            let today = new Date();
            return today;
        }
        var d = new Date(date);
        let theDate = moment(date).format("MMM Do YY");
        // let theDate = moment(date).subtract(1, 'days').format("MMM Do YY");
        return theDate ;
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/getClinic",).then((response) => {
            console.log(response);
            setListClinic(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    const handleReport= (e) => {
        e.preventDefault();
        Axios.get("http://localhost:3001/getReportByClinic",{
            params: {
                clinic: clinic,
                startDate: startDate,
                endDate: endDate
            }
        }).then((response) => {
            console.log(response.data)
            setReport(response.data);    
        })
        .catch(err =>{
            console.log(err);
        })
    }
    


    return (
        <div className="report">
            <div className="reportContainer">
            <h3 className="reportTitle mb-4">Report By Clinic</h3>
                <div className="reportForm">
                    <Form>
                    <Row className="">
                    <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>From:</Form.Label>
                            <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>To:</Form.Label>
                            <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}/>
                        </Form.Group>
                    </Row>


                    <Form.Group as={Row} className="my-4"
                    controlId="formHorizontalEmail">
                        <Form.Label column xs={12} sm={12} md={3} lg={2}>
                            Clinic:
                        </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={6}>
                        <Form.Select name="gred" aria-label="Default select example" placeholder="JOi"
                        onChange={(event) =>{
                        setClinic(event.target.value);
                        }}
                        >
                            <option>Please Select</option>
                            <option value="ALL">All</option>
                            {listClinic.map((val) => {
                                return (
                                <option key={val.clinic_id} 
                                value={val.clinic_code}>
                                {val.clinic_code + " - " + val.clinic_name}
                                </option>   
                                );
                            })}
                            
                        </Form.Select>
                    </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4"
                        controlId="formHorizontalPwd">
                    <Col xs={{span: 1, offset:7}}
                    sm={{span: 1, offset:8}}
                    md={{span: 1, offset:9}}
                    lg={{span: 1, offset:10}}
                    xl={{span: 1, offset:10}}>
                        {/* <Link to={{ pathname: '/displayreportbyclinic',
                        state: [{clinic: clinic, startDate: startDate, endDate: endDate}]
                        }}>  */}
                        <Button onClick={handleReport} type="submit">Search</Button>
                        {/* </Link> */}
                        
                    </Col>
                </Form.Group>
                    </Form>
                </div>
            </div>
            <div className="reportContainer">
            <ReactHTMLTableToExcel className="mb-3 btn btn-outline-secondary" 
            table="reportByClinic" filename="ReportbyClinic" sheet="Sheet" buttonText="Export to Excel"/>
            <h3 className="reportTitle mb-4">Report Details</h3>
                <table className="reportTable" id="reportByClinic">
                    <thead>
                        <tr>
                            <th className="reportTh">No</th>
                            <th className="reportTh">Date Visit</th>
                            <th className="reportTh">Employee No</th>
                            <th className="reportTh">Employee Name</th>
                            <th className="reportTh">Ic No</th>
                            <th className="reportTh">Dept. Code</th>
                            <th className="reportTh">Cost Center</th>
                            <th className="reportTh">Category</th>
                            <th className="reportTh">Clinic Code</th>
                            <th className="reportTh">Type</th>
                            {/* <th className="reportTh">Claim Type</th> */}
                            <th className="reportTh">Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map((val) => {
                            return(
                                <tr key={val.tr_id}>
                                    <td className="reportTd">{++i}</td>
                                    <td className="reportTd">{formatDate(val.tr_DateVisit)}</td>
                                    <td className="reportTd">{val.tr_EmployeeNo}</td>
                                    <td className="reportTd">{val.Name}</td>
                                    <td className="reportTd">{val.IcNo}</td>
                                    <td className="reportTd">{val.tr_deptCode}</td>
                                    <td className="reportTd">{val.tr_costCenterNo}</td>
                                    <td className="reportTd">{val.tr_costCenter}</td>
                                    <td className="reportTd">{val.tr_ClinicCode}</td>
                                    <td className="reportTd">{val.tr_Code}</td>
                                    {/* <td className="reportTd">{formatType(val.tr_type)}</td> */}
                                    <td className="reportTd">{val.tr_cost}</td>                                      
                                </tr>
                            )
                        })}
                    </tbody>
                        
                    
                </table>

            </div>
        </div>
    );
}

export default ReportByClinic;