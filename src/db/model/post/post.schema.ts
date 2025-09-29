import { Schema, model } from "mongoose";
import { Iattachment } from "../../../utils/common/interface";
import { REACTION } from "../../../utils/common/enum";
import { IReaction } from "../../../utils/common/interface";
import { Ipost } from "../../../utils/common/interface";
import { reactionSchema } from "../common/reaction.schema";
// Reaction SubSchema
;

// Post Schema
export const postSchema = new Schema<Ipost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: function (this: any) {
        return !(this.attachments && this.attachments.length > 0);
      },
      trim: true,
    },
    attachments: [
    {
      type: String,
    }
    ],
    reaction: [reactionSchema],
  },
  { timestamps: true, toJSON:{virtuals:true},toObject:{virtuals:true} }

);
postSchema.virtual("comments",{
  localField:"_id",
  foreignField:"postId",
  ref:"Comment"
})
// Post Model

