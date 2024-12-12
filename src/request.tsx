import axios from "axios";



axios.defaults.baseURL=process.env.NODE_ENV=="development"?"http://192.168.1.16:8080":process.env.PUBLIC_URL;
axios.defaults.withCredentials=true

export default axios