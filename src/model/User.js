import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please use a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  watchList: {
    type: [String],
  },
  planPurchase: {
    type: String,
    enum: ["None", "Super", "Premium"],
    default: "None",
  },
  timePeriod: {
    type: String,
    enum: ["None", "Quarterly", "Yearly", "Monthly"],
    default: "None",
  },
  orderId: {
    type: String,
    default: "None",
  },
  orderExpiry: {
    type: Date,
    default: new Date("2025-02-23T00:00:00Z"), 
  },
  verifyCode: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCodeExpiry: {
    type: Date,
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
