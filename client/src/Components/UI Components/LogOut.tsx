import React from 'react';
import {Button} from "./Button";
import {TOKEN_STORAGE_KEY} from "../../utils/auth";
import {useAccessToken} from "../../Context/AccessTokenContext";
import styled from "styled-components";
import logOutIcon from '../../assets/Icons/icons8-logout-96 (1).png'
import {useNavigate} from "react-router-dom";

const LogoutWrapper = styled.div`
  //display: flex;
  //justify-content: flex-end;
  //align-items: center;
  //width: 100%;
  //padding-right: 25px;
`;

const LogOut = () => {
    const {setAccessToken} = useAccessToken();
    const navigate = useNavigate();

    const handleLogOut = () => {
        setAccessToken(null);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        navigate("/");
    }

    return (
        <LogoutWrapper>
            <Button variant="icon" size="cl" onClick={handleLogOut}>
                <img src={logOutIcon} alt={""} width={'32px'}/>
            </Button>
        </LogoutWrapper>
    );
}

export default LogOut;
