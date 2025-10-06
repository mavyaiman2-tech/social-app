import { Request, Response } from "express";
import { PostRepository } from "../../db/model/post/post.reposcitory";
import { NotAuthorizedException, NotFoundException } from "../../utils/erorr";
import { IComment,Ipost} from "../../utils/common/interface";
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

    let commentExist: IComment | any = undefined;
    if (id) {
      commentExist = await this.commentRepository.exist({ _id: id });
   if (!commentExist) throw new NotFoundException("Parent comment not found");
   if(commentExist.userId.toString() != req.user._id.toString()){
    throw new NotAuthorizedException("You are not authorized to delete this comment");
   }
    }
    const newComment = this.commentFactory.createComment(
      commentDto,
      req.user,
      postExist,
      commentExist
    );

    const createdComment = await this.commentRepository.create(newComment);

    

    return res
      .status(201)
      .json({ message: "Comment created", data: createdComment });
  };
  getspecificComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const commentExist = await this.commentRepository.exist({ _id: id },{},{
      populate:[
        {
          path:"replies",
        }
      ]
      
    });
    if (!commentExist) throw new NotFoundException("Comment not found");
    return res.status(200).json({ message: "Comment found", data: commentExist });
  };
  public deleteComment = async( req:Request,res:Response)=>{
    const {id} = req.params;
    const commentExist = await this .commentRepository.exist
    ({ _id: id },{},{
      populate:[
        {
          path:"userId"
        },{
          path:"postId"
          ,select:"userId"
        }
      ]
    });
    if (!commentExist) throw new NotFoundException("Comment not found");
    if (
      commentExist.userId.toString() != req.user._id.toString() &&
      (commentExist.postId as unknown as Ipost).userId.toString() != req.user._id.toString()
    ) {
      throw new NotAuthorizedException("You are not authorized to delete this comment");
    }
    await this.commentRepository.delete({_id:id}); 
    return res.status(200).json({ message: "Comment deleted" });
  }
}

export default new CommentService();
