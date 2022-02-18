import React, {useEffect, useState} from "react";
import {Row, Col, Container} from 'react-bootstrap';
import Axios from "axios";
import { useParams} from "react-router-dom"
import "./clinicDisplayEmp.css"
import Spouse from "../../components/Family/Spouse";
import Child from "../../components/Family/Child";
import Balance from "../../components/transaction/Balance";



function ClinicDisplayFamily() {
    const {tcNo} = useParams();
    const [empObject, setEmpObject] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [relationList, setRelationList]= useState([]);
    const [hasRelation, setHasRelation]= useState(false);
    const [emtCost, setEmtCost] = useState(0);
    const [fmtCost, setFmtCost] = useState(0);
    const [edtCost, setEdtCost] = useState(0);
    const [balance, setBalance] = useState({emt: 0, fmt: 0, edt: 0,});

    useEffect(() => {
        Axios.get("http://localhost:3001/getemployee",{
            params: {
                empId: tcNo,
            }
        }).then((response) => {
            setEmpObject(response.data[0]);
            Axios.get("http://localhost:3001/getEmtCost",{
                params: {tcNo: tcNo,}
            }).then((result) => {
                setEmtCost(result.data[0].total);
                Axios.get("http://localhost:3001/getFmtCost",{
                    params: {tcNo: tcNo,}
                }).then((resp) => {
                    setFmtCost(resp.data[0].total);
                    Axios.get("http://localhost:3001/getEdtCost",{
                        params: {tcNo: tcNo,}
                    }).then((res) => {
                        setEdtCost(res.data[0].total);
                        setBalance({ 
                            emt: response.data[0].uop_ent - result.data[0].total,
                            fmt: response.data[0].heal_entitle_1 - resp.data[0].total,
                            edt: response.data[0].dent_entitle - res.data[0].total,})
                    })
                    .catch((errorr) =>{
                        console.log(errorr);})
                })
                .catch((error) =>{
                    console.log(error);})
            })
            .catch((erro) =>{
                console.log(erro);});
        })
        .catch((err) =>{
            console.log(err);
        })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/getEmployeeTransaction",{
            params: {
                empId: tcNo,
            }
        }).then((response) => {
            // console.log(response.data);
            setTransaction(response.data);
            console.log(response.data);
        })
        .catch((err) =>{
            console.log(err);
        })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/getRelation",{
            params: {
                empId: tcNo,
            }
        }).then((response) => {
            // console.log(response.data);
            setRelationList(response.data[0]);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    useEffect(() => {
        // console.log(relationList)
        if(typeof relationList === "undefined" 
                || relationList === null 
                || relationList.length === null 
                || relationList.length === 0)
                {
                    setHasRelation(false);
                }
                
            else{
                setHasRelation(true);
            }
    }, [relationList])

    const child = (no, name, jantina, mykid, bod) =>{
        if(typeof name != "undefined" 
            && name != null 
            && name.length != null 
            && name.length > 0) {
            return (<tr>
                <td className="entitlementAmount">{no}</td>                                                                               
                <td className="entitlementAmount">{name}</td>    
                <td className="entitlementAmount">{jantina}</td>                                        
                <td className="entitlementAmount">{mykid}</td>                                        
                <td className="entitlementAmount">{bod}</td> 
            </tr>)
        }
        else{
            return(
                <tr>
                    <td className="entitlementAmount"></td>                                                                               
                    <td className="entitlementAmount"></td>    
                    <td className="entitlementAmount"></td>                                        
                    <td className="entitlementAmount"></td>                                        
                    <td className="entitlementAmount"></td> 
                </tr>
            )
        }
    }

    return (
    <div className="displayEmployee">
    <div>
        <Balance/>
    </div>
    <Container>
    <Row>
        <Col xs={12} md={7}>
            <div className="employeeInfo">
                <Spouse tcNo={tcNo}/>
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
            <Child tcNo={tcNo}/>
        </Col>
    </Row>
    </Container>
    </div>
    );
}

export default ClinicDisplayFamily;