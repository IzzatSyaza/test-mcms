import React from "react";
import {Wrapper} from "./ClinicMenu.styles";
import {Row, Col} from "react-bootstrap";
import Cardmenu from "../../components/Cardmenu/Cardmenu";

function ClinicMenu() {
    return (
        <div>
            <Wrapper>
                <h1>Employee Menu</h1>
                <Row className="my-5 mx-auto">
                <Col xs={12} sm={8} md={6} lg={5}>
                    <Cardmenu className="" imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                    title="Clinic List" sub="ooo"
                    />
                </Col>

                <Col xs={12} sm={8} md={6} lg={5}>
                    <Cardmenu className="" imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                    title="Add Clinic" sub="ooo" link="/addclinic"
                    />
                </Col>
                </Row>

            </Wrapper>
        </div>
    );
}

export default ClinicMenu;