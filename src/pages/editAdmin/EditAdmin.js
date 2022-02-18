import React, {useState, useEffect} from "react";
import {Form, Button, Row, Col} from 'react-bootstrap';
import InputForm from "../../components/InputForm/InputForm";
import Axios from "axios";
import "./editAdmin.css"
import {useParams, useHistory} from "react-router-dom";


function EditAdmin() {
    const {adminId} = useParams();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUser] = useState([]);
    let history = useHistory();

    useEffect(() => {
        Axios.get("http://localhost:3001/getAdminbyId",{
            params:{
                adminId: adminId,
            }
        }).then((response) => {
            console.log(response);
            setUsername(response.data[0].username);
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    // const editAdmin = (e) => {
    //     e.preventDefault();
    //     Axios.put("http://localhost:3001/editAdmin", {
    //         username: username,
    //         password: password,
    //         id: adminId,
    //     }).then((res) => {

    //         console.log(res);

    //     })
    // }

    // const {register, handleSubmit, errors} = useForm({
    //     resolver: yupResolver(scheme),
    // });

    // const submitForm = (data) => {
    //     console.log(data);
    // }
    useEffect(() => {
        Axios.get("http://localhost:3001/getUsername").then((response) => {
            setUser(response.data);
            console.log(response.data)
        })
        .catch((error) =>{console.log(error);});
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate());
        setIsSubmit(true);
    }

    const validate = () => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!username){
            errors.username = "Username is required!";
        }

        user.map(val=>{
            if(username === val.username){
                errors.username = "The Username Already Exist!";
            }
        })

        if (!password){
            errors.password = "Password is required!";
        }else if(password.length < 4){
            errors.password = "Password must be at least 4 characters!";
        }

        return errors
    }

    useEffect(() => {
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            Axios.put("http://localhost:3001/editAdmin", {
            username: username,
            password: password,
            id: adminId,
        }).then((res) => {
            alert(res.data.message);
            history.push("/AdminList");
        }).catch(err =>{
            alert(err);
        })
        }
    }, [formErrors])


    return (
    <div className="addClinic">
        <div className="addContainer">
        <h3 className="addTitle">Edit Admin</h3>
        <div className="addItem">
            <div>
        <Form onSubmit={handleSubmit}>
            <InputForm type="text" cId="" name="username" value={username}
            label="Username:" placeholder="Username"
            onChange={(event) =>{
                setUsername(event.target.value);
            }}/>
            <p className="errorText text-center">{formErrors.username}</p>
            
            <InputForm type="password" cId="" name="cpassword" value={password}
            label="New Password:" placeholder="Password"
            onChange={(event) =>{
                setPassword(event.target.value);
            }}/>
            <p className="errorText text-center">{formErrors.password}</p>
            
            <Form.Group as={Row} className="mt-5"
            controlId="formHorizontalPwd">
                <Col xs={{span: 1, offset:8}}
                sm={{span: 1, offset:9}}
                md={{span: 1, offset:10}}
                lg={{span: 1, offset:10}}
                >
                    <Button  type="submit">Submit</Button>
                </Col>
            </Form.Group>
        </Form>
        </div>
        </div>
        </div>
    </div>
    );
}

export default EditAdmin;