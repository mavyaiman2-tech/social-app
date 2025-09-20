import type { NextFunction, Request, Response } from "express";
import {registerDto} from "./auth.dto";
import {generateOTP,generateOTPExpiry} from "../../utils/otp/index";
import {User }from "../../db/model/user/user.model";
import* as AppError from "../../utils/erorr";
import * as AbstractRepository from "../../db/abstract.repository";
import {IUser} from "../../utils/common/interface";
import {UserRepository} from "../../db/model/user/user.db.service";
import {AuthFactoryService} from "./factory";
import *as authValidation from "./auth.validation";
import {sendMail} from "../../utils/email/index";
import {verifyDto} from "./auth.dto";
import { AuthProvider } from "./providers";
class AuthService{
    private UserRepository =new UserRepository ();
    private AuthFactoryService =new AuthFactoryService();
    private AuthProvider =new AuthProvider();
constructor(){}

       register=async(req:Request,res:Response,next:NextFunction)=>{
            const registerDto:registerDto=req.body;
            const userExist = await this.UserRepository.exist({email:registerDto.email});
        
          if(userExist){
                throw new AppError.conflictException("User already exists");
            }
          const user=  this.AuthFactoryService.register(registerDto);

            const createdUser= await this.UserRepository.create(user);
           await sendMail
            ({to:registerDto.email,
             
             subject:"email confrim",html:`<h1>your otp is ${user.otp}</h1>`});           
      
             return res.status(201).
            json({message:"User created successfully",createdUser});
        
        }
        verifyAccount=async(req:Request,res:Response)=>{
            const verifyDto:verifyDto=req.body;
              await this.AuthProvider.checkOtp(verifyDto);
              await this.UserRepository.update(
                { email: verifyDto.email },
                {
                   isVerified: true ,
                  $unset: { otp: "", otpExpiry: "" },
                }
              );
           
            return res.sendStatus(204);
       
          }
              
        }

export default new AuthService();
