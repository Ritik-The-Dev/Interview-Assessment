import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: { type: Number, required: true, unique: true, trim: true },
  message: { type: String, trim: true },
},{
    timestamps : true
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;
