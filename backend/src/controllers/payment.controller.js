import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import Order from "../models/orders.model.js";

// Configurar la instancia de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken:
    "TEST-61481170025164-031013-41e4861cd33003ad032eb403298f8efa-1713596432",
});

export const postPayment = async (req, res) => {
  try {
    const { amount, description, id } = req.body;
    if (!amount || !description) {
      return res
        .status(400)
        .send({ error: "Faltan campos obligatorios: monto o descripcion" });
    }
    const body = {
      items: [
        {
          title: description,
          unit_price: Number(amount),
          quantity: 1,
          currency_id: "COP",
        },
      ],
      external_reference: id,
      notification_url:
        "https://c3ab-170-245-158-66.ngrok-free.app/api/webhook",
      back_urls: {
        success: "http://localhost:5173/donations",
        // failure: "http://localhost:5173/donations",
        // pending: "https://mail.google.com",
      },
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.status(200).json({ id: result.id, init_point: result.init_point });
  } catch (error) {
    console.error("Error al crear el pago:", error);
    return res.status(500).send({ error: "Ocurrió un error inesperado" });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const paymentRest = req.query;
    const payment = new Payment(client);
    if (paymentRest.type === "payment") {
      const id = paymentRest["data.id"];
      const data = await payment.get({ id: id });
      if (data.status === "approved") {
        const externalReference = data.external_reference;
        console.log(externalReference);
        const order = await Order.findOneAndUpdate(
          { _id: externalReference },
          { status: "APPROVED" },
          { new: true }
        );
        if (!order) {
          console.log("aprovado")
          return res.status(404).json({ message: "Order not found" });
        }
        console.log("Order approved:", order);
      } else if (data.status === "rejected" || data.status === "cancelled") {
        const externalReference = data.external_reference;
        const deletedOrder = await Order.findOneAndDelete({
          _id: externalReference,
        });

        if (!deletedOrder) {
          console.log("elimando")
          return res.status(404).json({ message: "Order not found" });
        }
        console.log("Order deleted:", deletedOrder);
      }
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
