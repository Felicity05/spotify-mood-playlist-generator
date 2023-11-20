import './App.css';
import { Home } from './Pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {LogIn} from "./Components/LogIn";
import {CallbackPage} from "./Pages/CallbackPage";
import {DisplayUserProfile} from "./Components/DisplayUserProfile";
import {AppContent} from "./Pages/AppContent";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/callback" element={<CallbackPage />} />
              <Route path="/content" element={<AppContent />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
