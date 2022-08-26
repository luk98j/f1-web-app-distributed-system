import AxiosHttp from "./AxiosHttp";

const API = {
    getSessionUid:(key) =>AxiosHttp.get("/user-data/check-key?key="+key),
    getLastEvent:(sessionUid, key) => AxiosHttp.get("/event/get-event?sessionUid="+sessionUid+"&key="+key),
    getLastFastestLap:(sessionUid, key) => AxiosHttp.get("/event/get-fastest-lap?sessionUid="+sessionUid+"&key="+key),
    getLapData:(sessionUid, key) => AxiosHttp.get("/lap-data/get-lap-data?sessionUid="+sessionUid+"&key="+key),

}

export default API;