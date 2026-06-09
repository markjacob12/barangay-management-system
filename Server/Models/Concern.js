const mongoose = require("mongoose");

const concernSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String },
    typeOfConcern: { type: String, required: true },
    specificConcern: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    priorityLevel: { type: String, required: true },
    status: { type: String, default: "Pending" },

    // Resolution Evidence
    reslutionImage: { type: String },
    resolutionRemarks: { type: String },
    resolutionDate: { type: Date },
    resolveBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

// DITO ANG PAGBABAGO:
// Imbes na direktang mongoose.model, gagamit tayo ng conditional check
module.exports =
  mongoose.models.Concern || mongoose.model("Concern", concernSchema);
