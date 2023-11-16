import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, default: null },
  gender: { type: String, default: "" },
  dob: { type: String, default: "" },
  mobile: { type: String, default: "" },
});

export const UserModel = mongoose.model("user", UserSchema);
