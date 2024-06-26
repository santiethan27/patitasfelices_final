import fs from "fs-extra";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import Publication from "../models/publication.model.js";

export const postPublication = async (req, res) => {
  try {
    const {
      idUser,
      name,
      age,
      history,
      raza,
      gender,
      color,
      size,
      isVaccinated,
      isCastrated,
      category,
    } = req.body;

    let infoMultimedia = [];
    if (req.files?.images) {
      console.log(req.files);
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

    const categoryConvert = category.toUpperCase();

    const newPublication = new Publication({
      user: idUser,
      name,
      age,
      history,
      raza,
      gender,
      color,
      size,
      isVaccinated,
      isCastrated,
      multimedia: infoMultimedia,
      category: categoryConvert
    });
    const publicationSaved = await newPublication.save();
    res.status(200).json(publicationSaved);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const editPublication = async (req, res) => {
  try {
    const {
      idPublication,
      name,
      age,
      history,
      raza,
      gender,
      color,
      size,
      isVaccinated,
      isCastrated,
      category
    } = req.body;

    const existingPublication = await Publication.findById(idPublication);

    if (!existingPublication) {
      await fs.unlink(photo.tempFilePath);
      return res.status(404).json({ message: "Mascota no encontrada" });
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
          await deleteImage(existingPublication.multimedia[0]?.public_id);
          await fs.unlink(image.tempFilePath);
        })
      );
    }
    const categoryConvert = category.toUpperCase();

    const updatePublication = await Publication.findOneAndUpdate(
      { _id: idPublication },
      {
        name,
        age,
        history,
        raza,
        gender,
        color,
        size,
        isVaccinated,
        isCastrated,
        ...(req.files?.images && {
          multimedia: infoMultimedia,
        }),
        category: categoryConvert,
      },
      { new: true }
    );
    res.status(200).json(updatePublication);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getPublications = async (req, res) => {
  try {
    const publications = await Publication.find({});
    res.status(200).json(publications);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const id = req.params.id;

    const publication = await Publication.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!publication)
      return res.status(404).json({ error: "No se encontro al animal" });

    res.status(200).json({ message: "Se elimino con exito." });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
export const getPublication = async (req, res) => {
  try {
    const id = req.params.id;

    const publication = await Publication.findById({
      _id: req.params.id,
    });
    if (!publication)
      return res.status(404).json({ error: "No se encontro el animal" });

    res.status(200).json(publication);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
