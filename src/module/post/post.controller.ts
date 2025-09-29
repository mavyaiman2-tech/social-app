import{Router} from "express";
import{authMiddleware} from "../../middleware/auth.middleware";
import{isValid} from "../../middleware/validation.middleware";
import commentRouter from "../comment/comment.controller";
import PostService from "./post.service";
const router = Router();
router.use("/:postId/comment",commentRouter)
router.post("/",authMiddleware,PostService.createPost )
router.patch("/:id",authMiddleware,PostService.reaction )
router.get("/:id",PostService.getPost )
export default router;

