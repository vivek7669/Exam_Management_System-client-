import axios from "axios";

let api = new axios.create({
    baseURL : "https://exammanagementsystem-production.up.railway.app/"
})

export default api;
