import { Request, Response } from "express";
import { PostRepository } from "../../db/model/post/post.reposcitory";
import { NotFoundException } from "../../utils/erorr";
import { IComment } from "../../utils/common/interface";
import { CommentFactory } from "./factory/index";
import { ICommentDto } from "./comment.dto";
import { CommentRepository } from "../../db/model/comment/comment.repositoryl";

class CommentService {
  private readonly postRepository = new PostRepository();
  private readonly commentRepository = new CommentRepository();
  private readonly commentFactory = new CommentFactory();

  createComment = async (req: Request, res: Response) => {
    const { postId, id } = req.params;
    const commentDto: ICommentDto = req.body;
    const postExist = await this.postRepository.exist({ _id: postId });
    if (!postExist) throw new NotFoundException("Post not found");

    let parentComment: IComment | null = null;
    if (id) {
      parentComment = await this.commentRepository.exist({ _id: id });
      if (!parentComment) throw new NotFoundException("Parent comment not found");
    }

    const newComment = this.commentFactory.createComment(
      commentDto,
      req.user,
      postExist,
      parentComment
    );

    const createdComment = await this.commentRepository.create(newComment);

    if (parentComment) {
      await this.commentRepository.update(parentComment._id, {
        $push: { childIds: createdComment._id },
      });
    }

    return res
      .status(201)
      .json({ message: "Comment created", data: createdComment });
  };
}

export default new CommentService();
