import React from "react";
import {Wrapper} from "./EmployeeMenu.styles";
import {Row, Col} from 'react-bootstrap';
import Cardmenu from "../../components/Cardmenu/Cardmenu";

function EmployeeMenu() {
    return (
        <div>
            <Wrapper>
                <h1>Employee Menu</h1>
                <Row className="mt-5 mb-3 mx-5 px-5" >
                    <Col xs={12} sm={12} md={6} lg={6} className="my-2" >
                        <Cardmenu imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                        title="Transaction" sub="ooo" link="/Transaction"
                        />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} className="my-2 " >
                        <Cardmenu imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                        title="Add Employee" sub="ooo" link="/AddEmployee"
                        />
                    </Col>
                </Row>
                <Row className="mt-5 mb-4 mx-5 px-5" >
                    <Col xs={12} sm={12} md={6} lg={6} className="my-2 " >
                        <Cardmenu imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                        title="Seach Employee" sub="ooo" link="/SearchEmployee"
                        />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} className="my-2" >
                        <Cardmenu imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                        title="Edit Entitlement" link="/selectgrade"
                        />
                    </Col>
                </Row>

            </Wrapper>
        </div>
    );
}

export default EmployeeMenu