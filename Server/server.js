require("dotenv").config();
const express = require("express");
const connectDB = require("./Config/db");
const { globalLimiter, authLimiter } = require("./middleware/rateLimiter");
const authRoutes = require("./Routes/authRoutes");
const residentRoutes = require("./Routes/residentRoutes");
const requestRoutes = require("./Routes/requestRoutes");
const concernRoutes = require("./Routes/concernRoutes");
const { connect } = require("mongoose");

connectDB();
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resident", residentRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/concern", concernRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
