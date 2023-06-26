const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "assets/img/pembayaran"),
  filename: (req, file, cb) =>
    cb(
      null,
      `${file.fieldname}_${Date.now()}.${file.originalname.split(".")[1]}`
    ),
});

exports.uploadImage = multer({ storage: storage });
