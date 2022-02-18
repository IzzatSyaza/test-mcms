import React from "react";
import {Wrapper} from "./ReportMenu.styles";
import {Row, Col} from 'react-bootstrap';
import Cardmenu from "../../components/Cardmenu/Cardmenu";

function ReportMenu() {
    return (
        <div>
            <Wrapper>
                <h1>Report Menu</h1>
                <Row className="mt-5 mb-3 mx-5 px-5" >
                    <Col xs={12} sm={6} md={4} lg={3} className="my-2" >
                        <Cardmenu imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                        title="Report by Clinic" link="/ReportByClinic"
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="my-2 " >
                        <Cardmenu imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                        title="Report by Department" link="/ReportByDepartment"
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="my-2" >
                        <Cardmenu imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                        title="Report by Medical Code" link="/ReportByMedical"
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="my-2 " >
                        <Cardmenu imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                        title="Report Clinic by Employee" sub="ooo"
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="my-2" >
                        <Cardmenu imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                        title="Report by Employee" sub="ooo"
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="my-2 " >
                        <Cardmenu imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                        title="Report by Exceed Limit" sub="ooo"
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="my-2" >
                        <Cardmenu imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                        title="Report Cost by Employee" sub="ooo"
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="my-2 " >
                        <Cardmenu imgURL="https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg"
                        title="Report Report Cost by Department" sub="ooo"
                        />
                    </Col>
                    
                </Row>
            </Wrapper>
        </div>
    );
}

export default ReportMenu