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
        parentId:[{
            type: Schema.Types.ObjectId,
            ref: "Comment",
        }],
        childIds:[{
            type: Schema.Types.ObjectId,
            ref: "Comment",
        }],
        attachments: [
            {
                type: String,
            }
        ],
       
    },
    { timestamps: true }
);