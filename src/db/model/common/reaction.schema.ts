import { Schema } from "mongoose";
import { IReaction } from "../../../utils/common/interface";
import { REACTION } from "../../../utils/common/enum";

 export  const reactionSchema = new Schema<IReaction>(
    {
      reaction: {
        type: Number,
        enum: Object.values(REACTION),
        default: REACTION.LIKE,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
  )