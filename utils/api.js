import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://192.168.0.176:4000/api/v1",
});

export default instance;
