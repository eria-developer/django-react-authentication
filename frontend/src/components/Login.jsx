import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  return (
    <div>
      <div className="form-container">
        <div style={{ width: "100%" }} className="wrapper">
          <h2>Login into your account</h2>
          <form action="" onSubmit={"handleSubmit"}>
            <div className="form-group">
              <label htmlFor="">Email Address:</label>
              <input
                type="text"
                className="email-form"
                value={""}
                name="email"
                onChange={""}
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Password:</label>
              <input
                type="text"
                className="email-form"
                value={""}
                name="password"
                onChange={""}
              />
            </div>

            <input type="submit" value="Login" className="submitButton" />
            <p className="pass-link">
              <Link to={"/forget-password"}>forgot password</Link>
            </p>
          </form>
          <h3 className="text-option">Or</h3>
          <div className="githubContainer">
            <button onClick={""}>Sign in with Github</button>
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
