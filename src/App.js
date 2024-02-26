import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import BookConsultation from "./components/BookConsultation";
import LabTests from "./components/LabTests";
import "react-phone-input-2/lib/style.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="content">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bookconsultation" element={<BookConsultation />} />
              <Route path="/labtests" element={<LabTests />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
