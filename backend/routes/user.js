import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    return res.json({ message: "User already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    return res.json({ message: "Registration Successfull" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.json({ message: "User does not exist" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or Password Is Incorrect!" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, user });
});

router.post("/update", async (req, res) => {
  const { userId, name, email, password, age, gender, dob, mobile } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (age) user.age = age;
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;
    if (mobile) user.mobile = mobile;

    await user.save();

    return res.json({
      message: "Data updated successfully",
      updatedUser: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
export { router as userRouter };

// export const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token) {
//     jwt.verify(token, "secret", (err) => {
//       if (err) {
//         return res.sendStatus(403);
//         next();
//       }
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };
