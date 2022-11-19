const express = require("express");
const cors = require("cors");
const { authRoutes } = require("./routes/authRoutes");
const { QRCodeRoutes } = require("./routes/qrCodeRoutes");
const { UserRoutes } = require("./routes/userRoute");
const app = express();
const dotenv = require("dotenv");

// Env
dotenv.config();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Routes
app.get("/", (req, res) => res.send("testing"));
app.use("/auth", authRoutes);
app.use("/qr", QRCodeRoutes);
app.use("/user", UserRoutes);

// server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
