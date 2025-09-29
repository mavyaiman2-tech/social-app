import { createPostDto } from "../post.dto";
import { Post } from "../entity/index";
import {IUser} from "../../../utils/common/interface"
export class PostFactoryService {
    createPost(createPostDto:createPostDto,user:IUser){
        const newPost = new Post()
       
        newPost.content = createPostDto.content;
        newPost.userId = user._id;

        newPost.reaction = [];
        newPost.attachments = [];
        return newPost;
    }
}
