import axios from "./axios";

export const postPayment =(payment) => axios.post('/create_payment', {amount:payment});