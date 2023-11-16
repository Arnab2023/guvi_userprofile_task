import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import HomeProfile from "./pages/HomeProfile/HomeProfile";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/profile" element={<HomeProfile />}></Route>
          <Route path="/update" element={<Profile />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
