import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./scenes/home";
import Search from "./scenes/serialSearch";
import Add from "./scenes/serailAdd";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/check-serial" element={<Search />} />
          <Route path="/add-products" element={<Add />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
