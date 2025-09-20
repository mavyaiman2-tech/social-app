import { verifyDto } from "../auth.dto";
import {UserRepository} from "../../../db/model/user/user.db.service";
import * as AppError from "../../../utils/erorr";

export class AuthProvider{
    checkOtp=async(verifyDto:verifyDto)=>{
        const userRository=new UserRepository();
        const userExist=await userRository.exist
        ({email:verifyDto.email});
        if (!userExist?.otp || !userExist.otpExpiry) {
          throw new AppError.BadRequestException("OTP not found or expired");
        }
    
        if (userExist.otp !== verifyDto.otp) {
          throw new AppError.BadRequestException("Invalid OTP");
        }
    
        if (userExist.otpExpiry < new Date()) {
          throw new AppError.BadRequestException("OTP expired");
        }
    }
}
