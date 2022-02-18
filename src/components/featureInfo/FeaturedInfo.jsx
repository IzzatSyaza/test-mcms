import React, {useState, useEffect } from 'react'
import "./featuredinfo.css"
import {MdArrowUpward, MdArrowDownward} from "react-icons/md";
import Axios from "axios";


export default function FeaturedInfo() {
    const [transaction, setTransaction] = useState({});
    const [cost, setCost] = useState("");
    const [lastCost, setLastCost] = useState("");
    const [moreCost, setMoreCost] = useState(false);
    const [moreTrans, setMoreTrans] = useState(false);
    const [costDiff, setCostDiff] = useState(0);
    const [transDiff, setTransDiff] = useState(0);




    useEffect(() => {
        Axios.get("http://localhost:3001/getTransactionFor6Month").then((response) => {
            // alert("ok")
            // console.log(response.data);
            setTransaction(response.data[0]);
            let diff = response.data[0].totalMonth - response.data[0].lastMonth;
            setTransDiff(diff)
            if(diff > 0) setMoreTrans(true)
            else if(diff < 0) setMoreTrans(false)
            else setMoreTrans(false)
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    
    useEffect(() => {
        Axios.get("http://localhost:3001/getCostMonth").then((response) => {
            // console.log(response.data);
            setCost(response.data[0]);
            Axios.get("http://localhost:3001/getCostLastMonth").then((res) => {
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
    }, []);

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Total Transaction</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{transaction.totalMonth} </span>
                    <span className="featuredMoneyRate">
                    {moreTrans ? <div>+{transDiff} <MdArrowUpward className="featuredIcon"/></div> 
                    : <div>{transDiff} <MdArrowDownward className="featuredIcon negative"/></div>}
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
        </div>
    )
}
