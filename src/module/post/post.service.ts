import { Request, Response } from "express";
import { createPostDto } from "./post.dto";
import { PostRepository } from "../../db/model/post/post.reposcitory"
import { PostFactoryService } from "./factory/index";
import { NotAuthorizedException, NotFoundException } from "../../utils/erorr/index";
import { Post } from "./entity";
import { REACTION } from "../../utils/common/enum";
import { ReactionProvider } from "../../utils/providers/reaction.provdier";

class PostService {
  private readonly PostFactoryService = new PostFactoryService();
  private readonly PostRepository = new PostRepository();

  public createPost = async (req: Request, res: Response) => {

    const createPostDto: createPostDto = req.body;

    const  postData  = await this.PostFactoryService.createPost(
      createPostDto,
      req.user
    );
    const createdPost = await this.PostRepository.create(postData);
    return res.status(201).json({ message: "Post created", data: createdPost });
  }
  public reaction = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { reaction } = req.body;
  
    await ReactionProvider(this.PostRepository, id, req.user._id.toString(), reaction);
  
    const updatedPost = await this.PostRepository.getOne({ _id: id }, {}, {
      populate: [
        { path: "userId", select: "firstName lastName fullName" },
        { path: "reaction.userId", select: "firstName lastName fullName" },
      ]
    });
  
    return res.status(200).json({
      message: "Reaction updated successfully",
      data: updatedPost
    });
  };
  
  public getPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const postExist = await this.PostRepository.getOne({ _id: id },{},
  {populate:[{path:"userId",select:" fullName firstName lastName"},
    {path:"reaction.userId",select:" fullName firstName lastName"},
  {path:"comments",match:{parentId:null},populate: [
    { path: "userId", select: "fullName firstName lastName" },  
  ],}
]});
if (!postExist) throw new NotFoundException("Post not found");
return res.status(200).json({ message: "Post found", data: postExist });

}
public deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const postExist = await this.PostRepository.exist({ _id: id });
     if(postExist.userId.toString() != req.user._id.toString()){
        throw new NotAuthorizedException("You are not authorized to delete this post");
     }
    if (!postExist)
      throw new NotFoundException("Post not found");

    await this.PostRepository.delete({ _id: id });
    return res.status(200).json({ message: "Post deleted", data: postExist });
}
}

export default new PostService();
