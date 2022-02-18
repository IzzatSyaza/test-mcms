import React, {useState} from "react";
import DisplayGrid from "../../DisplayEmployeeGrid/DisplayGrid";
import {Table, Button, Form, Row, Col} from "react-bootstrap"
import {Link} from "react-router-dom"
import Axios from "axios";

// import {Wrapper} from "./DisplayFamilly.styles"

function SpouseInfo(props) {
    const [spouseObj, setSpouseObj] =useState(props.obj)

    const deleteSpouse = (e, id) =>{
        Axios.delete(`http://localhost:3001/deletespouse/${id}`).then((response)=> {
            setSpouseObj(spouseObj.filter((val) => {
                return val.spouse_id !== id
            }))
        })
    }
    
    const setSpouse = (e, val) => {
        localStorage.setItem("name", val.spouse_name);
        localStorage.setItem("ic", val.spouse_ic);
        localStorage.setItem("occupation", val.spouse_occupation);
        localStorage.setItem("contact", val.spouse_contact);
        localStorage.setItem("dob", FormatDate(val.spouse_dob));
    }

    function FormatDate(theDate) {
        var d = new Date(theDate);
        // console.log("Lol" + d)
        // const d = {
        //     date: theDate.getDate(),
        //     month: theDate.getMonth(),
        //     year: theDate.getFullYear(),
        // };

        let officialDate =d.getFullYear() +"-"+(d.getMonth()+1)+"-"+ d.getDate();

        return  officialDate;
    }

    return(
    <div>
        {/* <Wrapper> */}
        {spouseObj.map((val)=>{
            return(<div key={val.spouse_id}>
            <DisplayGrid title="Name" info={val.spouse_name}/>
            <DisplayGrid title="Identification No" info={val.spouse_ic}/>
            <DisplayGrid title="Date of Birth" info={FormatDate(val.spouse_dob)}/>
            <DisplayGrid title="Occupation" info={val.spouse_occupation}/>
            <DisplayGrid title="Phone No" info={val.spouse_contact}/>
            <Row>
                <Col xs={{span: 4, offset:9}}
                sm={{span: 4, offset:10}}
                md={{span: 4, offset:11}}
                lg={{span: 4, offset:11}}
                >
                     <Link to={"/editspouse/"+props.tcNo+"/"+val.spouse_id}> 
                    <Button onClick={(e) => setSpouse(e, val)}
                     type="submit">Edit</Button>
                    </Link>
                    <Button onClick={(e) => deleteSpouse(e, val.spouse_id)}
                     type="submit">Delete</Button>
                </Col>
            </Row>
            </div>)
        })}
            
        {/* </Wrapper> */}
    </div>
    );
}

export default SpouseInfo