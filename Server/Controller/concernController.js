const Concern = require("../Models/Concern");
// IMPORTANTO: I-import ang utility function na ginawa natin
const { uploadToCloudinary } = require("../utils/cloudinary");

exports.addConcern = async (req, res) => {
  try {
    // 1. BAGUHIN: Gamitin ang 'let' para pwedeng ma-update ang variable
    let imageUrl = "";

    // 2. CHECK: Kung may file na inupload, i-upload sa Cloudinary
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    // ... rest of your code ...
    const {
      typeOfConcern,
      specificConcern,
      location,
      description,
      date,
      time,
      priorityLevel,
      status, // tinanggal ko ang 'image' dito kasi imageUrl na ang gagamitin natin
    } = req.body;

    const newConcern = new Concern({
      userId: req.user._id,
      typeOfConcern,
      specificConcern,
      location,
      description,
      date,
      time,
      priorityLevel,
      image: imageUrl, // Dito natin ilalagay yung nakuha nating URL
      status,
    });

    const savedConcern = await newConcern.save();
    res
      .status(200)
      .json({ message: "Concern submitted successfully", data: savedConcern });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to submit concern", error: err.message });
  }
};

exports.getConcern = async (req, res) => {
  try {
    const query = req.user.role === "admin" ? {} : { userId: req.user._id };
    const concern = await Concern.find(query).sort({ createdAt: -1 });
    res.status(200).json({ message: "Successfully Get", data: concern });
  } catch (err) {
    res.status(500).json({ message: "Unsuccessful Get", err: err.message });
  }
};

exports.updateConcernStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const upadteConcern = await Concern.findByIdAndUpdate(
      id,
      { status: status },
      { new: true },
    );

    if (!upadteConcern) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Successfully Update", data: upadteConcern });
  } catch (err) {
    res.status(500).json({ message: "Unsuccessful Update", err });
  }
};

exports.resolveConern = async (req, res) => {
  try {
    const { id } = req.params;
    const { resolutionRemarks, resolutionDate } = req.body;

    let reslutionImageUrl = ""; // Rename for clarity

    if (req.file) {
      reslutionImageUrl = await uploadToCloudinary(req.file.buffer);
    }

    const updateConcern = await Concern.findByIdAndUpdate(
      id,
      {
        status: "Resolved",
        resolutionRemarks: resolutionRemarks,
        resolutionDate: resolutionDate,
        reslutionImage: reslutionImageUrl, // Ensure this matches your schema exactly
      },
      { new: true },
    );

    if (!updateConcern) {
      return res.status(404).json({ message: "Concern Not Found" });
    }

    res
      .status(200)
      .json({ message: "Successfully Resolved", data: updateConcern });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unsuccessful Update", error: err.message });
  }
};
