import React from 'react';
import {Button} from "./Button";
import {clearAccessToken} from "../../utils/auth";
import styled from "styled-components";
import logOutIcon from '../../assets/Icons/icons8-exit-96.png'
import {useNavigate} from "react-router-dom";

const LogoutWrapper = styled.div`
  //display: flex;
  //justify-content: flex-end;
  //align-items: center;
  //width: 100%;
  //padding-right: 25px;
`;

const LogOut = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        clearAccessToken();
        const value = localStorage.getItem("isLoggedIn") === "true";
        localStorage.setItem("isLoggedIn", value.toString());
        navigate("/login");
    }

    return (
        <LogoutWrapper>
            <Button variant="icon" size="cl" onClick={handleLogOut}>
                <img src={logOutIcon} alt={""} width={24}/>
            </Button>
        </LogoutWrapper>
    );
}

export default LogOut;
