// AccessTokenContext.js
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {UserProfile} from "../types";

interface AccessTokenContextProps {
    accessToken: string | null;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
    userProfile: UserProfile | null;
    setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const AccessTokenContext = createContext<AccessTokenContextProps | undefined>(undefined);

const AccessTokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    return (
        <AccessTokenContext.Provider value={{ accessToken, setAccessToken, userProfile, setUserProfile }}>
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

export { AccessTokenProvider, useAccessToken };
