import axios from "axios"

const API = axios.create({
    baseURL:"https://react30.onrender.com/api/user"
})
export default API