import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { devConfig } from "../../config/env/dev.config";
import { IPayload } from "../../utils/common/interface";
 export const generateToken =({payload,secretKey=devConfig.JWT_SECRET,options}:{
    payload:object,
    secretKey?:string,
    options?: SignOptions;
 })=>{
    return jwt.sign( payload, secretKey as string,options)
 }
 export const verifyToken = ({token,secretKey=devConfig.JWT_SECRET}: {token:string,secretKey?:string})=>{
    return jwt.verify(token,secretKey as string)as IPayload;
 }
 export const generateRefreshToken = ({payload,refreshKey=devConfig.JWT_REFRESH_SECRET,options}: {
    payload: object;
    refreshKey?: string;
    options?: SignOptions;
}) => {
    return jwt.sign(payload, refreshKey as string, options)
}