import React, {SetStateAction, useEffect} from "react";
import {exchangeAccessToken, getAccessToken} from "../utils/auth";
import {useNavigate} from "react-router-dom";
import {useAccessToken} from "../Context/AccessTokenContext";
import {UserProfile} from "../types";
import {getUserProfileData} from "../api/api";

export const CallbackPage: React.FC = () => {
    return <div>Loading...</div>;
}
