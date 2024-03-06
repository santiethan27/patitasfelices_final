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
    const _postPayment = async (payment,description) => {
        try {
            const response = await postPayment(payment,description);
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('Error al realizar el pago');
        }
    }

    return (<PaymentContext.Provider value={{ _postPayment }}>
        {children}
    </PaymentContext.Provider>
    )
}

