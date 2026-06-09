const { required } = require("joi");
const mongoose = require("mongoose");

const residentSchema = mongoose.Schema(
  {
    lastName: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, required: true, trim: true },
    suffix: { type: String, required: false, default: "", trim: true },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    birthDate: { type: String, required: true },
    birthPlace: { type: String, required: true },
    age: { type: Number, required: true },
    civilStatus: { type: String, required: true },
    nationality: { type: String, required: true },
    religion: { type: String, required: true },
    occupation: { type: String, required: false, default: "" },
    contactNumber: { type: String, required: false, default: "" },

    // Health & Social Status
    pwd: { type: String, required: false },
    pwdIDNo: { type: String, default: "" },
    indigent: { type: String, default: false },
    soloParent: { type: String, default: false },
    soloParentNo: { type: String, default: "" },
    fourPs: { type: String, default: false },
    registeredVoter: { type: String, default: false },

    //Address
    purok: { type: String, required: true },
    houseNo: { type: String, default: "" },
    street: { type: String, required: true },

    //Image
    profile: { type: String, default: "default-profile.png" },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Resident", residentSchema);
