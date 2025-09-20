import {Request,Response,NextFunction} from "express";
import { UserRepository } from "../../db/model/user/user.db.service";
class UserService{
    private readonly UserRepository  =new UserRepository();

    constructor(){
      
    
     }
     getprofile =async(req:Request,res:Response ,next:NextFunction)=>{
        const user = await this.UserRepository.getOne({_id:req.params.id});
        return res.status(200).json({message:"User profile",data:
          {user}});
        
    }
}
export default new UserService();
