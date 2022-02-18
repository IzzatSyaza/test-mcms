import React, {useState} from "react";
import {Table} from "react-bootstrap"
// import {Wrapper} from "./DisplayFamilly.styles"

function ChildInfo(props) {
    const [childObj, setChildObj] =useState(props.obj)
    var i = 0;

    function FormatDate(thedate) {
        var d = new Date(thedate);
        const bornYear = d.getFullYear();
        const thisYear = new Date().getFullYear();
        const thisMonth = new Date().getMonth();
        const age = thisYear - bornYear;

        if (age === 0){
            const bornMonth = d.getMonth();
            const month = thisMonth - bornMonth;
            return month + " Month Old";
        }

        return age ;
    }

    return(
    <div>
        <Table striped bordered hover size="xl" responsive="md">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Identification No</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Marital Status</th>
                    <th>Study Status</th>

                </tr>
            </thead>
            <tbody>
                {/* <Wrapper> */}
                {childObj.map((val)=>{
                    return(
                    <tr key={val.child_id}>
                        <td>{++i}</td>
                        <td>{val.child_name}</td>
                        <td>{val.child_ic}</td>
                        <td>{val.child_gender}</td>
                        <td>{FormatDate(val.child_dob)}</td>
                        <td>{val.child_marital_status}</td>
                        <td>{val.child_study_status}</td>
                    </tr>)
                })}
            </tbody>
        </Table>       
    </div>
    );
}

export default ChildInfo