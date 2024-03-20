import React, {ReactNode} from 'react';
import styled from "styled-components";
import {Box} from "../UI Components/Box";
import {useLocation} from 'react-router-dom';

interface MainDisplayProps {
    children: ReactNode;
}

const StyledMainDisplay = styled.div`
  //width: 100%;
  //height:100%;
  //background-color: #040306; //#1db954;
  //border: solid #1db954 2px;
  color: white;
  grid-area: main;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

export const Main: React.FC<MainDisplayProps> = ({children}) => {
    const location = useLocation();

    let background;
    switch (location.pathname) {
        case '/':
            background = 'linear-gradient(180deg, rgba(14, 192, 76, 0.74), rgba(85, 30, 153, 0.60), rgba(140, 32, 223, 0))';
            break;
        case '/playlist':
            background = 'linear-gradient(to right, red, orange, yellow)';
            break;
        // Add more cases for other pages
        default:
            background = 'white';
    }


    return (
        <StyledMainDisplay>
            <Box alignment="left" background={background}>
                {children}
            </Box>
        </StyledMainDisplay>
    );
}
