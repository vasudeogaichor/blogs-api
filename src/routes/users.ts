import express from "express";
import { userControllers } from "../controllers";
import {validateRequest} from "../middleware/validateRequest";
const router = express.Router();

router.get("/users", validateRequest, userControllers.listUsers);
router.get("/users/:id", validateRequest, userControllers.getUsers, validateRequest);
router.put("/users/:id", validateRequest, userControllers.updateUsers);
router.delete("/users/:id", validateRequest, userControllers.deleteUsers);
router.post("/users", validateRequest, userControllers.createUsers);

const usersRouter: express.Router = router
export default usersRouter;
