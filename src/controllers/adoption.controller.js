import Adoption from "../models/adoption.model";

export const postAdoption = async (req, res) => {
  try {
    const { userId, animalId, date } = req.body;

    const newAdoption = new Adoption({
      user: userId,
      animalAdopted: animalId,
      date,
    });
    const adoptionSave = await newAdoption.save();
    res.status(200).json(adoptionSave);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const putAdoption = async (req, res) => {
  try {
    const idAdoption = req.params.id;
    const { userId, animalId, date } = req.body;

    const updateAdoption = await Adoption.findByIdAndUpdate(
      { idAdoption },
      { user: userId, animalAdopted: animalId, date },
      {new: true}
    );
    res.status(200).json(updateAdoption);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getAdoption = async (req, res) =>{
    try {
        const idAdoption = req.params.id;

        const searchAdoption = await Adoption.findById({_id: idAdoption});

        res.status(200).json(searchAdoption);
    } catch (error) {
       return res.status(404).send(error);
    }
}

export const getAdoptions = async(req, res) =>{
    try {
        
        const adoptions = await Adoption.find({});

        res.status(200).json(adoptions);

    } catch (error) {
        return res.status(400).send(error);
    }
}

export const deleteAdoption = async(req, res) => {
    try {
       const idAdoption = req.params.id;
       
       const adoptionDeleted = await Adoption.findByIdAndDelete(
        {
            _id: idAdoption,
        });

        res.status(200).send({message: "Se elimino con exito."})

    } catch (error) {
        return res.status(400).send(error);
    }
}