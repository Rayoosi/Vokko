import axios from "axios";

const api = axios.create({

  baseURL:
    "https://vokko-backend-production.up.railway.app"
});

export default api;