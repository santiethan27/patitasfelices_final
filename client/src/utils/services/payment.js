import axios from "./axios";

export const postPayment =(payment,description) => axios.post('/create_payment', {amount:payment, description});