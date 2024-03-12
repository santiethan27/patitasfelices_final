import fs from "fs-extra";
import Product from "../models/product.model.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

export const postProduct = async (req, res) => {
  try {
    const { name, price, stock, description, category } = req.body;

    let infOptions = [];
    if (req.files?.options) {
      console.log(req.files.options);
      let images = Array.isArray(req.files.options)
        ? req.files.options
        : [req.files.options];
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
          infOptions.push(obj);
          await fs.unlink(image.tempFilePath);
        })
      );
    }

    const image = req.files.primary;

    if (image.mimetype !== "image/png" && image.mimetype !== "image/jpeg") {
      await fs.unlink(image.tempFilePath);
      throw new Error("Extensión no válida");
    }
    const media = await uploadImage(image.tempFilePath);
    let obj = {};
    obj["public_id"] = media.public_id;
    obj["secure_url"] = media.secure_url;
    await fs.unlink(image.tempFilePath);

    const categoryUp = category.toUpperCase();

    const newProducts = new Product({
      name,
      price,
      stock,
      description,
      category: categoryUp,
      options: infOptions,
      primary: obj,
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

    let obj = {};
    if (req.files?.images) {
      const image = req.files.images;

      if (image.mimetype !== "image/png" && image.mimetype !== "image/jpeg") {
        await fs.unlink(image.tempFilePath);
        throw new Error("Extensión no válida");
      }
      const media = await uploadImage(image.tempFilePath);

      obj["public_id"] = media.public_id;
      obj["secure_url"] = media.secure_url;
      await fs.unlink(image.tempFilePath);
    }

    const categoryUp = category.toUpperCase();
    const updateProduct = await Product.findOneAndUpdate(
      { _id: idProduct },
      {
        name,
        price,
        stock,
        description,
        category: categoryUp,
        ...(req.files?.images && {
          primary: obj,
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
