import { Router } from "express";
import {  authMiddleware } from "../../middleware/auth.middleware";
import  CommentService from "./comment.service";

const router = Router({mergeParams:true});
router.post("{/:id}",authMiddleware,CommentService.createComment)
export default router;