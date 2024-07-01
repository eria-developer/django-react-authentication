import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSigninWithGoogle = async (response) => {
    const payload = response.credential;
    const server_res = await axios.post(
      "http://localhost:8000/api/v1/auth/google/",
      { access_token: payload }
    );
    console.log(server_res.data);

    const user = {
      email: server_res.data.email,
      name: server_res.data.full_name,
    };

    if (server_res.status === 200) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem(
        "access",
        JSON.stringify(server_res.data.access_token)
      );
      localStorage.setItem(
        "refresh",
        JSON.stringify(server_res.data.refresh_token)
      );
      navigate("/dashboard");
      toast.success(`You are welcome ${server_res.data.full_name}`);
    }
  };

  const loadGoogleScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const initializeGoogleSignIn = async () => {
      await loadGoogleScript();
      /* global google */
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_CLIENT_ID,
        callback: handleSigninWithGoogle,
      });
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "circle",
        width: "280",
      });
    };
    initializeGoogleSignIn();
  }, []);

  const { email, first_name, last_name, password, password2 } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!email || !first_name || !last_name || !password || !password2) {
      setError("All fields are required");
    } else {
      console.log(formData);
      //   making call to api
      const res = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/register/",
        formData
      );

      const response = res.data;
      console.log(response);

      //   checking response
      if (res.status === 201) {
        navigate("/otp/verify");
        toast.success(res.data.message);
      }
    }
  };

  return (
    <div>
      <div className="form-container">
        <div style={{ width: "100%" }} className="wrapper">
          <h2>create account</h2>

          <form action="" onSubmit={handleOnSubmit}>
            <p style={{ color: "red", padding: "1px", alignItems: "center" }}>
              {error ? error : ""}
            </p>
            <div className="form-group">
              <label htmlFor="">Email Address:</label>
              <input
                type="text"
                className="email-form"
                name="email"
                value={email}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">First Name:</label>
              <input
                type="text"
                className="email-form"
                name="first_name"
                value={first_name}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Last Name:</label>
              <input
                type="text"
                className="email-form"
                name="last_name"
                value={last_name}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Password:</label>
              <input
                type="password"
                className="email-form"
                name="password"
                value={password}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Confirm Password:</label>
              <input
                type="password"
                className="p"
                name="password2"
                value={password2}
                onChange={handleOnChange}
              />
            </div>
            <input type="submit" value="Submit" className="submitButton" />
          </form>
          <h3 className="text-option">Or</h3>
          <div className="githubContainer">
            <button>Sign up with Github</button>
          </div>
          <div className="githubContainer">
            <div id="signInDiv" className="gsignIn"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
