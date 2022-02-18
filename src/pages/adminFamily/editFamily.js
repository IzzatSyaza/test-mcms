import React, {useEffect, useState} from "react";
import {Row, Col, Container, Button, Form} from 'react-bootstrap';
import Axios from "axios";
import { useParams, useHistory} from "react-router-dom"
import "./adminFamily.css"
import DatePicker from "react-datepicker";

function EditFamily() {
    const {tcNo} = useParams();
    const [relationList, setRelationList]= useState([]);
    const [hasRelation, setHasRelation]= useState(false);
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

    
    function FormatDate(thedate) {
        if(thedate == "0000-00-00"){
            let today = new Date();
            return today;
        }
        else if(thedate == ""){
            let today = new Date();
            return today;
        }
        else{
            let d = new Date(thedate);
            let date = new Date( d.getTime() + Math.abs(d.getTimezoneOffset()*60000));
        return date ;
        }
        
    }


    useEffect(() => {
        Axios.get("http://localhost:3001/getRelation",{
            params: {
                empId: tcNo,
            }
        }).then((response) => {
            console.log(response.data);
            // setEmpNo(response.data[0].EmployeeNo)
            setNamaSpouse(response.data[0].Name_spouse)
            setIcSpouse(response.data[0].Spouse_IcNo)
            setBodSpouse(FormatDate(response.data[0].spouse_dob))
            setOccupationSpouse(response.data[0].Occupation_spouse)
            setMobileSpouse(response.data[0].Spouse_mob_num)

            setNamaAnak1(response.data[0].nama_anak1)
            setGenderAnak1(response.data[0].jantina1)
            setIcAnak1(response.data[0].mykid1)
            setBodAnak1(FormatDate(response.data[0].tarikh_lahir_anak1))

            setNamaAnak2(response.data[0].nama_anak2)
            setGenderAnak2(response.data[0].jantina2)
            setIcAnak2(response.data[0].mykid2)
            setBodAnak2(FormatDate(response.data[0].tarikh_lahir_anak))

            setNamaAnak3(response.data[0].nama_anak)
            setGenderAnak3(response.data[0].jantina3)
            setIcAnak3(response.data[0].mykid3)
            setBodAnak3(FormatDate(response.data[0].tarikh_lahir_anak3))

            setNamaAnak4(response.data[0].nama_anak4)
            setGenderAnak4(response.data[0].jantina4)
            setIcAnak4(response.data[0].mykid4)
            setBodAnak4(FormatDate(response.data[0].tarikh_lahir_anak4))

            setNamaAnak5(response.data[0].nama_anak5)
            setGenderAnak5(response.data[0].jantina5)
            setIcAnak5(response.data[0].mykid5)
            setBodAnak5(FormatDate(response.data[0].tarikh_lahir_anak5))

            setNamaAnak6(response.data[0].nama_anak6)
            setGenderAnak6(response.data[0].jantina6)
            setIcAnak6(response.data[0].mykid6)
            setBodAnak6(FormatDate(response.data[0].tarikh_lahir_anak6))

            setNamaAnak7(response.data[0].nama_anak7)
            setGenderAnak7(response.data[0].jantina7)
            setIcAnak7(response.data[0].mykid7)
            setBodAnak7(FormatDate(response.data[0].tarikh_lahir_anak7))

            setNamaAnak8(response.data[0].nama_anak8)
            setGenderAnak8(response.data[0].jantina8)
            setIcAnak8(response.data[0].mykid8)
            setBodAnak8(FormatDate(response.data[0].tarikh_lahir_anak8))

            setNamaAnak9(response.data[0].nama_anak9)
            setGenderAnak9(response.data[0].jantina9)
            setIcAnak9(response.data[0].mykid9)
            setBodAnak9(FormatDate(response.data[0].tarikh_lahir_anak9))

            setNamaAnak10(response.data[0].nama_anak10)
            setGenderAnak10(response.data[0].jantina10)
            setIcAnak10(response.data[0].mykid10)
            setBodAnak10(FormatDate(response.data[0].tarikh_lahir_anak10))
            
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

    // const child = (no, name, jantina, mykid, bod) =>{
    //     if(typeof name != "undefined" 
    //         && name != null 
    //         && name.length != null 
    //         && name.length > 0) {
    //         return (<tr>
    //             <td className="entitlementAmount">{no}</td>                                                                               
    //             <td className="entitlementAmount">{name}</td>    
    //             <td className="entitlementAmount">{jantina}</td>                                        
    //             <td className="entitlementAmount">{mykid}</td>                                        
    //             <td className="entitlementAmount">{bod}</td> 
    //         </tr>)
    //     }
    //     else{
    //         return(
    //             <tr>
    //                 <td className="entitlementAmount"></td>                                                                               
    //                 <td className="entitlementAmount"></td>    
    //                 <td className="entitlementAmount"></td>                                        
    //                 <td className="entitlementAmount"></td>                                        
    //                 <td className="entitlementAmount"></td> 
    //             </tr>
    //         )
    //     }
    // }

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
            Axios.put("http://localhost:3001/editFamily", {
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
                history.push("/AdminDisplayFamily/"+tcNo);
            }).catch(err =>{
                    alert(err);
                })
        }
    }, [formErrors])

    const deleteFamily = (e) =>{
        e.preventDefault();
        if (window.confirm("Do You Want To Delete The Family?") == true) {
            Axios.delete(`http://localhost:3001/deletefamily/${tcNo}`)
            .then((response)=> {
                alert(response.data.message);
                history.push("/AdminDisplayFamily/"+tcNo);
            }).catch(err =>{
                alert(err);
            })
        }
    }

    return (
    <div className="displayEmployee">
        <Container>
        <Form>
            <Row>
                <Col xs={12} md={7}>
                    <div className="employeeInfo">
                    <h3 className="addTitle">Edit Spouse</h3>
                    
                        <table className="entitlementTable">
                        <tbody>
                            <tr>
                                <th className="entitlementTh">Name</th>
                                <td className="entitlementAmount">
                                <Form.Control type="text" placeholder="Name" value={namaSpouse} name="" 
                                onChange={(event) =>{
                                    setNamaSpouse(event.target.value); }}/>
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
                                <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={bodSpouse} selected={bodSpouse}
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
                    <h3 className="addTitle">Edit Children</h3>
                    
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
                        <tr>
                            <td className="entitlementAmount">1</td>                                                                               
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setNamaAnak1(event.target.value); }} 
                                type="text" placeholder="Name" value={namaAnak1} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <Form.Select name="gender" aria-label="Default select example" placeholder="JOi"
                                onChange={(event) =>{
                                setGenderAnak1(event.target.value); 
                                }} >
                                    {genderAnak1 ? <option hidden value ={genderAnak1}>{genderAnak1}</option> : 
                                    <option hidden value ="">Please Select Gender</option>}
                                    <option value ="">Please Select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </Form.Select>
                            
                            </td>
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setIcAnak1(event.target.value); }} 
                                type="text" placeholder="IC No" value={icAnak1} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={bodAnak1} selected={bodAnak1} 
                                onChange={bodAnak1 => setBodAnak1(bodAnak1)} />
                            </td> 
                        </tr>
                        <tr>
                            <td className="entitlementAmount">2</td>                                                                               
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setNamaAnak2(event.target.value); }} 
                                type="text" placeholder="Name" value={namaAnak2} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <Form.Select name="gender" aria-label="Default select example" placeholder="JOi"
                                onChange={(event) =>{
                                setGenderAnak2(event.target.value); 
                                }} >
                                    {genderAnak2 ? <option hidden value ={genderAnak2}>{genderAnak2}</option> : 
                                    <option hidden value ="">Please Select Gender</option>}
                                    <option value ="">Please Select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </Form.Select>
                            
                            </td>
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setIcAnak2(event.target.value); }} 
                                type="text" placeholder="IC No" value={icAnak2} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={bodAnak2} selected={bodAnak2} 
                                onChange={bodAnak2 => setBodAnak2(bodAnak2)} />
                            </td> 
                        </tr>
                        <tr>
                            <td className="entitlementAmount">3</td>                                                                               
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setNamaAnak3(event.target.value); }} 
                                type="text" placeholder="Name" value={namaAnak3} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <Form.Select name="gender" aria-label="Default select example" placeholder="JOi"
                                onChange={(event) =>{
                                setGenderAnak3(event.target.value); 
                                }} >
                                    {genderAnak3 ? <option hidden value ={genderAnak3}>{genderAnak3}</option> : 
                                    <option hidden value ="">Please Select Gender</option>}
                                    <option value ="">Please Select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </Form.Select>
                            
                            </td>
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setIcAnak3(event.target.value); }} 
                                type="text" placeholder="IC No" value={icAnak3} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={bodAnak3} selected={bodAnak3} 
                                onChange={bodAnak3 => setBodAnak3(bodAnak3)} />
                            </td> 
                        </tr>
                        <tr>
                            <td className="entitlementAmount">4</td>                                                                               
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setNamaAnak4(event.target.value); }} 
                                type="text" placeholder="Name" value={namaAnak4} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <Form.Select name="gender" aria-label="Default select example" placeholder="JOi"
                                onChange={(event) =>{
                                setGenderAnak4(event.target.value); 
                                }} >
                                    {genderAnak4 ? <option hidden value ={genderAnak4}>{genderAnak4}</option> : 
                                    <option hidden value ="">Please Select Gender</option>}
                                    <option value ="">Please Select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </Form.Select>
                            
                            </td>
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setIcAnak4(event.target.value); }} 
                                type="text" placeholder="IC No" value={icAnak4} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={bodAnak4} selected={bodAnak4} 
                                onChange={bodAnak4 => setBodAnak4(bodAnak4)} />
                            </td> 
                        </tr>
                        <tr>
                            <td className="entitlementAmount">5</td>                                                                               
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setNamaAnak5(event.target.value); }} 
                                type="text" placeholder="Name" value={namaAnak5} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <Form.Select name="gender" aria-label="Default select example" placeholder="JOi"
                                onChange={(event) =>{
                                setGenderAnak5(event.target.value); 
                                }} >
                                    {genderAnak5 ? <option hidden value ={genderAnak5}>{genderAnak5}</option> : 
                                    <option hidden value ="">Please Select Gender</option>}
                                    <option value ="">Please Select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </Form.Select>
                            
                            </td>
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setIcAnak5(event.target.value); }} 
                                type="text" placeholder="IC No" value={icAnak5} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={bodAnak5} selected={bodAnak5} 
                                onChange={bodAnak5 => setBodAnak5(bodAnak5)} />
                            </td> 
                        </tr>
                        <tr>
                            <td className="entitlementAmount">6</td>                                                                               
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setNamaAnak6(event.target.value); }} 
                                type="text" placeholder="Name" value={namaAnak6} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <Form.Select name="gender" aria-label="Default select example" placeholder="JOi"
                                onChange={(event) =>{
                                setGenderAnak6(event.target.value); 
                                }} >
                                    {genderAnak6 ? <option hidden value ={genderAnak6}>{genderAnak6}</option> : 
                                    <option hidden value ="">Please Select Gender</option>}
                                    <option value ="">Please Select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </Form.Select>
                            
                            </td>
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setIcAnak6(event.target.value); }} 
                                type="text" placeholder="IC No" value={icAnak6} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={bodAnak6} selected={bodAnak6} 
                                onChange={bodAnak6 => setBodAnak6(bodAnak6)} />
                            </td> 
                        </tr>
                        <tr>
                            <td className="entitlementAmount">7</td>                                                                               
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setNamaAnak7(event.target.value); }} 
                                type="text" placeholder="Name" value={namaAnak7} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <Form.Select name="gender" aria-label="Default select example" placeholder="JOi"
                                onChange={(event) =>{
                                setGenderAnak7(event.target.value); 
                                }} >
                                    {genderAnak7 ? <option hidden value ={genderAnak7}>{genderAnak7}</option> : 
                                    <option hidden value ="">Please Select Gender</option>}
                                    <option value ="">Please Select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </Form.Select>
                            
                            </td>
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setIcAnak7(event.target.value); }} 
                                type="text" placeholder="IC No" value={icAnak7} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={bodAnak7} selected={bodAnak7} 
                                onChange={bodAnak7 => setBodAnak7(bodAnak7)} />
                            </td> 
                        </tr>
                        <tr>
                            <td className="entitlementAmount">8</td>                                                                               
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setNamaAnak8(event.target.value); }} 
                                type="text" placeholder="Name" value={namaAnak8} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <Form.Select name="gender" aria-label="Default select example" placeholder="JOi"
                                onChange={(event) =>{
                                setGenderAnak8(event.target.value); 
                                }} >
                                    {genderAnak8 ? <option hidden value ={genderAnak8}>{genderAnak8}</option> : 
                                    <option hidden value ="">Please Select Gender</option>}
                                    <option value ="">Please Select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </Form.Select>
                            
                            </td>
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setIcAnak8(event.target.value); }} 
                                type="text" placeholder="IC No" value={icAnak8} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={bodAnak8} selected={bodAnak8} 
                                onChange={bodAnak8 => setBodAnak8(bodAnak8)} />
                            </td> 
                        </tr>
                        <tr>
                            <td className="entitlementAmount">9</td>                                                                               
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setNamaAnak9(event.target.value); }} 
                                type="text" placeholder="Name" value={namaAnak9} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <Form.Select name="gender" aria-label="Default select example" placeholder="JOi"
                                onChange={(event) =>{
                                setGenderAnak9(event.target.value); 
                                }} >
                                    {genderAnak9 ? <option hidden value ={genderAnak9}>{genderAnak9}</option> : 
                                    <option hidden value ="">Please Select Gender</option>}
                                    <option value ="">Please Select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </Form.Select>
                            
                            </td>
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setIcAnak9(event.target.value); }} 
                                type="text" placeholder="IC No" value={icAnak9} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={bodAnak9} selected={bodAnak9} 
                                onChange={bodAnak9 => setBodAnak9(bodAnak9)} />
                            </td> 
                        </tr>
                        <tr>
                            <td className="entitlementAmount">10</td>                                                                               
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setNamaAnak10(event.target.value); }} 
                                type="text" placeholder="Name" value={namaAnak10} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <Form.Select name="gender" aria-label="Default select example" placeholder="JOi"
                                onChange={(event) =>{
                                setGenderAnak10(event.target.value); 
                                }} >
                                    {genderAnak10 ? <option hidden value ={genderAnak10}>{genderAnak10}</option> : 
                                    <option hidden value ="">Please Select Gender</option>}
                                    <option value ="">Please Select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </Form.Select>
                            
                            </td>
                            <td className="entitlementAmount">
                                <Form.Control  onChange={(event) =>{
                                    setIcAnak10(event.target.value); }} 
                                type="text" placeholder="IC No" value={icAnak10} name=""/>
                            </td>
                            <td className="entitlementAmount">
                                <DatePicker className="form-control" dateFormat="dd/MM/yyyy" value={bodAnak10} selected={bodAnak10} 
                                onChange={bodAnak10 => setBodAnak10(bodAnak10)} />
                            </td> 
                        </tr>
                    </tbody>
                    </table>
                    <Row>
                        <Col sm={{span: 1, offset:0}}
                        md={{span: 1, offset:7}}
                        lg={{span: 1, offset:9}}>
                            <div className="me-5">
                                <Button variant="primary"  type="submit" onClick={handleSubmit}>Submit</Button>
                            </div>
                        </Col>
                        <Col sm={{span: 1, offset:3}}
                        md={{span: 1, offset:1}}
                        lg={{span: 1, offset:0}}>
                            <Button variant="danger" type="submit" onClick={deleteFamily}>Delete</Button>
                        </Col>
                    </Row>
                    
                    
                    </div>
                </Col>
            </Row>
        </Form>
        </Container>
    </div>
    );
}

export default EditFamily;