import { GENDER } from "../../../utils/common/enum/index";
import { SYS_Role } from "../../../utils/common/enum/index";
import { USER_AGENT } from "../../../utils/common/enum/index";
export  class User{
   
     public fullName ?:string;
     public email!:string;
     public password!:string;
     public credentialUpdateAt!:Date;
     public phoneNumber!:string;
     public role!:SYS_Role;
     public gender!:GENDER;
     public userAgent!:USER_AGENT;
     public otp!:string;
     public otpExpiry!:Date;
     public isVerified!:boolean;
}
    