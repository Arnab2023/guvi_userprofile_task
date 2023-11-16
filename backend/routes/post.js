import express from "express";
import { PostModel } from "../models/Posts.js";

const router = express.Router();
router.get("/post", async (req, res) => {
  try {
    const response = await PostModel.find({}).populate("author").exec();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
router.post("/post", async (req, res) => {
  const post = new PostModel(req.body);
  try {
    const response = await post.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const response = await PostModel.findById(req.params.id)
      .populate("author")
      .exec();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

export { router as postRouter };
