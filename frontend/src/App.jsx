import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Login,
  Signup,
  Profile,
  ForgotPassword,
  VerifyEmail,
} from "./components";
import "./App.css";
import ResetPasword from "./components/ResetPasword";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Profile />} />
        <Route path="/otp/verify" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/api/v1/auth/password-reset-confirm/:uid/:token"
          element={<ResetPasword />}
        />
      </Routes>
    </Router>
  );
}

export default App;
