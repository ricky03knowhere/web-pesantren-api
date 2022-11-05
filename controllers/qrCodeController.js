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
    console.log(qrCodeId);
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
    console.log("sent...");
    console.log(encryptedData);
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

    console.log('get QRCode', getNewQrCodeId);
    const connectedDeviceData = {
      userId: userDecoded.userId,
      qrCodeId: getNewQrCodeId._id,
      deviceName: deviceInformation.deviceName,
      deviceModel: deviceInformation.deviceModel,
      deviceOS: deviceInformation.deviceOS,
      deviceVersion: deviceInformation.deviceVersion,
    };

    const connectedDevice = await ConnectedDevice.create(connectedDeviceData);

    console.log('qrCodeID',  getNewQrCodeId._id);
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
    console.log(userDecoded.userId);
    console.log(mongoose.Types.ObjectId(userDecoded.userId));
    const user = await User.findById({
      _id: mongoose.Types.ObjectId(userDecoded.userId),
    });

    // Create token
    const authToken = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    // Return token
    return res.status(200).json({ token: authToken });
  } catch (err) {
    console.log(err);
  }
};
