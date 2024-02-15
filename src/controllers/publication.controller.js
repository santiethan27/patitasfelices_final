import fs from "fs-extra";
import { uploadImage } from "../utils/cloudinary.js";
import Publication from "../models/publication.model.js";

export const postPublication = async (req, res) => {
  try {
    const { idUser, name, age, description, raza } = req.body;

    let infoMultimedia = [];
    if (req.files?.images) {
      const images = req.files.images;
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

    const newPublication = new Publication({
      user: idUser,
      name,
      age,
      description,
      raza,
      multimedia: infoMultimedia,
    });
    const publicationSaved = await newPublication.save();
    res.status(200).json(publicationSaved);
  } catch (error) {
    return res.status(400).send({ error: error });
  }
};
