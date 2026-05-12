import axios from "axios";

const api = axios.create({

  baseURL:
    "https://vokko-d4tm.onrender.com"
});

export default api;