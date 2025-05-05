import axios from "axios";

// Fetch the config and return a Promise of the axios instance
const axiosInstancePromise = fetch("/config.json")
  .then(res => res.json())
  .then(config => {
    const baseURL = config.API_BASE_URL;
    // console.log("Axios Base URL:", baseURL);
    return axios.create({ baseURL });
  })
  .catch(err => {
    console.error("Failed to load config.json:", err);
    // Fallback baseURL if needed
    return axios.create({ baseURL: "http://localhost:3000" });
  });

export default axiosInstancePromise;
