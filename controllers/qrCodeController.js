const { models, mongoose } = require("../models");
const { User, QRCode, ConnectedDevice } = models;
const QR = require("qrcode");

const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// QR generate
exports.generate = async (req, res) => {
  try {
    //   const { userId } = req.body;

    //   // Validate user input
    //   if (!userId) {
    //     res.status(400).send("User Id is required");
    //   }

    //   const user = await User.findById(userId);

    //   // Validate is user exist
    //   if (!user) {
    //     res.status(400).send("User not found");
    //   }

    // const qrExist = await QRCode.findOne({ userId });

    // If qr exist, update disable to true and then create a new qr record
    // if (!qrExist) {
    //   await QRCode.create({ userId });
    // } else {
    //   await QRCode.findOneAndUpdate({ userId }, { $set: { disabled: true } });
    //   await QRCode.create({ userId });
    // }

    // store QRCode
    const qrCodeId = uuidv4();
    // const generate = await QRCode.create({ qrCodeId });
    // console.log(qrCodeId);
    // Generate encrypted data
    const encryptedData = jwt.sign(
      { qrCodeId: qrCodeId },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );

    // Generate qr code
    const dataImage = await QR.toDataURL(encryptedData);

    // Return qr code
    // console.log("sent...");
    // console.log(encryptedData);
    // res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(dataImage);
    // return dataImage;
  } catch (err) {
    console.log(err);
  }
};

// QR validate
exports.validate = async (req, res) => {
  // get token from localStorage
  // const token = localStorage.getItem("token");

  try {
    const { qrCodeId, token, deviceInformation } = req.body;

    if (!token && !deviceInformation) {
      res.status(400).send("Token and deviceInformation is required");
    }

    const userDecoded = jwt.verify(token, process.env.TOKEN_KEY);
    const qrCodeIdDecoded = jwt.verify(qrCodeId, process.env.TOKEN_KEY);

    console.log(qrCodeIdDecoded.qrCodeId);
    const qrCode = await QRCode.findOne({
      qrCodeId: qrCodeIdDecoded.qrCodeId,
      disabled: false,
    });

    // let getNewQrCodeId = "";
    if (!qrCode) {
      await QRCode.create({ qrCodeId: qrCodeIdDecoded.qrCodeId });
      // res.status(400).send("QR Code not found");
    }
    let getNewQrCodeId = await QRCode.findOne({
      qrCodeId: qrCodeIdDecoded.qrCodeId,
    });

    console.log("get QRCode", getNewQrCodeId);
    const connectedDeviceData = {
      userId: userDecoded._id,
      qrCodeId: getNewQrCodeId._id,
      deviceName: deviceInformation.deviceName,
      deviceModel: deviceInformation.deviceModel,
      deviceOS: deviceInformation.deviceOS,
      deviceVersion: deviceInformation.deviceVersion,
    };

    const connectedDevice = await ConnectedDevice.create(connectedDeviceData);

    console.log("qrCodeID", getNewQrCodeId._id);
    // Update qr code
    await QRCode.findOneAndUpdate(
      { _id: getNewQrCodeId._id },
      {
        isActive: true,
        connectedDeviceId: connectedDevice._id,
        lastUsedDate: new Date(),
      }
    );

    // Find user
    // console.log(userDecoded._id);
    // console.log(mongoose.Types.ObjectId(userDecoded._id));
    const user = await User.findById({
      _id: mongoose.Types.ObjectId(userDecoded._id),
    });

    // Create token
    const authToken = jwt.sign({ ...user._doc }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    // Return token
    return res.status(200).json({ token: authToken });
  } catch (err) {
    console.log(err);
  }
};

// Get active devices
exports.activeDevice = async (req, res) => {
  const data = await ConnectedDevice.find()
    .then((data) => data)
    .catch((err) => console.log(err));

  return res.status(200).json(data);
};

// Get logged user
exports.loggedUser = async (req, res) => {
  const qrCode = await QRCode.findOne({ isActive: true })
    .then((data) => data)
    .catch((err) => console.log(err));

  // console.log("qrCode ==>> ", qrCode);

  if (!qrCode) {
    return res.status(403).json({ message: "no user logged in." });
  }

  const getConnectedDevice = await ConnectedDevice.findOne({
    _id: qrCode.connectedDeviceId,
  })
    .then((data) => data)
    .catch((err) => console.log(err));

  console.log("connected ==>> ", getConnectedDevice);
  const getUser = await User.findOne({ _id: getConnectedDevice.userId })
    .then((data) => data)
    .catch((err) => console.log(err));

  return res.status(200).json(getUser);
};

// Logout user
exports.loggoutUser = async (req, res) => {
  const id = req.params.id;
  await QRCode.findOneAndUpdate({ connectedDeviceId: id }, { isActive: false });

  res.status(200).json({ meesage: "user successfuly logged out." });
};
