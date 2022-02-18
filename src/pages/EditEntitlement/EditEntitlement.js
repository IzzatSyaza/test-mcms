import React, { useState, useEffect } from "react";
import { useParams, useHistory} from "react-router-dom"
import {Container, Form, Button, Row, Col} from 'react-bootstrap';
import InputForm from "../../components/InputForm/InputForm";
import "./editEntitlement.css"


import Axios from "axios";


function EditEntitlement() {
    const {grade} = useParams();
    const [position, setPosition] = useState([]);
    const [emt, setEmt] = useState("");
    const [fmt, setFmt] = useState("");
    const [dtl, setDtl] = useState("");
    const [cuba, setCuba] = useState("");
    const [entitlement, setEntitlement] = useState([]);
    var i = 0;

    let history = useHistory();

    

    useEffect(() => {
        Axios.get("http://localhost:3001/getpositionbygrade",{
            params: {
                grade: grade,
            }
        }).then((response) => {
            // console.log(response.data);
            setPosition(response.data)
            setCuba(response.data[0].position_desc)
        }).catch(err =>{
            alert(err);
        })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/getEntitlement",{
            params: {
                grade: grade,
            }
        }).then((response) => {
            console.log(response.data);
            setEntitlement(response.data)
        }).catch(err =>{
            alert(err);
        })
    }, []);

    const editEntitle = (event) => {
        event.preventDefault();
        Axios.put("http://localhost:3001/editentitlement", {
            grade: grade,
            emt: emt,
            fmt: fmt,
            dtl: dtl,
        }).then((res) => {
            alert(res.data.message);
            history.push("/selectgrade");
        }).catch(err =>{
            alert(err);
        })
    }

    return(
        <div className="editEntitlement">
            <Container>
                <Row>
                    <Col xs={12} sm={11} md={10} lg={8}>
                        <div className="editEntitlementContainer">
                        <h3 className="editEntitlementTitle">Edit Entitlement</h3>
                        <div className="tableContainer">
                            <table className="editEntitlementTable">
                            <tbody>
                                <tr>
                                    <th>Grade:</th>
                                    <td className="EntitlementTableTD">{grade.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <th>Position:</th>
                                    {position.map((val)=>{
                                return(
                                    <td key={val.id_position} className="EntitlementTableTD">
                                        {val.position_desc+","}
                                    </td>
                                );
                            })}
                                </tr>
                            </tbody>
                            </table>


                            {/* {cuba} */}
                        </div>
                        <div className="editEntitlementItem">
                        <Form>
                            <InputForm type="number" cId="" name="emt" value={emt}
                            label="Employee Medical Treatment (EMT):" placeholder="EMT"
                            onChange={(event) =>{
                                setEmt(event.target.value);
                            }}
                            />

                            <InputForm type="number" cId="" name="fmt" value={fmt}
                            label="Family Medical Treatment (FMT):" placeholder="FMT"
                            onChange={(event) =>{
                                setFmt(event.target.value);
                            }}/>


                            <InputForm type="number" cId="" name="dtl" value={dtl}
                            label="Employee Dental Treatment:" placeholder="Dental Treatment Limit"
                            onChange={(event) =>{
                                setDtl(event.target.value);
                            }}
                            />

                            <Form.Group as={Row} className="mt-4"
                            controlId="formHorizontalPwd">
                                <Col className="padding0" xs={{span: 1, offset:7}}
                                sm={{span: 1, offset:8}}
                                md={{span: 1, offset:9}}
                                lg={{span: 1, offset:10}}
                                >
                                    <Button onClick={editEntitle} type="submit">Submit</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                        </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={11} md={10} lg={4}>
                        <div className="editEntitlementContainer">
                            <h3 className="editEntitlementTitle">Entitlement</h3>
                            <table className="entitlementTable">
                                <thead>
                                    <tr>
                                        <th className="entitlementTh">MEDICAL CODE</th>
                                        <th className="entitlementTh">TOTAL(RM)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entitlement.map((val)=>{
                                        return(
                                            <tr key={++i}>
                                                <td className="entitlementTh">
                                                    {val.ent_medical}
                                                </td>
                                                <td className="entitlementAmount">
                                                    {val.ent_cost}
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

export default EditEntitlement;