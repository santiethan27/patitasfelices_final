import React, { createContext, useContext, useState } from 'react'
import { getReports, postReport } from '../utils/services/reports';

export const ReportContext = createContext();

export const useReport = () => {
    const context = useContext(ReportContext);
    if (!context) {
        throw new Error("El useAuth debe estar dentro del contexto");
    }
    return context;
}
export const ReportProvider = ({ children }) => {
    const [reports, setReports] = useState([]);

    const _getReports = async () => {
        try {
            const res = await getReports();
            setReports(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const _postReport = async (report) => {
        try {
            await postReport(report);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <ReportContext.Provider value={{ _getReports, _postReport, reports }}>
            {children}
        </ReportContext.Provider>
    )
}