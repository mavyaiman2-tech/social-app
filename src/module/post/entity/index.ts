import { ObjectId } from "mongoose";
import { Iattachment } from "../../../utils/common/interface";
import { IReaction } from "../../../utils/common/interface";
export class Post {
    userId:ObjectId;
    content:string;
    reaction:IReaction[];
    attachments?:Iattachment[];
    
}