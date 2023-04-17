import axios from "axios";

const Http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
});

export { Http };