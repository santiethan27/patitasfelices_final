import Report from "../models/report.model.js";
import fs from "fs-extra";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({})
      .populate({ path: "userId", select: "name last_name email phone" })
      .exec();
    const mappedReports = reports.map((report) => ({
      _id: report._id,
      description: report.description,
      siteDescription: report.siteDescription,
      image: report.image,
      user: report.userId._id,
      user_name: report.userId.name + " " + report.userId.last_name,
      user_email: report.userId.email,
      user_phone: report.userId.phone,
    }));
    res.status(200).json(mappedReports);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    await Report.findByIdAndDelete(id);
    res.status(200).json({ "Message:": "Se borro con exito" });
  } catch (error) {
    res.status(400).json({ "Ocurrio un error": error });
  }
};

export const postReport = async (req, res) => {
  try {
    const { userId, description, siteDescription } = req.body;

    let result = {};
    if (req.files?.image) {
      const image = req.files?.image;
      if (image.mimetype !== "image/png" && image.mimetype !== "image/jpeg") {
        await fs.unlink(image.tempFilePath);
        return res.status(400).send({ message: "Extensión no válida" });
      }
      result = await uploadImage(image.tempFilePath);
      await fs.unlink(image.tempFilePath);
    }

    const data = new Report({
      userId,
      description,
      siteDescription,
      image: { public_id: result.public_id, secure_url: result.secure_url },
    });
    const reportNew = data.save();
    res.status(200).json(reportNew);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
