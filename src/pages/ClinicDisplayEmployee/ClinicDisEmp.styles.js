import styled from 'styled-components';
import {Button, Card} from 'react-bootstrap';

export const Wrapper = styled.div`
    padding: 10% 15% 14%;
    text-align: ;
    background-color: #EDEDED;
    
`;
export const SearchCard = styled.div`
    margin: 10px ;
    padding: 8% 15%;
    text-align: ;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const Formdiv = styled.div`
    margin: auto;
    
`;

export const SearchInput = styled.input`
    padding: 5px;
    font-size: 17px;
    border: 1px solid grey;
    float: left;
    width: 20%;
    height: 5%;
    background: #fff;
`;

export const SearchButton = styled(Button)`
    float: left;
    width: 5%;
    height: 35px;
    padding: 5px;
    font-size: 17px;
    border: 1px solid grey;
    border-left: none;
    cursor: pointer;
    border-radius: 0px;
`;

export const CardStyle = styled(Card)`
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    
`;

export const CardBody= styled(Card.Body)`
    padding: 3% 10%;
    
`;