import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Login from "./pages/LoginPage";
import HelloPage from "./pages/HelloPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HelloPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<HelloPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
