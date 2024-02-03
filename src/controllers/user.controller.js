import User from "../models/user.model.js";
import fs from "fs-extra";
import { uploadImage } from "../utils/cloudinary.js";

export const getUser = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.status(200).json(userFound);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    let result = {};

    if (req.files?.image) {
      const photo = req.files.image;
      console.log(photo);
      if (photo.mimetype !== "image/png" && photo.mimetype !== "image/jpeg") {
        await fs.unlink(photo.tempFilePath);
        return res.status(400).send({ message: "Extensión no válida" });
      }

      result = await uploadImage(photo.tempFilePath);
      await fs.unlink(photo.tempFilePath); // Eliminar el archivo temporal después de usarlo
    }
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const updateData = {
      ...(req.files?.image && {
        photo: { public_id: result.public_id, secure_url: result.secure_url },
      }),
      ...(req.body.phone && { phone: req.body.phone }),
      ...(req.body.street && { "address.street": req.body.street }),
      ...(req.body.postal_code && {
        "address.postal_code": req.body.postal_code,
      }),
      ...(req.body.state && { "address.state": req.body.state }),
      ...(req.body.city && { "address.city": req.body.city }),
    };

    const updatedUser = await User.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
