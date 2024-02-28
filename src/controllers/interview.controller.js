import Interview from "../models/interview.model";

export const postInterview = async (req, res) =>{
    try {
        const {userAdopter, userAdmin, animalAdopted, date} = req.body;

        const newInterview = new Interview({
            userAdopter,
            userAdmin,
            animalAdopted,
            date,
        })

        const interview = await newInterview.save();
        res.status(200).json(interview);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const putInterview = async (req, res) =>{
    try {
        const idInterview = req.params.id;
        const {userAdopter, animalAdopted, date} = req.body;

        const updateInterview = await Interview.findByIdAndUpdate({
            idInterview
        }, {
            userAdopter,
            animalAdopted,
            date
        }, {new: true});
        res.status(200).json(updateInterview);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const deleteInterview = async(req, res) =>{
    try {
        const idInterview = req.params.id;
        
        await Interview.findByIdAndDelete({
            _id: idInterview,
        });

        res.status(200).send({message: "Se elimino con exito."});

    } catch (error) {
        res.status(400).send(error);
    }
}

export const getInterview = async(req, res) =>{
    try {
      const idInterview = req.params.id;
      
      const interview = Interview.findById({_id: idInterview});

      res.status(200).json(interview);
    } catch (error) {
        res.status(400).send(error);        
    }
}

export const getInterviews = async(req, res) =>{
    try {
        const interviews = await Interview.find({});
        res.status(200).json(interviews);
    } catch (error) {
        res.status(400).send(error);        
    }
}
