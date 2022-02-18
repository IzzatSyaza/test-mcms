import React from "react";
import {Form} from 'react-bootstrap';
import "./familyForm.css"

function AddChildForm(props) {
    return (
        <tr>
            <td className="entitlementAmount">{props.No}</td>                                                                               
            <td className="entitlementAmount">
                <Form.Control  onChange={(event) =>{
                    props.setNama(event.target.value); }} 
                type="text" placeholder="Name" value={props.nama} name=""/>
            </td>
            <td className="entitlementAmount">
                {/* <Form.Control  onChange={(event) =>{
                    props.setGender(event.target.value); }} 
                type="text" placeholder="Gender" value={props.gender} name=""/> */}
                <Form.Select name="gender" aria-label="Default select example" placeholder="JOi"
                onChange={(event) =>{
                props.setGender(event.target.value); 
                }} >
                    <option hidden>Please Select</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </Form.Select>

            </td>
            <td className="entitlementAmount">
                <Form.Control  onChange={(event) =>{
                    props.setIc(event.target.value); }} 
                type="text" placeholder="MyKad/MyKid" value={props.ic} name=""/>
            </td>
            <td className="entitlementAmount">
                <Form.Control type="date" className="form-control" value={props.bod} selected={props.bod} 
                onChange={(e) =>{
                    props.setBod(e.target.value); }} />
            </td> 
        </tr>                        

    );
}

export default AddChildForm;