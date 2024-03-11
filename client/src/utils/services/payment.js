import axios from "./axios";

export const postPayment = (payment, description, id) =>
  axios.post("/create_payment", { amount: payment, description, id: id });
