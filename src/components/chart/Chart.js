import React, {useState, useEffect } from 'react'
import "./chart.css"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
import Axios from "axios";


export default function Chart({ title, grid }) {
    const [transaction, setTransaction] = useState("");

    useEffect(() => {
        Axios.get("http://localhost:3001/getTransactionForChart").then((response) => {
            // alert("ok")
            console.log(response.data);
            setTransaction(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);
    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1.1}>
                <LineChart data={transaction}>
                    <XAxis dataKey="month" stroke="#5550bd"/>
                    <YAxis stroke="#5550bd"/>
                    <Line type="monotone" dataKey="totalTransaction" stroke="#5550bd"/>
                    <Tooltip/>
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
