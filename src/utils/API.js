import AxiosHttp from "./AxiosHttp";

const API = {
    getSessionUid:(key) =>AxiosHttp.get("/check-key/"+key),

}

export default API;