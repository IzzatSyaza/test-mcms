import React, {useState, useEffect} from "react";
import {Form, Button, Row, Col} from 'react-bootstrap';
import Axios from "axios";
import { useParams, useHistory} from "react-router-dom"


function CloseTransaction() {
    const date = new Date();
    let year = date.getFullYear();
    let history = useHistory();

    const closeTran = (event) => {
        event.preventDefault();
        if (window.confirm("Do You Want To Close Transaction?") == true) {
            Axios.post("http://localhost:3001/cloneTable")
            .then((res) => {
            }).catch(err =>{
                alert(err);
            })
        }
    }

    

    return(
        <div className="addEmployee">
            <div className="addContainer">
            <h3 className="addTitle">Close Transaction {year}</h3>
                <div className="addItem">
                    <div>
                        <Button variant="danger" onClick={closeTran} type="submit">CLOSE TRANSACTION</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CloseTransaction;