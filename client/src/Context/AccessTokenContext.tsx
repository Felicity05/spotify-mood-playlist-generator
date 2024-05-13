// AccessTokenContext.js
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {UserProfile} from "../types";
import {getAccessToken} from "../utils/auth";
import {getPlaylistsForCurrentUser, getUserProfileData} from "../api/api";

interface AccessTokenContextProps {
    accessToken: string | null | undefined;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
    userProfile: UserProfile | null;
    setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const AccessTokenContext = createContext<AccessTokenContextProps | undefined>(undefined);

const AccessTokenProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [accessToken, setAccessToken] = useState<string | null | undefined>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const token = getAccessToken();

        setAccessToken(token);
        if (token) {
            fetchUserProfileData();
        }
    }, [])

    const fetchUserProfileData = async () => {
        try {
            const userProfileResponse = await getUserProfileData();
            setUserProfile(userProfileResponse.data)
        } catch (error) {
            console.error("Error fetching user profile data: ", error);
        }
    }

    return (
        <AccessTokenContext.Provider value={{accessToken, setAccessToken, userProfile, setUserProfile}}>
            {children}
        </AccessTokenContext.Provider>
    );
};

const useAccessToken = (): AccessTokenContextProps => {
    const context = useContext(AccessTokenContext);
    if (!context) {
        throw new Error('useAccessToken must be used within an AccessTokenProvider');
    }
    return context;
};

export {AccessTokenProvider, useAccessToken};
