import mongoose from "mongoose";
import Adoption from "../models/adoption.model.js";

export const postAdoption = async (req, res) => {
  try {
    const { userId, animalId } = req.body;

    const newAdoption = new Adoption({
      user: userId,
      animalAdopted: animalId,
      date: new Date(),
    });
    const adoptionSave = await newAdoption.save();
    res.status(200).json(adoptionSave);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const isAdopting = async (req, res) => {
  try {
    const idUser = req.params.id;
    const isAdoption = await Adoption.findOne({ user: idUser }, "status");
    if (isAdoption !== null) {
      return res.status(200).send(isAdoption);
    } else {
      return res.status(200).json({ status: "OK" });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const putAdoption = async (req, res) => {
  try {
    const idAdoption = req.params.id;
    const { userId, animalId, date, status } = req.body;
    const updateAdoption = await Adoption.findByIdAndUpdate(
      idAdoption,
      { user: userId, animalAdopted: animalId, date, status: status },
      { new: true, runValidators: true }
    );
    res.status(200).json(updateAdoption);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

export const getAdoption = async (req, res) => {
  try {
    const idAdoption = req.params.id;

    const searchAdoption = await Adoption.findById({ _id: idAdoption });

    res.status(200).json(searchAdoption);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export const getAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find({})
      .populate({ path: "user", select: "name last_name email phone" })
      .populate({
        path: "animalAdopted",
        select: "name multimedia",
        options: { lean: true },
      })
      .exec();

    const mappedAdoptions = adoptions.map((adoption) => ({
      _id: adoption._id,
      date: `${adoption.date.getDate()}/${
        adoption.date.getMonth() + 1
      }/${adoption.date.getFullYear()}`,
      user: adoption.user._id,
      animalId: adoption.animalAdopted._id,
      user_name: adoption.user.name + " " + adoption.user.last_name,
      user_email: adoption.user.email,
      user_phone: adoption.user.phone,
      animal_name: adoption.animalAdopted.name,
      animal_multimedia: adoption.animalAdopted.multimedia,
      status: adoption.status,
    }));

    res.status(200).json(mappedAdoptions);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const deleteAdoption = async (req, res) => {
  try {
    const idAdoption = req.params.id;

    const adoptionDeleted = await Adoption.findByIdAndDelete({
      _id: idAdoption,
    });

    res.status(200).send({ message: "Se elimino con exito." });
  } catch (error) {
    return res.status(400).send(error);
  }
};
