import Adoption from '../models/adoption.model'

export const postAdoption = async () => {
    try {
        const {userId, animalId, date} = req.body;

        const newAdoption = new Adoption({
            user: userId,
            animalAdopted: animalId,
            date
        });
        const adoptionSave = await newAdoption.save();
        res.status(200).json(adoptionSave);
    } catch (error) {
        res.status(400).send(error);
    }
} 