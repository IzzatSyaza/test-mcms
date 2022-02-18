import React, { useState, useEffect } from "react";
import {Form, Button, Row, Col} from 'react-bootstrap';
import InputForm from "../../components/InputForm/InputForm"
import DatePicker from "react-datepicker";
import Axios from "axios";
import { useParams, useHistory} from "react-router-dom";
import "./adminTransaction.css"
import Balance from "../../components/transaction/Balance";
import moment from "moment";


function EditTransaction() {
    const {tcNo} = useParams();
    const {trId} = useParams();
    const [medicalType, setMedicalType]= useState("");
    const [clinic, setClinic]= useState("");
    const [claimType, setClaimType]= useState("");
    const [relation, setRelation]= useState("");
    const [sickness, setSickness]= useState("");
    const [cost, setCost]= useState("");
    const [dateVisit, setDateVisit] = useState(new Date());
    const [clinicName, setClinicName]= useState("");


    const [clinicList, setClinicList] = useState([]);
    const [relationList, setRelationList]= useState([]);
    const [hasRelation, setHasRelation]= useState(false);
    const [empObject, setEmpObject] = useState([]);

    const [cCategory, setCCategory] = useState("");
    const [costCen, setCostCen] = useState("");
    const [deptCode, setDeptCode] = useState("");

    const [emtBal, setEmtBal] = useState(0);
    const [fmtBal, setFmtBal] = useState(0);
    const [edtBal, setEdtBal] = useState(0);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    let history = useHistory();

    function FormatDate(theDate) {
        if(theDate == "0000-00-00"){
            let today = new Date();
            return today;
        }
        else{
            let d = new Date(theDate);
            let date = new Date( d.getTime() + Math.abs(d.getTimezoneOffset()*60000));
        return d ;
        }
        
    }


    useEffect(() => {
        Axios.get("http://localhost:3001/getemployee",{
            params: {
                empId: tcNo,
            }
        }).then((response) => {
            setEmpObject(response.data[0]);
            setCostCen(response.data[0].costcen);
            setDeptCode(response.data[0].dep_name);

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
            }).then((re) => {
                setEdtBal(response.data[0].dent_entitle - re.data[0].total);
            })
            .catch((errorr) =>{
                console.log(errorr);})    


            Axios.get("http://localhost:3001/getCategory",{
                params: {
                    cCentre: response.data[0].costcen,
                }
            }).then((res) => {
                setCCategory(res.data[0].cost_category);
                console.log(res.data[0])
                console.log("ok category")
            
            })
            .catch(error =>{
                console.log(error);
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/getClinic").then((response) => {
            // console.log(response.data);
            setClinicList(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/getClinicByCode",{
            params: {
                code: clinic,
            }
        }).then((response) => {
            setClinicName(response.data[0].clinic_name);
        })
        .catch(err =>{
            // console.log(err);
        })
    }, [clinic]);

    useEffect(() => {
        Axios.get("http://localhost:3001/getTransactionByTrID",{
            params: {
                id: trId,
            }
        }).then((response) => {
            setMedicalType(response.data[0].tr_Code);
            setClinic(response.data[0].tr_ClinicCode);
            setClaimType(response.data[0].tr_type);
            setRelation(response.data[0].tr_Family);
            setSickness(response.data[0].tr_Sickness);
            setCost(response.data[0].tr_cost);
            setDateVisit(FormatDate(response.data[0].tr_DateVisit));
            
        })
        .catch(err =>{
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


    const family = (name) =>{
        if(typeof name != "undefined" 
            && name != null 
            && name.length != null 
            && name.length > 0) {
            return (
                <option 
                value={name}>
                {name}
                </option>
            )
        }
        else{
            return( null
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate());
        setIsSubmit(true);
    }

    const validate = () => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!medicalType){
            errors.medicalType = "Transaction Medical Type is required!";
        }
        if (!claimType){
            errors.claimType = "Transaction Claim Type is required!";
        }else if(medicalType === "EMT"){
            if(cost > emtBal){errors.balance = "Transaction Cost Exceed Maximum Balance!";}
        }
        else if(medicalType === "FMT"){
            if(cost > fmtBal){errors.balance = "Transaction Cost Exceed Maximum Balance!";}
        }
        else if(medicalType === "FMT"){
            if(cost > edtBal){errors.balance = "Transaction Cost Exceed Maximum Balance!";}
        }

        if (!sickness){
            errors.sickness = "Transaction Sickness is required!";
        }
        if (!cost){
            errors.charge = "Transaction Charge is required!";
        }else if(cost < 0){errors.charge = "Transaction Charge must be positive";}

        return errors
    }

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            Axios.put("http://localhost:3001/editTransaction", {
            id: trId,
            tcNo: tcNo,
            dateVisit: dateVisit,
            relation: relation,
            sickness: sickness,
            type: claimType,
            clinicCode: clinic,
            cost: cost,
            medicalType: medicalType,
            cCategory: cCategory,
            costCen: costCen,
            deptCode: deptCode,
        }).then((res) => {
            alert(res.data.message);
            history.push("/main");
        }).catch(err =>{
            alert(err);
        })
        }
    }, [formErrors])

    return (
    <div className="adminTransaction">
        <div>
            <Balance/>
        </div>
        <div className="adminTransactionContainer">
        <h3 className="adminTransactionTitle">Transaction</h3>
            <div className="addItem">
                <Form>
                <Form.Group as={Row} className="mb-4"
                    controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Date Visit:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={dateVisit} selected={dateVisit} 
                        onChange={dateVisit => setDateVisit(dateVisit)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Clinic:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Select aria-label="Default select example" placeholder="JOi"
                        onChange={(event) =>{
                        setClinic(event.target.value);
                        }}>
                            {clinic ? <option hidden value={clinic}>{clinic}-{clinicName}</option> 
                            :<option hidden>Please Select</option>}
                            {clinicList.map((val) => {
                                return (
                                <option key={val.clinic_id} 
                                value={val.clinic_code}>
                                {val.clinic_name}
                                </option>   
                                );
                            })}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <p className="errorText text-center">{formErrors.medicalType}</p>

                <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Medical Type:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <Form.Select aria-label="Default select example" placeholder="JOi"
                        onChange={(event) =>{
                        setMedicalType(event.target.value);
                        }}>
                            <option hidden value={medicalType}>{medicalType}</option>
                            <option value="EMT">EMT</option>
                            <option value="FMT">FMT</option>
                            <option value="EDT">EDT</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <p className="errorText text-center">{formErrors.medicalType}</p>

                <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                    <Form.Label column xs={12} sm={12} md={3} lg={3}>
                        Relation:
                    </Form.Label>
                    <Col xs={12} sm={12} md={8} lg={8}>
                    {hasRelation ?  <Form.Select aria-label="Default select example" placeholder="JOi"
                    onChange={(event) =>{
                    setRelation(event.target.value);
                    }} >

                        {relation? <option hidden value={relation}>{relation}</option> :
                        <option>Please Select</option>}
                        {family(relationList.Name_spouse)}
                        {family(relationList.nama_anak1)}
                        {family(relationList.nama_anak2)}
                        {family(relationList.nama_anak)}
                        {family(relationList.nama_anak4)}
                        {family(relationList.nama_anak5)}
                        {family(relationList.nama_anak6)}
                        {family(relationList.nama_anak7)}
                        {family(relationList.nama_anak8)}
                        {family(relationList.nama_anak9)}
                        {family(relationList.nama_anak10)}
                    </Form.Select> :
                    <Form.Select aria-label="Default select example" placeholder="JOi"
                    onChange={(event) =>{
                    setRelation(event.target.value);
                    }} >

                        <option>Please Select</option>
                    </Form.Select>} 
                                        
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4"
                controlId="formHorizontalEmail">
                <Form.Label column xs={12} sm={12} md={3} lg={3}>
                    Type of Claim:
                </Form.Label>
                <Col xs={12} sm={12} md={8} lg={8}>
                    <Form.Check
                        type="radio"
                        label="Claim"
                        name="StatusClinic"
                        id="Claim"
                        value="C"
                        checked={claimType.toUpperCase() === "C"}
                        onChange={(event) =>{
                        setClaimType(event.target.value);
                        }}
                    />
                    <Form.Check
                        type="radio"
                        label="Invoice"
                        name="StatusClinic"
                        id="Invoice"
                        value="I"
                        checked={claimType.toUpperCase() === "I"}
                        onChange={(event) =>{
                        setClaimType(event.target.value);
                        }}
                    />
                </Col>
                </Form.Group>
                <p className="errorText text-center">{formErrors.claimType}</p>

                <InputForm type="text" cId="" value={sickness}
                    label="Sickness:" placeholder="Sickness"
                    onChange={(event) =>{
                    setSickness(event.target.value);
                }}/>
                <p className="errorText text-center">{formErrors.sickness}</p>

                <InputForm type="number" cId="" value={cost}
                    label="Charge:" placeholder="Charge in RM"
                    onChange={(event) =>{
                    setCost(event.target.value);
                }}/>
                <p className="errorText text-center">{formErrors.charge}</p>
                <p className="errorText text-center">{formErrors.balance}</p>

                <Form.Group as={Row} className="mt-5"
                controlId="formHorizontalPwd">
                <Col xs={{span: 1, offset:8}}
                sm={{span: 1, offset:9}}
                md={{span: 1, offset:10}}
                lg={{span: 1, offset:10}}
                >
                    <Button onClick={handleSubmit} type="submit">Submit</Button>
                </Col>
                </Form.Group>

                </Form>
            </div>
        </div>
    </div>
    );
}

export default EditTransaction;