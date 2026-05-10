import axios from "axios";

const api = axios.create({

  baseURL:
    "https://vokko-backend-production-037c.up.railway.app"
});

export default api;