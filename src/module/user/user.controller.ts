import {Router} from "express";
import UserService  from "./user.service";
const router = Router();
router.get("/:id",UserService.getprofile)

export default router;