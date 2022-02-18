import React, {useEffect, useState} from "react";
import {Row, Col, Container, Button, Form} from 'react-bootstrap';
import Axios from "axios";
import { useParams, Link} from "react-router-dom"
import "./adminFamily.css"
import Spouse from "../../components/Family/Spouse";
import Child from "../../components/Family/Child";
import InputForm from "../../components/InputForm/InputForm";
import DatePicker from "react-datepicker";
import AddChildForm from "../../components/manageFamily/addChildForm";
import { useHistory } from "react-router-dom";





function AddFamily() {
    const {tcNo} = useParams();
    const [empObject, setEmpObject] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [relationList, setRelationList]= useState([]);
    const [hasRelation, setHasRelation]= useState(false);
    const [dtl, setDtl] = useState("");
    const [dateJoin, setDJoin] = useState(new Date());
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    let history = useHistory();

    // -----------------------------Spouse--------------------------------
    const [namaSpouse, setNamaSpouse] = useState("");
    const [icSpouse, setIcSpouse] = useState("");
    const [bodSpouse, setBodSpouse] = useState(new Date());
    const [occupationSpouse, setOccupationSpouse] = useState("");
    const [mobileSpouse, setMobileSpouse] = useState("");

    // -----------------------------ANAK 1--------------------------------
    const [namaAnak1, setNamaAnak1] = useState("");
    const [genderAnak1, setGenderAnak1] = useState("");
    const [icAnak1, setIcAnak1] = useState("");
    const [bodAnak1, setBodAnak1] = useState(new Date());
    
    // -----------------------------ANAK 2--------------------------------
    const [namaAnak2, setNamaAnak2] = useState("");
    const [genderAnak2, setGenderAnak2] = useState("");
    const [icAnak2, setIcAnak2] = useState("");
    const [bodAnak2, setBodAnak2] = useState(new Date());
    
    // -----------------------------ANAK 3--------------------------------
    const [namaAnak3, setNamaAnak3] = useState("");
    const [genderAnak3, setGenderAnak3] = useState("");
    const [icAnak3, setIcAnak3] = useState("");
    const [bodAnak3, setBodAnak3] = useState(new Date());
    
    // -----------------------------ANAK 4--------------------------------
    const [namaAnak4, setNamaAnak4] = useState("");
    const [genderAnak4, setGenderAnak4] = useState("");
    const [icAnak4, setIcAnak4] = useState("");
    const [bodAnak4, setBodAnak4] = useState(new Date());
    
    // -----------------------------ANAK 5--------------------------------
    const [namaAnak5, setNamaAnak5] = useState("");
    const [genderAnak5, setGenderAnak5] = useState("");
    const [icAnak5, setIcAnak5] = useState("");
    const [bodAnak5, setBodAnak5] = useState(new Date());
    
    // -----------------------------ANAK 6--------------------------------
    const [namaAnak6, setNamaAnak6] = useState("");
    const [genderAnak6, setGenderAnak6] = useState("");
    const [icAnak6, setIcAnak6] = useState("");
    const [bodAnak6, setBodAnak6] = useState(new Date());
    
    // -----------------------------ANAK 7--------------------------------
    const [namaAnak7, setNamaAnak7] = useState("");
    const [genderAnak7, setGenderAnak7] = useState("");
    const [icAnak7, setIcAnak7] = useState("");
    const [bodAnak7, setBodAnak7] = useState(new Date());
    
    // -----------------------------ANAK 8--------------------------------
    const [namaAnak8, setNamaAnak8] = useState("");
    const [genderAnak8, setGenderAnak8] = useState("");
    const [icAnak8, setIcAnak8] = useState("");
    const [bodAnak8, setBodAnak8] = useState(new Date());
    
    // -----------------------------ANAK 9--------------------------------
    const [namaAnak9, setNamaAnak9] = useState("");
    const [genderAnak9, setGenderAnak9] = useState("");
    const [icAnak9, setIcAnak9] = useState("");
    const [bodAnak9, setBodAnak9] = useState(new Date());
    
    // -----------------------------ANAK 10--------------------------------
    const [namaAnak10, setNamaAnak10] = useState("");
    const [genderAnak10, setGenderAnak10] = useState("");
    const [icAnak10, setIcAnak10] = useState("");
    const [bodAnak10, setBodAnak10] = useState(new Date());

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
                history.push("/EditFamily/"+tcNo);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate());
        setIsSubmit(true);
    }

    const validate = () => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!namaSpouse){
            errors.namaSpouse = "Employee Spouse Name is required!";
        }
        if (!icSpouse){
            errors.icSpouse = "Employee Spouse IC is required!";
        }
        if (!occupationSpouse){
            errors.occupationSpouse = "Employee Spouse Occupation is required!";
        }
        if (!mobileSpouse){
            errors.mobileSpouse = "Employee Spouse Contact Info is required!";
        }
        return errors
    }

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){

            Axios.post("http://localhost:3001/addFamily", {
                tcNo: tcNo,
                namaSpouse: namaSpouse,
                icSpouse: icSpouse,
                bodSpouse: bodSpouse,
                occupationSpouse: occupationSpouse,
                mobileSpouse: mobileSpouse,

                namaAnak1: namaAnak1,
                genderAnak1: genderAnak1,
                icAnak1: icAnak1,
                bodAnak1: bodAnak1,

                namaAnak2: namaAnak2,
                genderAnak2: genderAnak2,
                icAnak2: icAnak2,
                bodAnak2: bodAnak2,

                namaAnak3: namaAnak3,
                genderAnak3: genderAnak3,
                icAnak3: icAnak3,
                bodAnak3: bodAnak3,

                namaAnak4: namaAnak4,
                genderAnak4: genderAnak4,
                icAnak4: icAnak4,
                bodAnak4: bodAnak4,

                namaAnak5: namaAnak5,
                genderAnak5: genderAnak5,
                icAnak5: icAnak5,
                bodAnak5: bodAnak5,

                namaAnak6: namaAnak6,
                genderAnak6: genderAnak6,
                icAnak6: icAnak6,
                bodAnak6: bodAnak6,

                namaAnak7: namaAnak7,
                genderAnak7: genderAnak7,
                icAnak7: icAnak7,
                bodAnak7: bodAnak7,

                namaAnak8: namaAnak8,
                genderAnak8: genderAnak8,
                icAnak8: icAnak8,
                bodAnak8: bodAnak8,

                namaAnak9: namaAnak9,
                genderAnak9: genderAnak9,
                icAnak9: icAnak9,
                bodAnak9: bodAnak9,

                namaAnak10: namaAnak10,
                genderAnak10: genderAnak10,
                icAnak10: icAnak10,
                bodAnak10: bodAnak10,
        }).then((res) => {
            alert(res.data.message);
            history.push("/DisplayEmployee/"+tcNo);
        }).catch(err =>{
                alert(err);
            })
        }
    }, [formErrors])

    return (
    <div className="displayEmployee">
        <Container>
        <Form>
            <Row>
                <Col xs={12} md={7}>
                    <div className="employeeInfo">
                    <h3 className="addTitle">Add Spouse</h3>
                        <table className="entitlementTable">
                        <tbody>
                            <tr>
                                <th className="entitlementTh">Name</th>
                                <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setNamaSpouse(event.target.value); }} 
                                type="text" placeholder="Name" value={namaSpouse} name=""/>
                                <p className="errorText text-center">{formErrors.namaSpouse}</p>
                                </td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Identification No</th>
                                <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setIcSpouse(event.target.value); }} 
                                type="text" placeholder="MyKad" value={icSpouse} name=""/>
                                <p className="errorText text-center">{formErrors.icSpouse}</p>
                                </td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Date of Birth</th>
                                <td className="entitlementAmount">
                                <DatePicker className="form-control" value={bodSpouse} selected={bodSpouse}
                                onChange={bodSpouse => setBodSpouse(bodSpouse)} />
                                </td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Occupation</th>
                                <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setOccupationSpouse(event.target.value); }} 
                                type="text" placeholder="Occupation" value={occupationSpouse} name=""/>
                                <p className="errorText text-center">{formErrors.occupationSpouse}</p>
                                </td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Mobile No</th>
                                <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setMobileSpouse(event.target.value); }} 
                                type="text" placeholder="Mobile No" value={mobileSpouse} name=""/>
                                <p className="errorText text-center">{formErrors.mobileSpouse}</p>
                                </td>
                            </tr>
                        </tbody>
                            
                        </table>
                    </div>

                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="employeeInfo">
                    <h3 className="addTitle">Add Children</h3>
                    <table className="entitlementTable">
                    <thead>
                        <tr>
                            <th className="entitlementTh">No</th>
                            <th className="entitlementTh">Name</th>
                            <th className="entitlementTh">Gender</th>
                            <th className="entitlementTh">Identification No</th>
                            <th className="entitlementTh">Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AddChildForm No="1" setNama={setNamaAnak1} nama={namaAnak1}
                        setGender={setGenderAnak1} gender={genderAnak1} setIc={setIcAnak1} 
                        ic={icAnak1} setBod={setBodAnak1} bod={bodAnak1} />

                        <AddChildForm No="2" setNama={setNamaAnak2} nama={namaAnak2}
                        setGender={setGenderAnak2} gender={genderAnak2} setIc={setIcAnak2} 
                        ic={icAnak2} setBod={setBodAnak2} bod={bodAnak2} />

                        <AddChildForm No="3" setNama={setNamaAnak3} nama={namaAnak3}
                        setGender={setGenderAnak3} gender={genderAnak3} setIc={setIcAnak3} 
                        ic={icAnak3} setBod={setBodAnak3} bod={bodAnak3} />

                        <AddChildForm No="4" setNama={setNamaAnak4} nama={namaAnak4}
                        setGender={setGenderAnak4} gender={genderAnak4} setIc={setIcAnak4} 
                        ic={icAnak4} setBod={setBodAnak4} bod={bodAnak4} />

                        <AddChildForm No="5" setNama={setNamaAnak5} nama={namaAnak5}
                        setGender={setGenderAnak5} gender={genderAnak5} setIc={setIcAnak5} 
                        ic={icAnak5} setBod={setBodAnak5} bod={bodAnak5} />

                        <AddChildForm No="6" setNama={setNamaAnak6} nama={namaAnak6}
                        setGender={setGenderAnak6} gender={genderAnak6} setIc={setIcAnak6} 
                        ic={icAnak6} setBod={setBodAnak6} bod={bodAnak6} />

                        <AddChildForm No="7" setNama={setNamaAnak7} nama={namaAnak7}
                        setGender={setGenderAnak7} gender={genderAnak7} setIc={setIcAnak7} 
                        ic={icAnak7} setBod={setBodAnak7} bod={bodAnak7} />

                        <AddChildForm No="8" setNama={setNamaAnak8} nama={namaAnak8}
                        setGender={setGenderAnak8} gender={genderAnak8} setIc={setIcAnak8} 
                        ic={icAnak8} setBod={setBodAnak8} bod={bodAnak8} />

                        <AddChildForm No="9" setNama={setNamaAnak9} nama={namaAnak9}
                        setGender={setGenderAnak9} gender={genderAnak9} setIc={setIcAnak9} 
                        ic={icAnak9} setBod={setBodAnak9} bod={bodAnak9} />

                        <AddChildForm No="10" setNama={setNamaAnak10} nama={namaAnak10}
                        setGender={setGenderAnak10} gender={genderAnak10} setIc={setIcAnak10} 
                        ic={icAnak10} setBod={setBodAnak10} bod={bodAnak10} />
                    </tbody>          
                    </table>
                    <Form.Group as={Row} className="mt-3"
                    controlId="formHorizontalPwd">
                        <Col xs={{span: 1, offset:8}}
                        sm={{span: 1, offset:9}}
                        md={{span: 1, offset:10}}
                        lg={{span: 1, offset:10}}
                        >
                            <Button variant="outline-secondary" type="submit" onClick={handleSubmit}>Submit</Button>
                        </Col>
                    </Form.Group>
                    </div>
                </Col>
            </Row>
            </Form>
        </Container>
    </div>
    );
}

export default AddFamily;