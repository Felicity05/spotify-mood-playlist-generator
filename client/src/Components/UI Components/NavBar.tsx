import React, {HTMLAttributes, useEffect, useState} from 'react';
import {Button} from "./Button";
import arrowLeft from "../../assets/Icons/icons8-arrow-96.png";
import arrowRight from "../../assets/Icons/icons8-arrow-96(1).png";
import LogOut from "./LogOut";
import styled from "styled-components";

//TODO: only show arrows as active when on page different than home make navbar sticky to the top
// and add background color and transition when scrolling

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {
    scrolled?: boolean
}

const Navbar = styled.nav<NavBarProps>`
  //position: sticky;
  top: 0;
    //background-color: ${({scrolled}) => (scrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent')};
  transition: background-color 0.3s;
  z-index: 1000;
  //border: solid red 2px;
  align-items: center;
  background-color: #1db954;
  width: inherit;
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  color: white;
`;

export const NavBar: React.FC<NavBarProps> = ({...rest}) => {

    return (
        // <div style={{
        //     display: "flex", justifyContent: "space-between", width: "100%",
        //     padding: "0.5rem 1.3rem", boxSizing: "border-box", alignItems: "center",
        // }}>
        <Navbar {...rest}>
            <NavbarContent>
                <div style={{display: "flex", alignItems: "center", padding: "0 0.2rem", gap: "0.2rem"}}>
                    <Button variant="icon" size="cl">
                        <img src={arrowLeft} alt="" width="24"/>
                    </Button>
                    <Button variant="icon" size="cl">
                        <img src={arrowRight} alt="" width="24"/>
                    </Button>
                </div>
                <LogOut/>
            </NavbarContent>
        </Navbar>
        // </div>
    );
}
