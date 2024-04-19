import axios, { AxiosInstance } from "axios";
// import cookies from "js-cookie"
// "access_token": cookies.get("access_token"),
const BASE_URL = "http://localhost:3000";

export const apiRequest: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
  // timeout: 30000,
});

apiRequest.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === "401") {
      // error handling code
    }
    console.log("error is", error);
    return Promise.reject(error);
  }
);

const ExampleApiCall = async () => {
  try {
    const response = await apiRequest.get("/questions");
    const userId = response.data.userId;
    console.log(response);
  } catch (err) {
    console.log("Error is", err);
  }
};

const Login = async () => {
  try {
    const response = await apiRequest.post("/auth/login");
    const { accessToken } = response.data;

    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    // accessToken을 localStorage, cookie 등에 저장하지 않는다!
  } catch (err) {
    console.log("Error is", err);
  }
};
