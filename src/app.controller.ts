import { NextFunction, type Express,Request,Response} from "express";
import {userRouter,authRouter} from "./module";
import { connectDB } from "./db/connection";
import { AppError } from "./utils/erorr";

export const bootstrap = (app:Express,express:any) => {
 
   app.use('/auth',authRouter) 
   app.use('/user',userRouter)
   app.use(express.json());

   app.use("/{*dummy}",(req:Request,res:Response,next:NextFunction)=>{
       return res.status(404).json({message:"Page not found"})
   })
   app.use((error:AppError,req:Request,res:Response,next:NextFunction)=>{
    return res.status(error.statusCode).
    json({message:error.message,success:false})
   })
}
    