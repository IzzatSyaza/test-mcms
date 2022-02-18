import React , {useState, useEffect}from "react";
import {Row, Col, Container} from 'react-bootstrap';
import Cardmenu from "../../components/Cardmenu/Cardmenu";
import { Wrapper } from "./Main.styles";
import Axios from "axios";
import "./main.css";
import FeaturedInfo from "../../components/featureInfo/FeaturedInfo"
import ClinicFeature from "../../components/featureInfo/ClinicFeatured"
import moment from "moment";
import Chart from "../../components/chart/Chart";


function Main() {
  Axios.defaults.withCredentials = true;
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/getTransaction").then((response) => {
        setTransaction(response.data);
        // console.log(response.data);
    })
    .catch((err) =>{
        console.log(err);
    })
}, []);

function FormatDate(date) {
  var d = new Date(date);
  let theDate = moment(date).format("MMM Do YY");
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


    return (
    <div className="main">
      <FeaturedInfo/>
      <Container>
        <Row>
          <Col>
            <Chart grid title="Transaction Analytics"/>
          </Col>
        </Row>
        <Row>
          <Col>
          <div className="employeeInfo">
          <h3 className="mt-4 mb-3 entitlementTitle">Transaction Information</h3>
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

                    </tr>
                </thead>
                <tbody>
                    {transaction.map((val) => {
                        return (
                        <tr key={val.tr_id}>
                            <td className="entitlementAmount">{FormatDate(val.tr_DateVisit)}</td>    
                            <td className="entitlementAmount">{val.tr_ClinicCode}</td>                                        
                            <td className="entitlementAmount">{val.clinic_name.toUpperCase()}</td>                                        
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
     
      </div>);
}

export default Main;