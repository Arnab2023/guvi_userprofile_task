import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import { userRouter } from "./routes/user.js";
import { postRouter } from "./routes/post.js";
import { config } from "dotenv";
const app = express();

config();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
};
const PORT = 8001;
app.use(cors(corsOptions));

app.use("/auth", userRouter);
app.use("/auth", postRouter);

mongoose.connect(
  "mongodb+srv://arnab192023:12345@loginproject.vzgxspi.mongodb.net/"
);

app.listen(PORT || process.env.PORT, () => {
  console.log(`listening to port ${PORT}`);
});
