import React, {HTMLAttributes, ReactNode, useEffect, useState} from 'react';
import styled from "styled-components";
import {Box} from "../UI Components/Box";
import {useLocation} from 'react-router-dom';
import ColorHeader from "../UI Components/ColorHeader";
import {NavBar} from "../UI Components/NavBar";
import {useAccessToken} from "../../Context/AccessTokenContext";

interface MainDisplayProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
}

const StyledMainDisplay = styled.div`
  //width: 100%;
  height: 100vh;
  //background-color: #040306; //#1db954;
  //border: solid #1db954 2px;
  color: white;
  grid-area: main;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0.5rem;
`

export const Main: React.FC<MainDisplayProps> = ({children, ...rest}) => {
    const handleScroll = () => {
        window.addEventListener('scroll', () => console.log(window.scrollY)
        )
        console.log(window.scrollY)
    }

    return (
        <StyledMainDisplay {...rest} >
            <Box alignment="left" style={{position: "relative"}} onScroll={handleScroll}>
                <ColorHeader/>
                {children}
            </Box>
        </StyledMainDisplay>
    );
}
