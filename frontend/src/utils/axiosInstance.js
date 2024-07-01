import axios from "axios";
// import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

let accessToken = localStorage.getItem("access")
  ? JSON.parse(localStorage.getItem("access"))
  : "";
let refresh_token = localStorage.getItem("refresh")
  ? JSON.parse(localStorage.getItem("refresh"))
  : "";

console.log("access: ", accessToken);
const baseURL = "http://localhost:8000/api/v1";

const AxiosInstance = axios.create({
  baseURL: baseURL,
  "Content-type": "application/json",
  headers: {
    Authorization: localStorage.getItem("access")
      ? `Bearer ${accessToken}`
      : "",
  },
});

AxiosInstance.interceptors.request.use(async (req) => {
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    // console.log(isExpired);

    if (isExpired) {
      return req;
    } else {
      const res = await axios.post(`${baseURL}/auth/token/refresh/`, {
        refresh: refresh_token,
      });
      console.log(res.data);
      if (res.status === 200) {
        localStorage.setItem("access", JSON.stringify(res.data.access));
        req.headers.Authorization = `Bearer ${res.data.access}`;
        return req;
      } else {
        const res = await axios.post(`${baseURL}/auth/logout/`, {
          refresh: refresh_token,
        });
        if (res.status === 200) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("user");
        }
      }
    }
  }
  return req;
});

export default AxiosInstance;
