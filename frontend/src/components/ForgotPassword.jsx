import React, { useState } from "react";
import { toast } from "react-toastify";
import AxiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      const toastId = toast.loading("Sending reset password link...");
      try {
        const res = await AxiosInstance.post("auth/password-reset/", {
          email: email,
        });
        if (res.status === 200) {
          toast.update(toastId, {
            render: "A link to reset your password has been sent to your email",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
          setEmail("");
          navigate("");
        }
      } catch (error) {
        console.error("Error response:", error.response);
        toast.update(toastId, {
          render: "Failed to send reset password link.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <div>
      <h2>Enter your registered email</h2>
      <div className="wrapper">
        <form action="" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="">Email Address:</label>
            <input
              type="text"
              className="email-form"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="vbtn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
