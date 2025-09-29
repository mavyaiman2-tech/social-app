import { Request, Response } from "express";
import { createPostDto } from "./post.dto";
import { PostRepository } from "../../db/model/post/post.reposcitory"
import { PostFactoryService } from "./factory/index";
import { NotFoundException } from "../../utils/erorr/index";
import { Post } from "./entity";
import { REACTION } from "../../utils/common/enum";

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
    const userId = req.user._id;
    const postExist = await this.PostRepository.exist({ _id: id });
    if (!postExist)
      throw new NotFoundException("Post not found");
    const reactionIndex = postExist.reaction.findIndex((reaction) =>

       { return reaction.userId.toString() == userId.toString() });
       if(reactionIndex == -1){
        await this.PostRepository.update({ _id: id },
          { $push: { reaction: {reaction:
            [undefined,null,""].includes(reaction)
            ?REACTION.LIKE
            :reaction, userId } } });
       }
else if([undefined,null,""].includes(reaction)){
    await this.PostRepository.update({ _id: id},
      {$pull:{reaction:{reactionIndex}}});
}
   else {
     await this.PostRepository.update({ _id: id,"reaction.userId":userId },
       {"reaction.$.reaction":reaction});
    }
    return res.status(200).json({ message: "Reaction updated", data: postExist });
   
  }
  public getPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const postExist = await this.PostRepository.getOne({ _id: id },{},
  {populate:[{path:"userId",select:" fullName firstName lastName"},
    {path:"reaction.userId",select:" fullName firstName lastName"},
  {path:"comments",match:{parentId:null},populate: [
    { path: "userId", select: "fullName firstName lastName" }, // صاحب الكومنت
  ],}
]});
if (!postExist) throw new NotFoundException("Post not found");
return res.status(200).json({ message: "Post found", data: postExist });

}
}

export default new PostService();
