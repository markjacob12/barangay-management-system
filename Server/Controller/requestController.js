const Request = require("../Models/Request");

exports.createRequest = async (req, res) => {
  try {
    const {
      lastName,
      firstName,
      middleName,
      suffix,
      typeOfCertificate,
      contactNumber,
      purpose,
      quantity,
      status,
    } = req.body;

    const newRequest = new Request({
      userId: req.user._id,
      lastName,
      firstName,
      middleName,
      suffix,
      typeOfCertificate,
      contactNumber,
      purpose,
      quantity,
      status,
    });

    const savedRequest = await newRequest.save();
    res
      .status(201)
      .json({ message: "Request sent successfully!", data: savedRequest });
  } catch (err) {
    res.status(500).json({ message: "Error saving request", err: err.message });
  }
};

exports.getRequest = async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";

    const query = isAdmin ? {} : { userId: req.user.id };

    const requests = await Request.find(query)
      .populate("userId", "firstName middleName lastName suffix")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Successfully Get", data: requests });
  } catch (err) {
    res.status(500).json({ message: "Unsuccessfully Get", error: err.message });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const requestDelete = await Request.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Delete Successfully", data: requestDelete });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Delete Unsuccessfully", error: err.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updateRequest = await Request.findByIdAndUpdate(
      id,
      { status: status },
      { new: true },
    );

    if (!updateRequest) {
      res.status(404).json({ message: "Request record not found" });
    }
    return res
      .status(200)
      .json({ message: "Successfully Update", data: updateRequest });
  } catch (err) {
    res.status(500).json({ message: "Error Sever", err });
  }
};

exports.searchRequest = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};
    if (search) {
      query = {
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
        ],
      };
    }

    const request = await Request.find(query).sort({ lastName: 1 });
    res.status(200).json({ message: "Successfully Search", data: request });
  } catch (err) {
    res.status(500).json({ message: "Unsuccessfully Search", err });
  }
};
