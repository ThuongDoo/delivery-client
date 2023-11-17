import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://thuongdo-delivery-app-api.onrender.com/api/v1",
});

export default instance;
