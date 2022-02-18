import React from "react";
import {Form, Row, Col} from 'react-bootstrap';

function InputForm(props){
    return (
        <Form.Group as={Row} className="mb-3"
        controlId={props.cID}>
            <Form.Label column xs={12} sm={12} md={3} lg={3}>
                {props.label}
            </Form.Label>
            <Col xs={12} sm={12} md={8} lg={8}>
                <Form.Control 
                name={props.name} 
                onChange={props.onChange} 
                type={props.type} 
                placeholder={props.placeholder}
                value={props.value}
                ref={props.ref}
                />
            </Col>
        </Form.Group>
    );
}

export default InputForm;