import axios from "axios";

let api = new axios.create({
    baseURL : "http://localhost:8090/"
})

export default api;