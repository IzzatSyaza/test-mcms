import React, {useState, useEffect} from "react";
import Axios from "axios";
import "./clinicList.css"
import {Button, Row, Col, Container} from 'react-bootstrap';
import {MdOutlineEdit, MdDeleteOutline} from "react-icons/md";
import {Link} from "react-router-dom"




export default function ClinicList() {
    const [clinic, setClinic] = useState([]);
    var i = 0;

    useEffect(() => {
        Axios.get("http://localhost:3001/getClinic",).then((response) => {
            console.log(response);
            setClinic(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    const deleteClinic = (e, id) =>{
        e.preventDefault();
        if (window.confirm("Do You Want To Delete The User?") == true) {
            Axios.delete(`http://localhost:3001/deleteclinic/${id}`)
            .then((response)=> {
                alert(response.data.message);
                setClinic(clinic.filter((val) => {
                    return val.mcms_id != id
                }))
            }).catch(err =>{
                alert(err);
            })
        }
    }
    return (
        <div className="clinicList">
            <div className="listContainer">
                <h3 className="listTitle">List of Clinic</h3>
                <div>
                    <table className="listTable">
                        <thead>
                            <tr>
                                <th className="listTh">No</th>
                                <th className="listTh">Clinic Code</th>
                                <th className="listTh">Clinic Name</th>
                                <th className="listTh">Clinic Type</th>
                                <th className="listTh">Clinic Status</th>
                                <th className="listTh">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {clinic.map((val) => {
                            return(
                                <tr key={val.clinic_id}>
                                    <td className="listClinic">{++i}</td>
                                    <td className="listClinic">{val.clinic_code}</td>
                                    <td className="listClinic">{val.clinic_name}</td>
                                    <td className="listClinic">{val.clinic_ref}</td>
                                    <td className="listClinic">{val.clinic_status}</td>
                                    <td className="listClinicAction">
                                    <Link to={"/editclinic/"+val.mcms_id}>
                                    <Button variant="warning" className="listButton">
                                        <MdOutlineEdit className="listIcon"/>Edit
                                    </Button></Link>
                                    <Button variant="danger" className="listButton"
                                    onClick={(e)=>{deleteClinic(e, val.mcms_id)}}>
                                        <MdDeleteOutline className="listIcon"/>Delete
                                    </Button>
                                    </td>
                                </tr>
                            )
                            })}
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    )
}
