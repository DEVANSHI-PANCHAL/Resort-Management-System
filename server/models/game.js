import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
  gameName: {type: String, required: true},
  description: {type: String,required: true},
  gamePoints: {type: Number,required: true},
  resortId:{type: String, required: true},
  resortDetails: {type: Object,required: true}, // CHANGELOG: changed type of resort from string to object
  status: {type: String,required: true},
  
 
})

var GameModel = mongoose.model('Game', gameSchema);

export default GameModel;