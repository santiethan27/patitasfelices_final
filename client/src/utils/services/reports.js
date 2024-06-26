import axios from "./axios";

export const getReports = async () => axios.get("/reports");
export const postReport = async (report) => axios.post("/report", report);
export const deleteReport = async (id) => axios.delete(`/report/${id}`);
