import styled from 'styled-components';
import {Button} from "react-bootstrap";
import {FaSignInAlt } from 'react-icons/fa';


const sizes = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
  };

  export const devices = {
    mobileS: `(min-width: ${sizes.mobileS})`,
    mobileM: `(min-width: ${sizes.mobileM})`,
    mobileL: `(min-width: ${sizes.mobileL})`,
    tablet: `(min-width: ${sizes.tablet})`,
    laptop: `(min-width: ${sizes.laptop})`,
    laptopL: `(min-width: ${sizes.laptopL})`,
    desktop: `(min-width: ${sizes.desktop})`,
  };

export const ImageContainer = styled.div`
  background: url(https://images.squarespace-cdn.com/content/v1/56d765a3746fb902cc9658da/1456972684977-Z35HIUY1M975X245MI19/image-asset.jpeg) center center/cover no-repeat;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
  object-fit: contain;
  color: #fff;
`;

export const HomeButton = styled(Button)`
  font-weight: 700;
  font-size: 20px;
  padding: 4px 23px;
  margin: 10px;
`;

export const HomeH1 = styled.h1`
  font-weight: 700;
  font-size: 20px;
  color: #fff;
  padding: 8px;

  @media ${devices.mobileS} {
    font-size: 24px;
  }

  @media ${devices.mobileM} {
    font-size: 32px;
    
  }
  
  @media ${devices.mobileL} {
    font-size: 41px;
  }
  
 @media ${devices.tablet} {
    font-size: 70px;
  }
 
`;

export const HomeH4 = styled.h4`
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  padding: 0;

  @media ${devices.mobileS} {
    font-size: 16px;
  }

  @media ${devices.mobileM} {
    font-size: 18px;
    
  }
  
  @media ${devices.mobileL} {
    font-size: 20px;
  }
  
 @media ${devices.tablet} {
    font-size: 25px;
  }
`;

export const LoginIcon = styled(FaSignInAlt)`
    font-size: 1.5rem;
    margin: 0 5px 6px;
    
`;