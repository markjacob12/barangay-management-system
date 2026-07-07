const Resident = require("../Models/Resident");
const { search } = require("../Routes/authRoutes");

exports.addResident = async (req, res) => {
  try {
    const {
      lastName,
      firstName,
      middleName,
      suffix,
      gender,
      birthDate,
      birthPlace,
      age,
      civilStatus,
      nationality,
      religion,
      occupation,
      contactNumber,

      // Health & Social Status
      pwd,
      pwdIDNo,
      indigent,
      soloParent,
      soloParentNo,
      fourPs,
      registeredVoter,

      //Address
      purok,
      houseNo,
      street,

      //Image
      profile,
    } = req.body;

    const newResident = new Resident({
      lastName,
      firstName,
      middleName,
      suffix,
      gender,
      birthDate,
      birthPlace,
      age,
      civilStatus,
      nationality,
      religion,
      occupation,
      contactNumber,

      // Health & Social Status
      pwd,
      pwdIDNo,
      indigent,
      soloParent,
      soloParentNo,
      fourPs,
      registeredVoter,

      //Address
      purok,
      houseNo,
      street,

      //Image
      profile,
    });

    if (!lastName || !firstName || !middleName) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const saveResident = await newResident.save();
    res.status(201).json({
      success: true,
      message: "Successfully Added",
      data: saveResident,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Unsuccessful",
      err: err.message,
    });
  }
};

exports.getResident = async (req, res) => {
  try {
    const residents = await Resident.find();
    res.status(200).json({
      success: true,
      data: residents,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};
exports.deleteResident = async (req, res) => {
  try {
    const deleteResident = await Resident.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Delete Successfully", data: deleteResident });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Delete Unsuccessfully", error: err.message });
  }
};

exports.getResident = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { purok: { $regex: search, $options: "i" } },
        ],
      };
    }

    const residents = await Resident.find(query).sort({ lastName: 1 });
    res.status(200).json({ data: residents });
  } catch (err) {
    res.status(500).json({ message: "Error", err, success: false });
  }
};
