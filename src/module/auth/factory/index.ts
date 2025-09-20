import { registerDto } from "../auth.dto";
import { User } from "../entity/index";
import {SYS_Role} from "../../../utils/common/enum/index";
import {USER_AGENT} from "../../../utils/common/enum/index";
import {generateOTP,generateOTPExpiry} from "../../../utils/otp/index";
import {generatePassword} from "../../../utils/hash/index";
export  class AuthFactoryService{
    register(registerDto:registerDto){

         const user= new User();
        user.fullName=registerDto.fullName as string;
        user.email=registerDto.email;
        user.password= generatePassword(registerDto.password);
        user.gender=registerDto.gender;
        user.role=SYS_Role.user;
        user.userAgent=USER_AGENT.local;
     
       user.credentialUpdateAt= Date.now()as unknown as Date ;
       user.otp=generateOTP();
       user.otpExpiry=generateOTPExpiry(5*60*60*1000);
        user.phoneNumber=registerDto.phoneNumber as string;
        user.isVerified=false;
        return user;    
    }
}
    
