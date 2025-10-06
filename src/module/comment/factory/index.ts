
import { ICommentDto } from "../comment.dto";
import { IUser, Ipost, IComment } from "../../../utils/common/interface";
import {Comment} from "../entity/index"
export class CommentFactory {
  createComment(
   ICommentDto : ICommentDto,
    user: IUser,
    post: Ipost,
comment?:IComment
  ) {
    const newComment = new Comment();

    newComment.content = ICommentDto.content;
    newComment.userId = user._id;
    newComment.postId = post._id||comment?.postId;
newComment.parentId =   comment?._id
    newComment.reaction = [];

    return newComment;
  }
}
