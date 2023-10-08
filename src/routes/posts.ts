import express from "express";
import { postControllers } from "../controllers";
const router = express.Router();

router.get("/posts", postControllers.listPosts);
router.get("/posts/:id", postControllers.getPosts);
// router.put("/posts/:id", postControllers.updatePost);
router.delete("/posts/:id", postControllers.deletePosts);
router.post("/posts", postControllers.createPosts);

export = router;
