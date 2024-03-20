import React from 'react';
import {Button} from "./Button";
import arrowLeft from "../../assets/Icons/icons8-arrow-96.png";
import arrowRight from "../../assets/Icons/icons8-arrow-96(1).png";
import LogOut from "./LogOut";

//TODO: only show arrows as active when on page different than home

export const NavBar = () => {
    return (
        <div style={{
            display: "flex", justifyContent: "space-between", width: "100%",
            padding: "0.3rem", boxSizing: "border-box", alignItems: "center"
        }}>
            <div style={{display: "flex", alignItems: "center", padding: "0 0.2rem", gap: "0.2rem"}}>
                <Button variant="icon" size="cl">
                    <img src={arrowLeft} alt="" width="24"/>
                </Button>
                <Button variant="icon" size="cl">
                    <img src={arrowRight} alt="" width="24"/>
                </Button>
            </div>
            <LogOut/>
        </div>
    );
}
