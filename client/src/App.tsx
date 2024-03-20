import './App.css';
import {Home} from './Pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {CallbackPage} from "./Pages/CallbackPage";
import {AccessTokenProvider} from "./Context/AccessTokenContext";
import {NewPlaylist} from "./Components/Playlist/NewPlaylist";
import {Layout} from "./Components/AppLayout/Layout";
import React from "react";

function App() {

    return (
        <BrowserRouter>
            <AccessTokenProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/callback" element={<CallbackPage/>}/>
                        <Route path="/playlist/:playlistId"
                               element={<NewPlaylist/>}/> {/*change this to be playlist page */}
                    </Routes>
                </Layout>
            </AccessTokenProvider>
        </BrowserRouter>
    );
}

export default App;
