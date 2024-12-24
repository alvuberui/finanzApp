import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  firsSurname: {
    type: String,
    required: true,
    trim: true,
  },
  secondSurname: {
    type: String,
    required: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  startupMoneyAmount: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export { User };
