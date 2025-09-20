import{Router} from "express";
import AuthService from "./auth.servies";
import { isValid } from "../../middleware/validation.middleware";
import*as authValidation from "./auth.validation";
const router = Router();
router.post("/register",isValid(authValidation.registerSchema),AuthService.register)
router.post("/verify",AuthService.verifyAccount)
export default router;