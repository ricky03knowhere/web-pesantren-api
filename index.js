const express = require("express");
const cors = require("cors");
const { authRoutes } = require("./routes/authRoutes");
const { qrCodeRoutes } = require("./routes/qrCodeRoutes");
const { userRoutes } = require("./routes/userRoute");
const { infoRoutes } = require("./routes/infoRoutes");
const { transactionRoutes } = require("./routes/transactionRoutes");
const app = express();
const dotenv = require("dotenv");

// Env
dotenv.config();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// Middleware
app.use(express.json());
app.use(cors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true }));

// Serve Static files
app.use("/images", express.static("assets/img"));
app.use("/images", express.static("tmp"));

// Routes
app.get("/", (req, res) => res.send("testing"));
app.use("/auth", authRoutes);
app.use("/qr", qrCodeRoutes);
app.use("/user", userRoutes);
app.use("/info", infoRoutes);
app.use("/transaction", transactionRoutes);

// server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
