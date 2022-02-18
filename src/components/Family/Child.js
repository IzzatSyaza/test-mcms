import React, {useEffect, useState, useContext} from "react";
import Axios from "axios";
import {Button, Row, Col, Container} from 'react-bootstrap';
import {MdDeleteOutline} from "react-icons/md";

// import { useParams, Link} from "react-router-dom"
import "./family.css"
import { AuthContext } from "../../helpers/AuthContext";



function Child(props) {
    const tcNo = props.tcNo;
    // const [empObject, setEmpObject] = useState([]);
    // const [transaction, setTransaction] = useState([]);
    const [relationList, setRelationList]= useState([]);
    const [hasRelation, setHasRelation]= useState(false);
    const [isAdmin, setIsAdmin]= useState(true);
    const { authState } = useContext(AuthContext);
    var no = 0;

    useEffect(() => {
        if (authState.userType === "ADMIN"){
            setIsAdmin(true)
        }else if (authState.userType === "CLINIC"){
            setIsAdmin(false)
        }
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
    }, [relationList]);

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

    const deleteChild = (e, anak) =>{
        e.preventDefault();
        if (window.confirm("Do You Want To Delete The Child?") == true) {
            Axios.put(`http://localhost:3001/editDeleteChildren`,{
                tcNo: tcNo,
                anak: anak,
            })
            .then((response)=> {
                alert(response.data.message);
            }).catch(err =>{
                alert(err);
            })
        }
    }


    const child = (name, jantina, mykid, bod, anak) =>{
        if(typeof name != "undefined" 
            && name != null 
            && name.length != null 
            && name.length > 0) {
                return (
                    <tr>
                        <td className="entitlementAmount">{++no}</td>                                                                               
                        <td className="entitlementAmount">{name}</td>    
                        <td className="entitlementAmount">{jantina}</td>                                        
                        <td className="entitlementAmount">{mykid}</td>                                        
                        <td className="entitlementAmount">{bod}</td> 
                        {isAdmin ? <td>
                            <Button variant="danger" className="listButton" onClick={(e)=>{deleteChild(e, anak)}}>
                                <MdDeleteOutline className="listIcon"/>Delete
                            </Button>
                        </td>: null}
                    </tr>)
            
        }
        else{
            return(
                null
            )
        }
    }

    return (
        <div className="employeeInfo">
        <h3 className="mt-3 mb-3 entitlementTitle">Children Information</h3>
        {hasRelation ?  <table className="entitlementTable">
                <thead>
                    <tr>
                        <th className="entitlementTh">No</th>
                        <th className="entitlementTh">Name</th>
                        <th className="entitlementTh">Gender</th>
                        <th className="entitlementTh">Identification No</th>
                        <th className="entitlementTh">Date of Birth</th>
                        {isAdmin ? <th className="entitlementTh">Action</th>: null}
                    </tr>
                </thead>
                <tbody>
                    {child(relationList.nama_anak1, relationList.jantina1, relationList.mykid1, relationList.tarikh_lahir_anak1, "anak1")}
                    {child(relationList.nama_anak2, relationList.jantina2, relationList.mykid2, relationList.tarikh_lahir_anak, "anak2")}
                    {child(relationList.nama_anak, relationList.jantina3, relationList.mykid3, relationList.tarikh_lahir_anak3, "anak3")}
                    {child(relationList.nama_anak4, relationList.jantina4, relationList.mykid4, relationList.tarikh_lahir_anak4, "anak4")}
                    {child(relationList.nama_anak5, relationList.jantina5, relationList.mykid5, relationList.tarikh_lahir_anak5, "anak5")}
                    {child(relationList.nama_anak6, relationList.jantina6, relationList.mykid6, relationList.tarikh_lahir_anak6, "anak6")}
                    {child(relationList.nama_anak7, relationList.jantina7, relationList.mykid7, relationList.tarikh_lahir_anak7, "anak7")}
                    {child(relationList.nama_anak8, relationList.jantina8, relationList.mykid8, relationList.tarikh_lahir_anak8, "anak8")}
                    {child(relationList.nama_anak9, relationList.jantina9, relationList.mykid9, relationList.tarikh_lahir_anak9, "anak9")}
                    {child(relationList.nama_anak10, relationList.jantina10, relationList.mykid10, relationList.tarikh_lahir_anak10, "anak10")}
                </tbody>
            </table>:
            <table className="entitlementTable">
                <thead>
                    <tr>
                        <th className="entitlementTh">No</th>
                        <th className="entitlementTh">Name</th>
                        <th className="entitlementTh">Gender</th>
                        <th className="entitlementTh">Identification No</th>
                        <th className="entitlementTh">Date of Birth</th>
                        {isAdmin ? <th className="entitlementTh">Action</th>: null}
                    </tr>
                </thead>
                
            </table>}
            </div>
    );
}

export default Child;