import {SYS_Role,GENDER,USER_AGENT} from "../enum/index"
import { JwtPayload } from "jsonwebtoken";
import {Request} from "express";
import { ObjectId } from "mongoose";
import {REACTION} from "../enum/index";
    export interface IUser {
    _id:ObjectId;
    firstName:string;
    lastName:string;
    fullName ?:string;
    email:string;
    password:string;
    credentialUpdateAt:Date;
    phoneNumber?:string;
    role:SYS_Role;
    gender:GENDER;
    userAgent:USER_AGENT;
    otp?:string;
    otpExpiry?:Date;
    isVerified?:boolean;
 }
  export interface IPayload extends JwtPayload {
    id:string;
    role:SYS_Role;
  }
  export interface Iattachment {
    id:string;
    url:string;
  }
  export interface Ipost {
    userId:ObjectId;
    content:string;
   reaction:IReaction[];
    attachments?:Iattachment[];
    _id:ObjectId;
    
  }
    declare module "express" {
    export interface Request {
      user?: IUser;
    }
  }
  
  export interface IReaction {
    reaction:REACTION;
    userId:ObjectId;
  }

  export interface IComment {
    _id: ObjectId;
    content: string;
    userId: ObjectId;
    postId: ObjectId;
    parentId?: ObjectId | null;
    reaction: IReaction[];
    attachments?:Iattachment[];
  }
  