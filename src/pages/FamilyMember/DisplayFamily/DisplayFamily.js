import React, {useState, useEffect} from "react";
import SpouseInfo from "../../../components/FamilyComp/SpouseInfo/SpouseInfo";
import ChildInfo from "../../../components/FamilyComp/ChildInfo/ChildInfo";
import NotAvailable from "../../../components/FamilyComp/NotAvailable/NotAvailable";
import Axios from "axios";
import { useParams} from "react-router-dom"
import {Wrapper} from "./DisplayFamilly.styles"
import "../familyMember.css";


function Family() {
    const {tcNo} = useParams();
    const [spouseObj, setSpouseObj] = useState([]);
    const [hasSpouse, setHasSpouse] = useState(false);
    const [childObj, setChildObj] = useState([]);
    const [hasChild, setHasChild] = useState(false);

    useEffect(() => {
        Axios.get("http://localhost:3001/getSpouse",{
            params: {
                empId: tcNo,
            }
        }).then((response) => {
            // console.log(response.data);
            console.log(response.data)
            setSpouseObj(response.data);
            console.log(spouseObj);
            // console.log(response);
                
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    useEffect(() => {
        console.log(spouseObj)
        if(typeof spouseObj != "undefined" 
                && spouseObj != null 
                && spouseObj.length != null 
                && spouseObj.length > 0)
                {
                    setHasSpouse(true);
                }
                
            else{
                setHasSpouse(false);
            }
    }, [spouseObj])

    useEffect(() => {
        Axios.get("http://localhost:3001/getChildren",{
            params: {
                empId: tcNo,
            }
        }).then((response) => {
            // console.log(response.data);
            setChildObj(response.data);
            // console.log(childObj);
            // console.log(response);
            if(typeof childObj != "undefined" 
                && childObj != null 
                && childObj.length != null 
                && childObj.length > 0)
                setHasChild(true);
            else
                setHasChild(false);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    useEffect(() => {
        console.log(childObj)
        if(typeof childObj != "undefined" 
                && childObj != null 
                && childObj.length != null 
                && childObj.length > 0)
                {
                    setHasChild(true);
                }
                
            else{
                setHasChild(false);
            }
    }, [childObj])
    
    return(
    <div className="familyMember">
        <Wrapper>
            <h1>Spouse Information</h1>
            {hasSpouse ? <SpouseInfo obj={spouseObj} tcNo={tcNo}/> : <NotAvailable section="Spouse" tcNo={tcNo}/>}
            <h1>Children Information</h1>
            {hasChild ? <ChildInfo obj={childObj} tcNo={tcNo}/>: <NotAvailable section="Children" tcNo={tcNo}/>}
        </Wrapper>
    </div>
    );
}

export default Family