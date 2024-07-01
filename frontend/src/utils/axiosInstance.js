// import axios from "axios";
// // import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";
// import { jwtDecode } from "jwt-decode";

// let accessToken = localStorage.getItem("access")
//   ? JSON.parse(localStorage.getItem("access"))
//   : "";
// let refresh_token = localStorage.getItem("refresh")
//   ? JSON.parse(localStorage.getItem("refresh"))
//   : "";

// console.log("access: ", accessToken);
// const baseURL = "http://localhost:8000/api/v1";

// const AxiosInstance = axios.create({
//   baseURL: baseURL,
//   "Content-type": "application/json",
//   headers: {
//     Authorization: localStorage.getItem("access")
//       ? `Bearer ${accessToken}`
//       : "",
//   },
// });

// AxiosInstance.interceptors.request.use(async (req) => {
//   if (accessToken) {
//     req.headers.Authorization = `Bearer ${accessToken}`;
//     const user = jwtDecode(accessToken);
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
//     // console.log(isExpired);

//     if (isExpired) {
//       return req;
//     } else {
//       const res = await axios.post(`${baseURL}/auth/token/refresh/`, {
//         refresh: refresh_token,
//       });
//       console.log(res.data);
//       if (res.status === 200) {
//         localStorage.setItem("access", JSON.stringify(res.data.access));
//         req.headers.Authorization = `Bearer ${res.data.access}`;
//         return req;
//       } else {
//         const res = await axios.post(`${baseURL}/auth/logout/`, {
//           refresh: refresh_token,
//         });
//         if (res.status === 200) {
//           localStorage.removeItem("access");
//           localStorage.removeItem("refresh");
//           localStorage.removeItem("user");
//         }
//       }
//     }

//     return req;
//   }
// });

// export default AxiosInstance;

import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

const baseURL = "http://localhost:8000/api/v1";

const AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(async (req) => {
  let accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  if (accessToken) {
    accessToken = JSON.parse(accessToken);
    req.headers.Authorization = `Bearer ${accessToken}`;

    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (isExpired) {
      try {
        const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        if (response.status === 200) {
          localStorage.setItem("access", JSON.stringify(response.data.access));
          req.headers.Authorization = `Bearer ${response.data.access}`;
        } else {
          await handleLogout();
        }
      } catch (error) {
        console.error("Token refresh error: ", error);
        await handleLogout();
      }
    }
  }

  return req;
});

const handleLogout = async () => {
  const refreshToken = localStorage.getItem("refresh");

  if (refreshToken) {
    try {
      const response = await axios.post(`${baseURL}/auth/logout/`, {
        refresh: JSON.parse(refreshToken),
      });

      if (response.status === 200) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Logout error: ", error);
    }
  }

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
  // Use your navigation function to redirect to the login page
  // navigate("/login");
  window.location.href = "/login"; // Alternatively, use this if navigate is not available
};

export default AxiosInstance;
