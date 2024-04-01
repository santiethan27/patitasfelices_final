import axios from "./axios";

export const getInterviewUser = async (id) => await axios.get(`/interview/user/${id}`);
export const getInterviewAdoption = async (id) => await axios.get(`/interview/adoption/${id}`);
export const postInterview = async (interview) => await axios.post("/interview", interview);
export const putInterview = async (id, interview) => await axios.put(`/interview/${id}`, interview);
export const deleteInterview = async (id) => await axios.delete(`/interview/${id}`);