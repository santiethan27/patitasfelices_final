import { createContext, useContext, useState } from "react";
import { postPayment } from './../utils/services/payment';

export const PaymentContext = createContext();

export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error("El usePayment debe estar dentro del contexto");
    }
    return context;
}

export const PaymentProvider = ({ children }) => {
    
    
    const _postPayment = async (payment) => {
        try {
            const res = await postPayment(payment);
            return res.data.id;
        } catch (error) {
            console.log(error);
        }
    }

    return (<PaymentContext.Provider value={{ _postPayment }}>
        {children}
    </PaymentContext.Provider>
    )
}

