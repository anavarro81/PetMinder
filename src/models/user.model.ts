import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },   
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("Users", userSchema);

module.exports = user;