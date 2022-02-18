import React, {useState, useEffect} from "react";
import {SearchCard, Wrapper} from "./ReportByMed.styles"
import TopNavbar from "../../components/Navbar/TopNavbar";
import Foot from "../../components/Footer/Footer";
import {Table, Button, Form, Row, Col} from "react-bootstrap"
import InputForm from "../../components/InputForm/InputForm"
import Axios from "axios";
import {useLocation} from "react-router-dom"
import DatePicker from "react-datepicker";


function DisplayReportByDept(props) {
    // const [empId, setEmpId] = useState("");
    // const [clinic, setClinic] = useState("");
    // const [listClinic, setListClinic] = useState([])
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());
    
    // const location = useLocation();
    const [report, setReport] = useState(props.obj)
    var i = 0;


    return (
        <div>
            <Table striped bordered hover size="xl" responsive="md">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>EMPLOYEE NO</th>
                        <th>NAME</th>
                        <th>IC NO</th>
                        <th>DATE JOIN</th>
                        <th>MEDICAL CODE</th>
                        <th>TYPE</th>
                        <th>BALANCE</th>
                        <th>COST</th>


                    </tr>
                </thead>
                <tbody>
                    {/* <Wrapper> */}
                    {report.map((val)=>{
                        return(
                        <tr key={val.tr_id}>
                            <td>{++i}</td>
                            <td>{val.tr_deptCode}</td>
                            <td>{val.tr_deptCode}</td>
                            <td>{val.tr}</td>
                            <td>{val.child_dob}</td>
                            <td>{val.child_marital_status}</td>
                            <td>{val.child_study_status}</td>
                            <td>{val.child_study_status}</td>
                            <td>{val.child_study_status}</td>

                        </tr>)
                    })}
                </tbody>
            </Table>  
        </div>
    );
}

export default DisplayReportByDept;