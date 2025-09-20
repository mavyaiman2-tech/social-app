import { Request, Response, NextFunction } from "express";
import * as AppError from "../utils/erorr";
import { ZodType } from "zod";

export const isValid = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body, ...req.params, ...req.query };

    const result = schema.safeParse(data);

    if (!result.success) {
      const errMessage = result.error.issues.map((issue) => ({
        path: issue.path[0],
        message: issue.message,
      }));
      const errorMessageString = JSON.stringify(errMessage);

      return next(new AppError.BadRequestException(errorMessageString));
    }

    
    next();
  };
};
