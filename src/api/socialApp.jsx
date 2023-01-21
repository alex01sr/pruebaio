import axios from "axios";
const socialApp = axios.create({
  baseURL: "http://34.123.34.29/api",
});

export default socialApp;
