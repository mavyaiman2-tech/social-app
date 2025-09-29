
import z from "zod";
import { GENDER } from "../../utils/common/enum";
export interface registerDto {
    fullName?: string;
    email: string;
    password: string;
    phoneNumber?: string;
    // gender: GENDER;

}
export interface verifyDto {
    email: string;
    otp: string;
}

// type registerDtoType =z.infer<typeof registerSchema>    
export interface loginDto{
    email:string;
    password:string;
}
