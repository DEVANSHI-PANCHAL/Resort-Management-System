import mongoose from 'mongoose';

const resortSchema = mongoose.Schema({
  resortname: {type: String, required: true},
  description: {type: String,required: true},
  image: {type: String,required: true},
  status: {type: String,required: true}
 
})

var ResortModel = mongoose.model('Resort', resortSchema);

export default ResortModel;