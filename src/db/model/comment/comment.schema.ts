import { Schema } from "mongoose";
import  {IComment} from "../../../utils/common/interface";
import { reactionSchema } from "../common/reaction.schema";

export const commentSchema = new Schema<IComment>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String},
            
            reaction: [reactionSchema],
        
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
          },
        attachments: [
            {
                type: String,
            }
        ],
       
    },
    { timestamps: true ,toJSON:{virtuals:true} }
);
commentSchema.virtual("replies",{
    ref:"Comment",
    localField:"_id",
    foreignField:"parentId"
})
commentSchema.pre("deleteOne",async function(next){
    const commentId = this.getFilter();
    const replies = await this.model.find({parentId:commentId._id})
    if(replies.length>0){
        for(const reply of replies){
         await this.model.deleteOne({parentId:reply._id})
        }
    }
    next();
})