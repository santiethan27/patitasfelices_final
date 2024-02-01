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
  console.log(req.files)
  try {
    let photo = {};
    let result = {};
    if (req.files?.image) {
      photo = req.files.image;
      if (photo.mimetype !== "image/png" && photo.mimetype !== "image/jpeg") {
        fs.unlink(req.files.image.tempFilePath);
        return res.status(404).send({ message: "Extension no valida" });
      }
      result = await uploadImage(req.files.image.tempFilePath);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
        photo: { public_id: result.public_id, secure_url: result.secure_url },
      },
      { new: true }
    );
    if (!updatedUser) {
      fs.unlink(req.files.image.tempFilePath);
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    fs.unlink(req.files.image.tempFilePath);
    return res.json(updatedUser);
  } catch (error) {
    if(req.files?.image){
      fs.unlink(req.files.image.tempFilePath, (unlinkError) => {
        if (unlinkError) {
          console.error('Error al eliminar el archivo temporal:', unlinkError);
        } else {
          console.log('Archivo temporal eliminado con éxito.');
        }
        });
      console.log(error)
    return res.status(500).json({
      message: error.message,
    });
  }
}
};
