import React from "react";
import {Row, Col} from 'react-bootstrap';
import { FootWrapper, ImageLogo,BrandFooter, 
    BrandSubname, BrandContainer, Address, 
    Phone, Copyright } from "./Footer.styles";
import HammLogo from "../../images/hamm_logo.png";
import {FaMapMarkerAlt, FaPhoneAlt, FaCopyright } from 'react-icons/fa';

function Footer() {
    var date = new Date();
    var year = date.getFullYear();
    return (
        <FootWrapper>
            <Row className="mt-5">
                <Col sm={12} md={8} lg={5}>
                <BrandContainer className="d-flex text-start">

                    <ImageLogo src={HammLogo} alt=""/>
                    <BrandFooter className="text-uppercase ">Medical Charge <br/>
                    <BrandSubname>Management System</BrandSubname>
                    
                    </BrandFooter>
                    </BrandContainer>
                </Col>
                <Col sm={12} md={12} lg={7}>
                    <Row>
                        <Col xs={1} sm={1} md={1} lg={1}>
                        <Address><FaMapMarkerAlt /></Address>
                        </Col>
                        <Col xs={11} sm={11} md={11} lg={11}>
                            <Address>
                            Hicom Aoutomomotive Manufacturer (M) Sdn Bhd, 
                            Kawasan Perindustrian Peramu Jaya, Pekan Pahang (Plant HA1)
                            </Address>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1} sm={1} md={1} lg={1}>
                        <Phone><FaPhoneAlt /></Phone>
                        </Col>
                        <Col xs={11} sm={11} md={11} lg={11}>
                            <Phone>
                            011109028732
                            </Phone>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                <Copyright >
                <FaCopyright/> {year} Izzat Syaza - All right reserved
                </Copyright>
                </Col>
            </Row>
        </FootWrapper>
        
    );
}

export default Footer;