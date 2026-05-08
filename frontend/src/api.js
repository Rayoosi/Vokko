import axios from "axios";

const api = axios.create({

  baseURL:
    "https://vokko-production.up.railway.app"
});

export default api;