import { Request, Response, NextFunction, Express  } from "express";
import { userRouter, authRouter, postRouter,commentRouter } from "./module/index";
import { connectDB } from "./db/connection";
import { AppError } from "./utils/erorr";

export const bootstrap = (app: Express, express: any) => {
    connectDB()
    app.use(express.json());
    app.use("/auth", authRouter)
    app.use("/user", userRouter)
    app.use("/post", postRouter)
    app.use("/comment", commentRouter)
    // app.use(express.json());

    app.use((req: Request, res: Response) => {
        return res.status(404).json({ message: "Page not found" });
      });
      
    app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
        return res.status(error.statusCode || 500).
            json({ message: error.message, success: false })
    })
}
