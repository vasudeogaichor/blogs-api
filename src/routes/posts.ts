import express from "express";
import { postControllers } from "../controllers";
const router = express.Router();

// router.get("/posts", postControllers.getPosts);
router.get("/posts/:id", postControllers.getPosts);
// router.put("/posts/:id", postControllers.updatePost);
// router.delete("/posts/:id", postControllers.deletePost);
router.post("/posts", postControllers.createPosts);

export = router;
