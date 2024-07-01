import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInstance from "../utils/axiosInstance";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const jwt_access = localStorage.getItem("access");
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt_access === null || !user) {
      navigate("/login");
    } else {
      getSomeData();
    }
  }, [jwt_access, user]);

  const refresh = JSON.parse(localStorage.getItem("refresh"));

  const getSomeData = async () => {
    const response = await AxiosInstance.get("/auth/profile");
    if (response.status === 200) {
      console.log(response.data);
    }
  };

  // const handleLogout = async () => {
  //   const response = await AxiosInstance.post("/auth/logout/", {
  //     refresh: refresh,
  //   });
  //   if (response.status === 200) {
  //     localStorage.removeItem("access");
  //     localStorage.removeItem("refresh");
  //     localStorage.removeItem("user");
  //     navigate("/login");
  //     toast.success("You have been successfully logged out!");
  //   }
  // };

  const handleLogout = async () => {
    try {
      const response = await AxiosInstance.post("/auth/logout/", {
        refresh: refresh,
      });
      if (response.status === 200) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        navigate("/login");
        toast.success("You have been successfully logged out!");
      }
    } catch (error) {
      console.error("Logout error: ", error);
      toast.error("There was an error logging out. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>hi {user && user.name}</h2>
      <p style={{ textAlign: "center" }}>welcome to your profile</p>
      <button
        onClick={handleLogout}
        style={{ cursor: "pointer" }}
        className="logout-btn"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
