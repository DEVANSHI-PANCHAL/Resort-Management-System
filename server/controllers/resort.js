
import ResortModel from "../models/resort.js";


export const addResort = async (req, res) => {
  try {
    console.log(req.body)
    const {  resortname,description,image,status } = req.body;
    const resorts = await ResortModel.create({resortname, description , image,status})
    res.status(200).json( resorts );
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const getResort = async (req, res) => {

  try {
    const data = await ResortModel.find();
    res.status(200).json( data );
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAvailableResort = async (req, res) => {

  try {
    const data = await ResortModel.find({status: "Available"});
    res.status(200).json( data );
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editResort = async (req, res) => {
  try {
    const {  resortname, description , image  } = req.body;
    const { id } = req.params;
    const updateResort = {
      resortname, description, image
    }

    const editedResort = await ResortModel.findByIdAndUpdate(id,updateResort,{ new: true });
    res.status(200).json({ editedResort });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const deleteResort = async (req, res) => {
  try {
    const { id } = req.params;
    await ResortModel.findByIdAndDelete(id)
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" });
  }
}




