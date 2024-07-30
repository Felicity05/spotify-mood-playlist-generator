import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {CallbackPage} from "./Pages/CallbackPage";
import {AccessTokenProvider, useAccessToken} from "./Context/AccessTokenContext";
import {DisplayPlaylist} from "./Components/Playlist/DisplayPlaylist";
import {Layout} from "./Components/AppLayout/Layout";
import React, {ReactNode} from "react";
import {LogInPage} from "./Pages/LogInPage";
import {MainContent} from "./Components/MainContent/MainContent";
import LoadingPage from "./Pages/LoadingPage";


type RequireAuthProps = {
    children: ReactNode;
};

const RequireAuth: React.FC<RequireAuthProps> = ({children}) => {
    const {isLoggedIn: isAuthenticated, loading} = useAccessToken();
    if (loading) {
        return <LoadingPage/>; // Render a loading state while checking authentication
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }
    return <>{children}</>;
}

function App() {
    return (
        <BrowserRouter>
            <AccessTokenProvider>
                <Routes>
                    <Route path="/login" element={<LogInPage/>}/>
                    <Route path="/callback" element={<CallbackPage/>}/>
                    <Route path="/" element={
                        <RequireAuth>
                            <Layout>
                                <MainContent/>
                            </Layout>
                        </RequireAuth>
                    }/>
                    <Route path="/playlist/:playlistId" element={
                        <RequireAuth>
                            <Layout>
                                <DisplayPlaylist/>
                            </Layout>
                        </RequireAuth>
                    }/>
                </Routes>
            </AccessTokenProvider>
        </BrowserRouter>
    );
}

export default App;
