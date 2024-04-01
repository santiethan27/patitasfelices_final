import { createContext, useContext, useState } from "react";
import { deleteInterview, getInterviewAdoption, getInterviewUser, postInterview, putInterview } from './../utils/services/interview';

export const InterviewContext = createContext();

export const useInterview = () => {
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error("El useAuth debe estar dentro del contexto");
    }
    return context;
}

export const InterviewProvider = ({ children }) => {

    const _getInterviewUser = async (id) => {
        try {
            const interview = await getInterviewUser(id);
            return interview.data;
        } catch (error) {
            console.log(error);
        }
    }
    const _getInterviewAdoption = async (id) => {
        try {
            const resInterviews = await getInterviewAdoption(id);
            console.log(resInterviews);
            return resInterviews.data;
        } catch (error) {
            console.log(error);
        }
    }

    const _postInterview = async (animal) => {
        try {
            await postInterview(animal);
        } catch (error) {
            console.log(error);
        }
    }
    const _putInterview = async (interview, data) => {
        try {
            const resInterview = await putInterview(interview, data);
            return resInterview.data;
        } catch (error) {
            console.log(error);
        }
    }
    const _deleteInterview = async (id) => {
        try {
            const resInterview = await deleteInterview(id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <InterviewContext.Provider value={{ _getInterviewAdoption, _getInterviewUser, _postInterview, _putInterview, _deleteInterview }}>
            {children}
        </InterviewContext.Provider>
    )
}