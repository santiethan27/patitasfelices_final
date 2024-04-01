import Interview from "../models/interview.model.js";

export const postInterview = async (req, res) => {
  try {
    const { userAdmin, idAdoption, date, idUser, idPet } = req.body;
    console.log(date);
    const newInterview = new Interview({
      idAdoption,
      userAdmin,
      date: date.date,
      idUser,
      idPet,
    });

    const interview = await newInterview.save();
    res.status(200).json(interview);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const putInterview = async (req, res) => {
  try {
    const idInterview = req.params.id;
    const { date } = req.body;
    const updateInterview = await Interview.findByIdAndUpdate(
      idInterview,
      {
        date,
      },
      { new: true }
    );
    console.log(updateInterview);
    res.status(200).json(updateInterview);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const deleteInterview = async (req, res) => {
  try {
    const idInterview = req.params.id;

    await Interview.findByIdAndDelete({
      _id: idInterview,
    });

    res.status(200).send({ message: "Se elimino con exito." });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getInterviewAdoption = async (req, res) => {
  try {
    const idInterview = req.params.id;

    const interview = await Interview.findOne({ idAdoption: idInterview });
    res.status(200).json(interview);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const getInterviewUser = async (req, res) => {
  try {
    const idInterview = req.params.id;
    const interviews = await Interview.find({ idUser: idInterview })
      .populate({ path: "userAdmin", select: "name" })
      .populate({ path: "idPet", select: "name" })
      .exec();
    console.log(interviews);
    const mappedInterviews = interviews.map((interview) => ({
      _id: interview._id,
      date: interview.date,
      user: interview.userAdmin.name,
      animal: interview.idPet.name,
      status: interview.status,
    }));
    res.status(200).json(mappedInterviews);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
