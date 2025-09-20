import {SYS_Role,GENDER,USER_AGENT} from "../enum/index"
 export interface IUser {
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