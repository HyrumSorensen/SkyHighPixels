import "./App.css";
import Home from "./pages/home/Home";
import Landing from "./pages/quillish/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quillish" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
