import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import AxiosInstance from "../utils/axiosInstance";

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  const { uid, token } = useParams();
  const { password, confirm_password } = passwords;

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirm_password) {
      toast.error("All password fields are required");
    } else if (password !== confirm_password) {
      toast.error("Both passwords should match");
    } else {
      try {
        const response = await AxiosInstance.patch("auth/set-new-password/", {
          password: password,
          confirm_password: confirm_password,
          uidb64: uid,
          token: token,
        });

        const result = response.data;
        if (response.status === 200) {
          navigate("/login");
          toast.success(result.message);
        }
      } catch (error) {
        console.error("Error response:", error.response);
        toast.error("Failed to reset password.");
      }
    }
  };

  return (
    <div>
      <div className="form-container">
        <div className="wrapper" style={{ width: "100%" }}>
          <h2>Enter your New Password</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="">New Password:</label>
              <input
                type="password"
                className="email-form"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Confirm Password</label>
              <input
                type="password"
                className="email-form"
                name="confirm_password"
                value={confirm_password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="vbtn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
