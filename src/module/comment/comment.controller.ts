import { Router } from "express";
import {  authMiddleware } from "../../middleware/auth.middleware";
import  CommentService from "./comment.service";

const router = Router({mergeParams:true});

router.post("{/:id}",authMiddleware,CommentService.createComment)
router.get("{/:id}",authMiddleware,CommentService.getspecificComment)
router.delete("/:id",authMiddleware,CommentService.deleteComment)
export default router;