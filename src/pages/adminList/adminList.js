import React, {useState, useEffect} from "react";
import Axios from "axios";
import "./adminList.css"
import {Button, Row, Col, Container} from 'react-bootstrap';
import {MdOutlineEdit, MdDeleteOutline} from "react-icons/md";
import {Link} from "react-router-dom"




export default function AdminList() {
    const [admin, setAdmin] = useState([]);
    var i = 0;

    useEffect(() => {
        Axios.get("http://localhost:3001/getAdmin",).then((response) => {
            console.log(response);
            setAdmin(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    const deleteAdmin = (e, id) =>{
        e.preventDefault();
        if (window.confirm("Do You Want To Delete The User?") == true) {
            Axios.delete(`http://localhost:3001/deleteadmin/${id}`)
            .then((response)=> {
                alert(response.data.message);
                setAdmin(admin.filter((val) => {
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
                <h3 className="listTitle">List of Admin</h3>
                <div>
                    <table className="listTable">
                        <tr>
                            <th className="listTh">No</th>
                            <th className="listTh">Username</th>
                            <th className="listTh">Action</th>
                        </tr>
                        {admin.map((val) => {
                            return(
                                <tr key={val.mcms_id}>
                                    <td className="listClinic">{++i}</td>
                                    <td className="listClinic">{val.username}</td>
                                    <td className="listClinicAction">
                                    <Link to={"/EditAdmin/"+val.mcms_id}>
                                    <Button variant="warning" className="listButton">
                                        <MdOutlineEdit className="listIcon"/>Edit
                                    </Button></Link>
                                    <Button variant="danger" className="listButton" onClick={(e)=>{deleteAdmin(e, val.mcms_id)}}>
                                        <MdDeleteOutline className="listIcon"/>Delete
                                    </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}
