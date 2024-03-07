import User from "../models/user.model.js";
import fs from "fs-extra";
import bcrypt from "bcryptjs";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

export const getUser = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);

    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    return res.status(200).json(userFound);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find(req.user);

    if (!users)
      return res.status(400).json({ message: "Usuarios no encontrados" });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const deletUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser)
      return res
        .status(400)
        .json({ message: "El usuario no se puede eliminar" });

    return res.status(200).json(deleteUser);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let result = {};

    const existingUser = await User.findById(id);

    if (!existingUser) {
      await fs.unlink(photo.tempFilePath);
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (req.files?.image) {
      const photo = req.files.image;
      if (photo.mimetype !== "image/png" && photo.mimetype !== "image/jpeg") {
        await fs.unlink(photo.tempFilePath);
        return res.status(400).send({ message: "Extensión no válida" });
      }
      if (existingUser.photo?.public_id) {
        await deleteImage(existingUser.photo?.public_id);
      }
      result = await uploadImage(photo.tempFilePath);
      await fs.unlink(photo.tempFilePath); // Eliminar el archivo temporal después de usarlo
    }

    let passwordHash = false;

    if (req.body.password) {
      const password = req.body.password;
      passwordHash = await bcrypt.hash(password, 10);
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
      ...(req.body.rol && { rol: req.body.rol }),
      ...(req.body.status && { status: req.body.status }),
      ...(req.body.email && { email: req.body.email }),
      ...(req.body.password && { password: passwordHash }),
    };

    const updatedUser = await User.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });

    return res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      rol: updatedUser.rol,
      photo: updatedUser.photo.secure_url,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
