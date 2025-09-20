import {Schema} from "mongoose";
import {SYS_Role,GENDER,USER_AGENT} from "../../../utils/common/enum";
import {IUser} from "../../../utils/common/interface";
import {sendMail} from "../../../utils/email/index";

 export const userSchema = new Schema<IUser>({
firstName:{type:String,minlength:3,maxlength:20,required:true,trim:true},
lastName:{type:String,minlength:3,maxlength:20,required:true,trim:true},

email:{type:String,required:true,unique:true,lowercase:true,trim:true},
password:{type:String,required:function(){
    if(this.userAgent === USER_AGENT.google){
        return false;
    }
    return true;
}},
credentialUpdateAt:{type:Date},
phoneNumber:{type:String},
role:{type:String,enum:SYS_Role,default:SYS_Role.user},
gender:{type:String,enum:GENDER,default:GENDER.MALE},
userAgent:{type:String,enum:USER_AGENT,default:USER_AGENT.local},  
otp:{type:String},
otpExpiry:{type:Date},    
isVerified:{type:Boolean,default:false},
},{timestamps:true,toObject:{virtuals:true},toJSON:{virtuals:true}  });
userSchema.virtual("fullName").get(function(){
    return this.firstName + " " + this.lastName;
}).set(function(value: string){
    const [firstName,lastName] = value.split(" ");
    this.firstName = firstName as  string;
    this.lastName = lastName as string;
})
userSchema.pre("save", async function(next){
    if(this.userAgent !== USER_AGENT.google&&this.isNew==true){
       
    
   await sendMail({to:this.email,subject:"email confrim",html:`<h1>your otp is ${this.otp}</h1>`});
    }
   
})

//  promise // next()