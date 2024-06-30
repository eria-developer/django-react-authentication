import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const jwt_access = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt_access === null || !user) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {};

  return (
    <div className="container">
      <h2>hi {user && user.name}</h2>
      <p style={{ textAlign: "center" }}>welcome to your profile</p>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Profile;
