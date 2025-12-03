// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./route/userRoute.js";
import roleRoute from "./route/roleRoute.js";

dotenv.config();

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/users", userRoute);
app.use("/api/roles", roleRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

/* Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
