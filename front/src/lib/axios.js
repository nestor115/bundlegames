import Axios from "axios";

const axios = Axios.create({
   baseURL: "http://79.143.91.167/back", 
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
