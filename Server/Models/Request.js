const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    suffix: { type: String },
    typeOfCertificate: { type: String, required: true },
    contactNumber: { type: String, required: true },
    purpose: { type: String, required: true },
    quantity: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Request", requestSchema);
