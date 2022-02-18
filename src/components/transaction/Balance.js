import React, {useEffect, useState} from "react";
import {Row, Col, Container} from 'react-bootstrap';
import Axios from "axios";
import { useParams, useHistory} from "react-router-dom"

function Balance() {
    const {tcNo} = useParams();
    const [empObject, setEmpObject] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [emtBal, setEmtBal] = useState(0);
    const [fmtBal, setFmtBal] = useState(0);
    const [edtBal, setEdtBal] = useState(0);
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
                // alert("The Employee does not exist")
            }
            else{
                setEmpObject(response.data[0]);
                Axios.get("http://localhost:3001/getEmtCost",{
                params: {tcNo: tcNo,}
                }).then((result) => {
                    setEmtBal(response.data[0].uop_ent - result.data[0].total); 
                })
                .catch((erro) =>{
                    console.log(erro);});

                Axios.get("http://localhost:3001/getFmtCost",{
                    params: {tcNo: tcNo,}
                }).then((resp) => {
                    setFmtBal(response.data[0].heal_entitle_1 - resp.data[0].total);
                })
                .catch((error) =>{
                    console.log(error);}) 

                Axios.get("http://localhost:3001/getEdtCost",{
                    params: {tcNo: tcNo,}
                }).then((res) => {
                    setEdtBal(response.data[0].dent_entitle - res.data[0].total);
                })
                .catch((errorr) =>{
                    console.log(errorr);})   
            }
             
        })
        .catch((err) =>{
            console.log(err);
        })
    }, []);
        
    return (
        <Container fluid>
            <Row>                     
                <Col>
                    <div className="entitlementContainer">
                        <h3 className="entitlementTitle">EMT</h3>
                        <table className="entitlementTable">
                            <thead>
                                <tr>
                                    <th className="entitlementTh">Entitlement</th>
                                    <th className="entitlementTh">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="entitlementAmount">{empObject.uop_ent}</td>
                                    <td className="entitlementAmount">{emtBal}</td>
                                </tr>
                            </tbody>  
                        </table>
                    </div>
                </Col>
                <Col>
                    <div className="entitlementContainer">
                        <h3 className="entitlementTitle">FMT</h3>
                        <table className="entitlementTable">
                            <thead>
                                <tr>
                                    <th className="entitlementTh">Entitlement</th>
                                    <th className="entitlementTh">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="entitlementAmount">{empObject.heal_entitle_1}</td>
                                    <td className="entitlementAmount">{fmtBal}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Col>
                <Col>
                    <div className="entitlementContainer">
                        <h3 className="entitlementTitle">DTL</h3>
                        <table className="entitlementTable">
                            <thead>
                                <tr>
                                    <th className="entitlementTh">Entitlement</th>
                                    <th className="entitlementTh">Balance</th>
                                </tr>
                            </thead>
                                <tbody>
                                    <tr>
                                    <td className="entitlementAmount">{empObject.dent_entitle}</td>
                                    <td className="entitlementAmount">{edtBal}</td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Balance;