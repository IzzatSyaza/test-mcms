import React , {useState, useEffect, useContext}from "react";
import ClinicFeature from "../../components/featureInfo/ClinicFeatured"
import {Row, Col, Container} from 'react-bootstrap';
import Axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import ClinicChart from "../../components/chart/ClinicChart";
import "./clinicMain.css"

function ClinicMainMenu() {
    Axios.defaults.withCredentials = true;
    const [transaction, setTransaction] = useState([]);
    const [clinic, setClinic]= useState("");
    const { authState } = useContext(AuthContext);


    function FormatDate(date) {
        var d = new Date(date);
        let theDate = moment(date).subtract(1, 'days').format("MMM Do YY");
        return theDate ;
    }

    const formatClaim = (type) => {
        if(type === "C"){
            return "Claim";
        }
        else if(type === "I") {
            return "Invoice";
        }
        else return ""
        
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/getClinicOnly",{
            params: {
                mcmsId: authState.mcms_id,
            }
        }).then((response) => {
            // console.log(response.data);
            setClinic(response.data[0].clinic_code);
            Axios.get("http://localhost:3001/getTransactionByClinic",{
                params: {
                    clinicCode: response.data[0].clinic_code,
                }
            }).then((res) => {
                setTransaction(res.data);
                console.log(res.data);
            })
            .catch((error) =>{
                console.log(error);
            })
            })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    return (
        <div className="clinicMain">
            <ClinicFeature/>
            <Container>
                <Row>
                    <Col>
                        <ClinicChart grid title="Transaction Analytics"/>
                    </Col>
                </Row>
                <Row>
                  <Col>
                  <div className="employeeInfo">
                  <ReactHTMLTableToExcel className="mb-3 btn btn-outline-secondary" 
            table="clinicTrans" filename="ReportbyMedicalType" sheet="Sheet" buttonText="Export to Excel"/>
                  <h3 className="mt-4 mb-3 entitlementTitle">Transaction Information</h3>
                    <table className="entitlementTable" id="clinicTrans">
                        <thead>
                            <tr>
                                <th className="entitlementTh">Date</th>
                                <th className="entitlementTh">Employee No</th>
                                <th className="entitlementTh">Employee Name</th>
                                <th className="entitlementTh">Code</th>
                                <th className="entitlementTh">Type of Claim</th>
                                <th className="entitlementTh">Family</th>
                                <th className="entitlementTh">Sickness</th>
                                <th className="entitlementTh">Cost(RM)</th>

                            </tr>
                        </thead>
                        <tbody>
                            {transaction.map((val) => {
                                return (
                                <tr key={val.tr_id}>
                                    <td className="entitlementAmount">{FormatDate(val.tr_DateVisit)}</td>    
                                    <td className="entitlementAmount">{val.tr_EmployeeNo}</td>                                        
                                    <td className="entitlementAmount">{val.Name.toUpperCase()}</td>                                        
                                    <td className="entitlementAmount">{val.tr_Code}</td>                                        
                                    <td className="entitlementAmount">{formatClaim(val.tr_type)}</td>                                        
                                    <td className="entitlementAmount">{val.tr_Family.toUpperCase()}</td>                                        
                                    <td className="entitlementAmount">{val.tr_sickness.toUpperCase()}</td>                                        
                                    <td className="entitlementAmount">{val.tr_cost}</td>                                        
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

export default ClinicMainMenu;