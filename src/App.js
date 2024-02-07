import "./App.css";
import Home from "./apps/home/Home";
import Landing from "./apps/quillish/Landing";
import Main from "./apps/camelup/Main"
import TextAdventure from "./apps/textAdventure/textAdventure"
import WebGl from "./apps/webgl/WebGl"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quillish" element={<Landing />} />
          <Route path="/camelup" element={<Main />} />
          <Route path="/textAdventure" element={<TextAdventure/>} />
          <Route path="/webgl" element={<WebGl/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
