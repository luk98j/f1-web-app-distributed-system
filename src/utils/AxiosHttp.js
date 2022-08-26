import axios from "axios";

const AxiosHttp = axios.create({
    baseURL: `${process.env.REACT_APP_ROOT_PATH}`,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":"GET"
    }
});


export default AxiosHttp;