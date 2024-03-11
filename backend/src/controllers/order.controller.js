import Order from "../models/orders.model.js";
import { uploadImage } from "../utils/cloudinary.js";
import fs from "fs-extra";
// Controlador para crear un nuevo pedido
export const postOrder = async (req, res) => {
  const { user, product } = req.body;
  try {
    let obj = {};
    if (req.files.image) {
      const image = req.files.image;
      if (image.mimetype !== "image/png" && image.mimetype !== "image/jpeg") {
        await fs.unlink(image.tempFilePath);
        throw new Error("Extensión no válida");
      }
      const media = await uploadImage(image.tempFilePath);
      obj["public_id"] = media.public_id;
      obj["secure_url"] = media.secure_url;
      await fs.unlink(image.tempFilePath);
    }

    const order = new Order({
      user,
      product,
      date: new Date(),
        image: obj,
    });

    const newOrder = await order.save();
    res.status(200).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Controlador para obtener todos los pedidos
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener un pedido por su ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar un pedido por su ID
export const updateOrderById = async (req, res) => {
  try {
    const { user, product, date, image, status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (user) {
      order.user = user;
    }

    if (product) {
      order.product = product;
    }

    if (date) {
      order.date = date;
    }

    if (image) {
      order.image = image;
    }

    if (status) {
      order.status = status;
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar un pedido por su ID
export const deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.remove();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
