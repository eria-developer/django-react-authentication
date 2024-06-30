import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //   const [error, setError] = useState("");
  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
    } else {
      //   const toastId = toast.loading("Logging in...");
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login/",
        formData
      );
      console.log(response.data);

      const user = {
        email: response.data.email,
        name: response.data.full_name,
      };

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem(
          "access",
          JSON.stringify(response.data.access_token)
        );
        localStorage.setItem(
          "refresh",
          JSON.stringify(response.data.refresh_token)
        );
        navigate("/dashboard");
        toast.success(`You are welcome ${response.data.full_name}`);
      }
    }
  };

  return (
    <div>
      <div className="form-container">
        <div style={{ width: "100%" }} className="wrapper">
          <h2>Login into your account</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="">Email Address:</label>
              <input
                type="text"
                className="email-form"
                value={email}
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Password:</label>
              <input
                type="password"
                className="email-form"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </div>

            <input type="submit" value="Login" className="submitButton" />
            <p className="pass-link">
              <Link to={"/forget-password"}>forgot password</Link>
            </p>
          </form>
          <h3 className="text-option">Or</h3>
          <div className="githubContainer">
            <button>Sign in with Github</button>
          </div>
          <div className="googleContainer">
            <div id="signInDiv" className="gsignIn"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
