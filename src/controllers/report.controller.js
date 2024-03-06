import Report from "../models/report.model.js";
import fs from "fs-extra";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({});
    res.status(200).json(reports);
  } catch (error) {
    res.status(400).send(error);
  }
};
export const postReport = async (req, res) => {
  try {
    const { userId, description, siteDescription } = req.body;

    let result = {};
    if(req.files?.image){
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
