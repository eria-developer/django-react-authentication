import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <div className="form-container">
        <div style={{ width: "100%" }} className="wrapper">
          <h2>create account</h2>
          <form action="" onSubmit={""}>
            <div className="form-group">
              <label htmlFor="">Email Address:</label>
              <input type="text" className="email-form" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="">First Name:</label>
              <input type="text" className="email-form" name="first_name" />
            </div>
            <div className="form-group">
              <label htmlFor="">Last Name:</label>
              <input type="text" className="email-form" name="last_name" />
            </div>
            <div className="form-group">
              <label htmlFor="">Password:</label>
              <input type="text" className="email-form" name="password" />
            </div>
            <div className="form-group">
              <label htmlFor="">Confirm Password:</label>
              <input type="text" className="p" name="password2" />
            </div>
            <input type="submit" value="Submit" className="submitButton" />
          </form>
          <h3 className="text-option">Or</h3>
          <div className="githubContainer">
            <button>Sign up with Github</button>
          </div>
          <div className="githubContainer">
            <button>Sign up with Google</button>
            <div id="signInDiv" className="gsignIn"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
