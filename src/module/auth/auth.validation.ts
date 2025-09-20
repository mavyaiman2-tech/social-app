import { z } from "zod";
import { GENDER,SYS_Role,USER_AGENT } from "../../utils/common/enum";
import {IUser} from "../../utils/common/interface";
import { registerDto } from "./auth.dto";

     export const registerSchema = z.object< registerDto>({
    fullName:z.string().min(3).max(25) as unknown as string,
    email:z.email() as unknown as string,
    password:z.string() as unknown as string,
    phoneNumber:z.string() as unknown as string,
    gender:z.enum(GENDER) as unknown as GENDER,
  
    });