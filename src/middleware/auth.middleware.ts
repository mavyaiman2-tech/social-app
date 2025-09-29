
import { NextFunction, Response ,Request} from "express";
import * as AppError from "../utils/erorr";
import { verifyToken } from "../utils/token";
import { UserRepository } from "../db/model/user/user.db.service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;
    if (!token) {
      throw new AppError.forbiddenException("Unauthorized");
    }


    const payload = verifyToken({token});
    const userRepository = new UserRepository();    
    if (!payload) {
      throw new AppError.forbiddenException("Unauthorized");
    }

    const user = await userRepository.getOne({ _id: payload.id });
    if (!user) {
      throw new AppError.forbiddenException("Unauthorized");
    }

    req.user=user;
    next();

};
