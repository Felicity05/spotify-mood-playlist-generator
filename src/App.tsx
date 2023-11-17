import './App.css';
import { Home } from './Pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {LogIn} from "./Components/LogIn";
import {CallbackPage} from "./Pages/CallbackPage";
import {Content} from "./Components/Content";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<LogIn />} />
              <Route path="/callback" element={<CallbackPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/content" element={<Content />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
