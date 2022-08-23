
import GameModel from "../models/game.js";


export const addGame = async (req, res) => {
  try {
    console.log(req.body)
    const {  gameName,description,gamePoints,status,resortDetails } = req.body;
    const games = await GameModel.create({gameName, description , gamePoints,status,resortDetails});
    res.status(200).json( games );
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const getGame = async (req, res) => {
  try {
   
    const { id } = req.params;
    console.log("id", id)
    const data = await GameModel.find({ resortDetails: id }); // CHANGELOG: changes resortId => resortDetails
    console.log(JSON.stringify(data))
    
    res.status(200).json( data );
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllGames = async (req, res) => {
  try {
    const data = await GameModel.find();
    res.status(200).json( data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAvailableGames = async (req, res) => {

  try {
    const data = await ResortModel.find({status: "Available"});
    res.status(200).json( data );
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editGame = async (req, res) => {
  try {
    const {  gamename,description,gamePoints,status  } = req.body;
    const { id } = req.params;
    const updateGame = {
        gamename,description,gamePoints,status
    }

    const editedGame = await GameModel.findByIdAndUpdate(id,updateGame,{ new: true });
    res.status(200).json({ editedGame });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    await GameModel.findByIdAndDelete(id)
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" });
  }
}




