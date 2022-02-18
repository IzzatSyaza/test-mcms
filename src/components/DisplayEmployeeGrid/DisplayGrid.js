import React from "react";
import { Col, Row} from "react-bootstrap"
import {Wrapper} from "./DisplayGrid.styles"

function DisplayGrid(props) {
    return (
        <Wrapper>
            <Row >
                <Col xs={10} sm={6} md={5} lg={3}>
                    {props.title}:
                </Col>
                <Col xs={2} sm={6} md={7} lg={9}>
                    <p>{props.info}</p>
                </Col>
            </Row>
        </Wrapper>
    );
}

export default DisplayGrid;