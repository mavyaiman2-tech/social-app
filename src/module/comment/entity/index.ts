import {ObjectId} from "mongoose";
import {Iattachment, IReaction} from "../../../utils/common/interface"
export class Comment {
    _id: ObjectId;
    content: string;
    userId: ObjectId;
    postId: ObjectId;
    parentId?: ObjectId | null;
    reaction: IReaction[];
    attachments?: Iattachment[];
}
