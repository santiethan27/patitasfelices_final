import axios from "./axios";

export const getReports = async () => axios.get("/reports");
export const postReport = async (report) => axios.post("/report", report);