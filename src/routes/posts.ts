import express from "express";
import { postControllers } from "../controllers";
import {validateRequest} from "../middleware/validateRequest";
const router = express.Router();

router.get("/posts", validateRequest, postControllers.listPosts);
router.get("/posts/:id", validateRequest, postControllers.getPosts);
router.put("/posts/:id", validateRequest, postControllers.updatePosts);
router.delete("/posts/:id", validateRequest, postControllers.deletePosts);
router.post("/posts", validateRequest, postControllers.createPosts);

export = router;
