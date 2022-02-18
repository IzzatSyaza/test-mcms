import React, {useState} from "react";
import {Table} from "react-bootstrap"

// import {Wrapper} from "./DisplayFamilly.styles"

function SpouseInfo(props) {
    const [spouseObj, setSpouseObj] =useState(props.obj)

    function FormatDate(theDate) {
        var d = new Date(theDate);


        let officialDate =d.getFullYear() +"-"+(d.getMonth()+1)+"-"+ d.getDate();

        return  officialDate;
    }

    return(
    <div>
        {/* <Wrapper> */}
        {spouseObj.map((val)=>{
            return(
            <Table striped bordered hover key={val.spouse_id}>
                <tbody>
                    <tr>
                        <th>NAME</th>
                        <td>{val.Name_spouse}</td>
                    </tr>
                    <tr>
                        <th>IDENTIFICATION NO</th>
                        <td>{val.Spouse_IcNo}</td>
                    </tr>
                    <tr>
                        <th>DATE OF BIRTH</th>
                        <td>{val.Spouse_dob}</td>
                    </tr>
                    <tr>
                        <th>OCCUPATION</th>
                        <td>{val.Occupation_spouse}</td>
                    </tr>
                    <tr>
                        <th>MOBILE NUMBER</th>
                        <td>{val.Spouse_mob_num}</td>
                    </tr>
                </tbody>
            </Table>)
        })}
            
        {/* </Wrapper> */}
    </div>
    );
}

export default SpouseInfo