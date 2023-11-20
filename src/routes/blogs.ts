import express from "express";
import { blogControllers } from "../controllers";
import {validateRequest} from "../middleware/validateRequest";
const router = express.Router();

router.get("/blogs", validateRequest, blogControllers.listBlogs);
router.get("/blogs/:id", validateRequest, blogControllers.getBlogs, validateRequest);
router.put("/blogs/:id", validateRequest, blogControllers.updateBlogs);
router.delete("/blogs/:id", validateRequest, blogControllers.deleteBlogs);
router.post("/blogs", validateRequest, blogControllers.createBlogs);

export = router;
