import React, {useState, useEffect, useContext } from 'react'
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
import { AuthContext } from "../../helpers/AuthContext";


export default function ClinicChart({ title, grid }) {
    const [transaction, setTransaction] = useState("");
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
        Axios.get("http://localhost:3001/getTransactionForChartbyClinic",{
            params: {
                clinic: clinic,
            }
        }).then((response) => {
            console.log(response.data)
            setTransaction(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }, [clinic]);
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
