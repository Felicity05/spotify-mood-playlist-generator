import React, {HTMLAttributes, ReactNode} from 'react';
import styled from "styled-components";
import {Box} from "../UI Components/Box";
import ColorHeader from "../UI Components/ColorHeader";
import MainFooter from "../MainContent/MainFooter";

interface MainDisplayProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
}

const StyledMainDisplay = styled.div<MainDisplayProps>`
  grid-area: main;
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: white;
  box-sizing: border-box;
  padding: 0.5rem;
  //width: 100%;
  //background-color: #040306; //#1db954;
  //border: solid #1db954 2px;
  overflow: hidden;
  overflow-y: auto;

  @media (max-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas: "main"
  }
`

export const Main: React.FC<MainDisplayProps> = ({children, ...rest}) => {

    return (
        <StyledMainDisplay {...rest} >
            <Box alignment="left" style={{position: "relative"}} id="box">
                <ColorHeader/>
                {children}
                <MainFooter/>
            </Box>
        </StyledMainDisplay>
    );
}
