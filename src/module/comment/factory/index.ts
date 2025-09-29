
import { ICommentDto } from "../comment.dto";
import { IUser, Ipost, IComment } from "../../../utils/common/interface";
import { Comment } from "../../../db/model/comment/comment.model";

export class CommentFactory {
  createComment(
   ICommentDto : ICommentDto,
    user: IUser,
    post: Ipost,
    parentComment?: IComment | null   // 👈 ناخد الكومنت كامل لو موجود

  ) {
    const newComment = new Comment();

    newComment.content = ICommentDto.content;
    newComment.userId = user._id;
    newComment.postId = post._id;
    newComment.parentId = parentComment ? parentComment._id : null;

    newComment.childIds = []; // كل الكومنتات اللي هترد عليه
    newComment.reaction = [];

    return newComment;
  }
}
