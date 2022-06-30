import axios from "axios";

const API = {
  getFareData: () => {
    return axios.get("./fares.json");
  },
};

export default API;
