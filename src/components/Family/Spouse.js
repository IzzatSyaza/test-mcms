import React, {useEffect, useState} from "react";
import Axios from "axios";
import "./family.css"



function Spouse(props) {
    const tcNo = props.tcNo
    const [empObject, setEmpObject] = useState([]);
    const [relationList, setRelationList]= useState([]);
    const [hasRelation, setHasRelation]= useState(false);

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

    return (
            <div>
                <h3 className="mt-3 mb-3 entitlementTitle">Spouse Information</h3>
                {hasRelation ? 
                    <table className="entitlementTable">
                        <tbody>
                            <tr>
                                <th className="entitlementTh">Name</th>
                                <td className="entitlementAmount">{relationList.Name_spouse}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Identification No</th>
                                <td className="entitlementAmount">{relationList.Spouse_IcNo}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Date of Birth</th>
                                <td className="entitlementAmount">{relationList.spouse_dob}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Occupation</th>
                                <td className="entitlementAmount">{relationList.Occupation_spouse}</td>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Mobile No</th>
                                <td className="entitlementAmount">{relationList.Spouse_mob_num}</td>
                            </tr>
                        </tbody>
                    </table> :
                    <table className="entitlementTable">
                        <tbody>
                            <tr>
                                <th className="entitlementTh">Name</th>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Identification No</th>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Date of Birth</th>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Occupation</th>
                            </tr>
                            <tr>
                                <th className="entitlementTh">Mobile No</th>
                            </tr>
                        </tbody>
                    </table>}
            </div>
    );
}

export default Spouse;