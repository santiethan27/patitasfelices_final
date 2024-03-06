import fs from "fs-extra";
import Product from "../models/product.model.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

export const postProduct = async (req, res) => {
  try {
    const { name, price, stock, description, category } = req.body;

    let infoMultimedia = [];
    if (req.files?.images) {
      let images = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
      await Promise.all(
        images.map(async (image) => {
          if (
            image.mimetype !== "image/png" &&
            image.mimetype !== "image/jpeg"
          ) {
            await fs.unlink(image.tempFilePath);
            throw new Error("Extensión no válida");
          }
          const media = await uploadImage(image.tempFilePath);
          let obj = {};
          obj["public_id"] = media.public_id;
          obj["secure_url"] = media.secure_url;
          infoMultimedia.push(obj);
          await fs.unlink(image.tempFilePath);
        })
      );
    }
    const newProducts = new Product({
      name,
      price,
      stock,
      description,
      category,
      multimedia: infoMultimedia,
    });
    const productsSave = await newProducts.save();
    res.status(200).json(productsSave);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { idProduct, name, price, stock, description, category } = req.body;

    const existingProduct = await Product.findById(idProduct);

    if (!existingProduct) {
      await fs.unlink(photo.tempFilePath);
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    let infoMultimedia = [];
    if (req.files?.images) {
      let images = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
      await Promise.all(
        images.map(async (image) => {
          if (
            image.mimetype !== "image/png" &&
            image.mimetype !== "image/jpeg"
          ) {
            await fs.unlink(image.tempFilePath);
            throw new Error("Extensión no válida");
          }
          const media = await uploadImage(image.tempFilePath);
          let obj = {};
          obj["public_id"] = media.public_id;
          obj["secure_url"] = media.secure_url;
          infoMultimedia.push(obj);
          await deleteImage(existingProduct.multimedia[0]?.public_id);
          await fs.unlink(image.tempFilePath);
        })
      );
    }

    const updateProduct = await Product.findOneAndUpdate(
      { _id: idProduct },
      {
        name,
        price,
        stock,
        description,
        category,
        ...(req.files?.images && {
          multimedia: infoMultimedia,
        }),
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const publication = await Product.findByIdAndDelete({
      _id: id,
    });
    if (!publication)
      return res.status(400).json({ error: "No se encontro el producto" });

    return res.status(200).json({ message: "Se elimino con exito." });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById({
      _id: id,
    });
    if (!product)
      return res.status(404).json({ error: "No se encontro el producto" });

    res.status(200).json(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
