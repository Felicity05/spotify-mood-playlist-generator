import './App.css';
import {Home} from './Pages/Home';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {CallbackPage} from "./Pages/CallbackPage";
import {AccessTokenProvider, useAccessToken} from "./Context/AccessTokenContext";
import {DisplayPlaylist} from "./Components/Playlist/DisplayPlaylist";
import {Layout} from "./Components/AppLayout/Layout";
import React, {ReactChildren, ReactComponentElement, ReactNode} from "react";
import {LogInPage} from "./Pages/LogInPage";
import {MainContent} from "./Components/MainContent/MainContent";


type RequireAuthProps = {
    children: ReactNode;
};

const RequireAuth: React.FC<RequireAuthProps> = ({children}) => {
    const {isLoggedIn: isAuthenticated} = useAccessToken();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }
    return <>{children}</>;
}

function App() {
    return (
        <BrowserRouter>
            <AccessTokenProvider>
                <Layout>
                    <Routes>
                        <Route path="/login" element={<LogInPage/>}/>
                        <Route path="/callback" element={<CallbackPage/>}/>
                        <Route path="/" element={
                            <RequireAuth>
                                <MainContent/>
                            </RequireAuth>
                        }/>
                        <Route path="/playlist/:playlistId" element={
                            <RequireAuth>
                                <DisplayPlaylist/>
                            </RequireAuth>
                        }/>
                    </Routes>
                </Layout>
            </AccessTokenProvider>
        </BrowserRouter>
    );
}

export default App;
