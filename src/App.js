import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./scenes/home";
import Search from "./scenes/serialSearch";
import Add from "./scenes/serailAdd";
import Edit from "./scenes/edit";
import Result from "./scenes/result";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/check-serial" element={<Search />} />
          <Route path="/add-products" element={<Add />} />
          <Route path="/edit-products" element={<Edit />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
