import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Login,
  Signup,
  Profile,
  ForgotPassword,
  VerifyEmail,
} from "./components";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Profile />} />
        <Route path="/otp/verify" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
