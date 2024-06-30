import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  return (
    <div>
      <div className="form-container">
        <form action="" style={{ width: "30%" }} onSubmit={""}>
          <div className="form-group">
            <label htmlFor="">Enter your Otp code:</label>
            <input
              type="text"
              className="email-form"
              name="otp"
              value={"otp"}
            />
          </div>
          <button type="submit" className="vbtn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
