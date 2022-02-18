import React, {useState, useEffect, useContext} from 'react'
import "./featuredinfo.css"
import {MdArrowUpward, MdArrowDownward} from "react-icons/md";
import Axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";

export default function ClinicFeature(props) {
    const [transaction, setTransaction] = useState({});
    const [cost, setCost] = useState("");
    const [lastCost, setLastCost] = useState("");
    const [moreCost, setMoreCost] = useState(false);
    const [moreTrans, setMoreTrans] = useState(false);
    const [costDiff, setCostDiff] = useState(0);
    const [transDiff, setTransDiff] = useState(0);
    const [clinic, setClinic] = useState("");
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        Axios.get("http://localhost:3001/getClinicOnly",{
            params: {
                mcmsId: authState.mcms_id,
            }
        }).then((response) => {
            setClinic(response.data[0].clinic_code);
            })
        .catch(err =>{
            console.log(err);
        })
    }, []);


    useEffect(() => {
        Axios.get("http://localhost:3001/getTotalTransactionForClinic",{
            params: {
                clinic: clinic,
            }
        }).then((response) => {
            // alert("ok")
            // console.log(response.data);
            setTransaction(response.data[0]);
            let diff = response.data[0].totalMonth - response.data[0].lastMonth;
            if(diff > 0) setMoreTrans(true)
            else if(diff < 0) setMoreTrans(false)
            else setMoreTrans(false)
        })
        .catch(err =>{
            console.log(err);
        })
    }, [clinic]);

    
    useEffect(() => {
        Axios.get("http://localhost:3001/getCostMonthbyClinic",{
            params: {
                clinic: clinic,
            }
        }).then((response) => {
            // console.log(response.data);
            setCost(response.data[0]);
            Axios.get("http://localhost:3001/getCostLastMonthbyClinic",{
                params: {
                    clinic: clinic,
                }
            }).then((res) => {
                // console.log(res.data);
                let costDiff = response.data[0].costMonth - res.data[0].costLastMonth;
                setCostDiff(costDiff)
                if(costDiff > 0) setMoreCost(true)
                else if(costDiff < 0) setMoreCost(false)
                else setMoreCost(false)
            })
            .catch(error =>{
                console.log(error);
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }, [clinic]);

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Total Transaction</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{transaction.totalMonth} </span>
                    <span className="featuredMoneyRate">
                    {moreTrans ? <div>+{transaction.totalDiff} <MdArrowUpward className="featuredIcon"/></div> 
                    : <div>{transaction.totalDiff} <MdArrowDownward className="featuredIcon negative"/></div>}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Total Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{cost.costMonth}</span>
                    <span className="featuredMoneyRate">
                    {moreCost ? <div>+{costDiff} <MdArrowUpward className="featuredIcon"/></div> 
                    : <div>{costDiff} <MdArrowDownward className="featuredIcon negative"/></div>}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            {/* <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$1200</span>
                    <span className="featuredMoneyRate">
                        +1.5 <MdArrowUpward className="featuredIcon"/>
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div> */}
        </div>
    )
}
