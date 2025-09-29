import {Router} from "express";
import UserService  from "./user.service";
import { authMiddleware } from "../../middleware/auth.middleware";
const router = Router();
router.get("/:id",authMiddleware,UserService.getprofile)
export default router;