import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userType: {type: String, required: true},
  password: {type: String, required: true},
  username:{type: String, required: true},
  fullName: {type: String},
  gamePoints: {type: Number,default: 0}
});

export default mongoose.model("User", userSchema);