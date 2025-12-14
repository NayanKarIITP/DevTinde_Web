// import axios from "axios";
// import { BASE_URL } from "./constants";

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// export default api;



import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export default api;
